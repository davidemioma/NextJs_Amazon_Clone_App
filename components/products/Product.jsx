import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/store";
import classes from "./Products.module.css";

const Product = ({ id, title, price, description, category, image }) => {
  const dispatch = useDispatch();

  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);

  const [hasPrime] = useState(Math.random() < 0.5);

  const addItemToCart = () => {
    const item = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
      quantity: 1,
    };

    dispatch(addToCart(item));
  };

  return (
    <div className={classes.item}>
      <p className={classes.category}>{category}</p>

      <img src={image} alt="product image" />

      <h4 className={classes.title}>{title}</h4>

      <div className={classes.ratings}>
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} color="#ffd700" width="20px" height="20px" />
          ))}
      </div>

      <p className={classes.description}>{description}</p>

      <p className={classes.price}>${price}</p>

      {hasPrime && (
        <div className={classes.prime}>
          <img src="https://links.papareact.com/fdw" alt="prime icon" />

          <p>FREE Next-day Delivery</p>
        </div>
      )}

      <button onClick={addItemToCart}>Add To Cart</button>
    </div>
  );
};

export default Product;
