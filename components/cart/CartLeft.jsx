import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../cart-item/CartItem";
import classes from "./Cart.module.css";

const CartLeft = () => {
  const cart = useSelector((state) => state.cart.cart);

  return (
    <div className={classes.cart_left}>
      <img
        className={classes.ad}
        src="https://links.papareact.com/ikj"
        alt="Ad"
      />

      <div className={classes.cart}>
        <h2>
          {cart.length > 0 ? "Shopping basket" : "Shopping basket is empty"}
        </h2>

        <div className={classes.cart_items}>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              title={item.title}
              price={item.price}
              description={item.description}
              category={item.category}
              image={item.image}
              hasPrime={item.hasPrime}
              rating={item.rating}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartLeft;
