import { buffer } from "micro";
import * as admin from "firebase-admin";

//Secure a connection to firebase through the back-end.
const serviceAccount = require("../../permissions.json");

const app = !admin.apps.length
  ? admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
  : admin.app();

//Establish connection to stripe
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNING_SECRET_KEY;

const fulfilOrder = async (session) => {
  return app
    .firestore()
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamps: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`Success: Order ${session.id} has been added to the db`);
    });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);

    const payload = requestBuffer.toString();

    const sig = req.headers["stripe-signature"];

    let event;

    //Verify the event came from stripe.
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("Error: ", err.message);

      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    //Handle the checkout.session.completed event.
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      //Fufil the order...
      return fulfilOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400).send(`Webhook error: ${err.message}`));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
