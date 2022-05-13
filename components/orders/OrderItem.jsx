import React from "react";
import moment from "moment";
import classes from "./Orders.module.css";

const OrderItem = ({
  id,
  amount,
  amountShipping,
  images,
  timestamps,
  items,
}) => {
  return (
    <div className={classes.container}>
      <div className={classes.info}>
        <p className={classes.order}>ORDER # {id}</p>

        <div className={classes.items}>
          <div>
            <p className={classes.bold}>ORDER PLACED</p>

            <p>{moment.unix(timestamps).format("DD MMM YYYY")}</p>
          </div>

          <div className={classes.grow}>
            <p className={classes.bold}>TOTAL</p>

            <p>
              ${amount} - Next Day Delivery ${amountShipping}
            </p>
          </div>

          <div>
            <p className={classes.items_amount}>{items.length} Items</p>
          </div>
        </div>
      </div>

      <div className={classes.images}>
        {images.map((img, i) => (
          <img key={i} src={img} alt="" />
        ))}
      </div>
    </div>
  );
};

export default OrderItem;
