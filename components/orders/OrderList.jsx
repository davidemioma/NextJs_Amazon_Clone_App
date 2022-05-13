import { useSession } from "next-auth/react";
import React from "react";
import classes from "./Orders.module.css";

const OrderList = ({ children, amount }) => {
  const { data: session } = useSession();

  return (
    <div className={classes.orders}>
      <h2>Your Orders</h2>

      {!session ? (
        <p className={classes.amount}>Please sign it to view your orders</p>
      ) : (
        <p className={classes.amount}>{amount} Orders</p>
      )}

      <div className={classes.order_list}>{children}</div>
    </div>
  );
};

export default OrderList;
