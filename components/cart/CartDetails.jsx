import React from "react";
import classes from "./Cart.module.css";
import CartLeft from "./CartLeft";
import CartRight from "./CartRight";

const CartDetails = () => {
  return (
    <div className={classes.cart_details}>
      <CartLeft />

      <CartRight />
    </div>
  );
};

export default CartDetails;
