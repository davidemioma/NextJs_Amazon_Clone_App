import React from "react";
import { getSession } from "next-auth/react";
import { db } from "../firebase";
import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import moment from "moment";
import OrderList from "../components/orders/OrderList";
import OrderItem from "../components/orders/OrderItem";

const orders = ({ orders }) => {
  return (
    <div className="container">
      <OrderList amount={orders?.length}>
        {orders?.map(
          ({ id, amount, amountShipping, images, timestamp, items }) => (
            <OrderItem
              key={id}
              id={id}
              amount={amount}
              amountShipping={amountShipping}
              images={images}
              timestamps={timestamp}
              items={items}
            />
          )
        )}
      </OrderList>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

  //Get the users login credentials
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  //Firebase Db
  const stripeOrders = await getDocs(
    query(
      collection(db, "users", session.user.email, "orders"),
      orderBy("timestamps", "desc")
    )
  );

  //Stripe Order
  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamps.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
    },
  };
};

export default orders;
