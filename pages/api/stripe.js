import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1KsUGrFcQlUgHkfGrIn1vZqB"],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA"],
        },
        line_items: req.body.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
              images: [item.image],
            },
            unit_amount: +item.price * 100,
          },
          quantity: item.quantity,
          description: item.description,
        })),
        mode: "payment",
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
        metadata: {
          email: req.body.email,
          images: JSON.stringify(req.body.items.map((item) => item.image)),
        },
      });

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json({ status: 500, error: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");

    res.status(405).end("Method Not Allowed");
  }
};
