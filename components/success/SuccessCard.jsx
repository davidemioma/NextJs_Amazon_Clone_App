import React from "react";
import { CheckCircleIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import classes from "./SuccessCard.module.css";

const SuccessCard = () => {
  const router = useRouter();

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <div>
          <CheckCircleIcon width="35px" height="35px" color="green" />

          <h2>Thank you, your order has been confirmed!</h2>
        </div>

        <p>
          Thank you for shopping with us, We'll send a confirmation once your
          item has shipped, if you would like to continue shopping please click
          the link below
        </p>

        <button onClick={() => router.push("/")}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default SuccessCard;
