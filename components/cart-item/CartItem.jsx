import React from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../store/store";
import Image from "next/image";
import classes from "./CartItem.module.css";

const CartItem = ({
  id,
  title,
  price,
  description,
  category,
  image,
  hasPrime,
  rating,
  quantity,
}) => {
  const dispatch = useDispatch();

  const addItemToCart = () => {
    const item = {
      id,
      title,
      price,
      description,
      category,
      image,
      hasPrime,
      rating,
      quantity,
    };

    dispatch(addToCart(item));
  };

  const removeItemFromCart = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className={classes.item}>
      <Image
        src={image}
        alt="cart-img"
        width={200}
        height={200}
        objectFit="contain"
      />

      <div className={classes.content}>
        <p className={classes.title}>{title}</p>

        <div className={classes.ratings}>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} color="#ffd700" width="20px" height="20px" />
            ))}
        </div>

        <p className={classes.description}>{description}</p>

        <p className={classes.price}>${price}</p>

        <p className={classes.quantity}>Quantity: {quantity}</p>

        {hasPrime && (
          <div className={classes.prime}>
            <img src="https://links.papareact.com/fdw" alt="" />

            <p>FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      <div className={classes.buttons}>
        <button onClick={addItemToCart}>Add</button>

        <button onClick={removeItemFromCart}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
