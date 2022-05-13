import React from "react";
import Product from "./Product";
import classes from "./Products.module.css";

const ProductsFeed = ({ products }) => {
  return (
    <div className={classes.products}>
      {products.slice(0, 4).map((item) => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
        />
      ))}

      <img
        className={classes.ad}
        src="https://links.papareact.com/dyz"
        alt="Ad"
      />

      <div className={classes.span_two}>
        {products.slice(4, 5).map((item) => (
          <Product
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            category={item.category}
            image={item.image}
          />
        ))}
      </div>

      {products.slice(5, products.length).map((item) => (
        <Product
          key={item.id}
          id={item.id}
          title={item.title}
          price={item.price}
          description={item.description}
          category={item.category}
          image={item.image}
        />
      ))}
    </div>
  );
};

export default ProductsFeed;
