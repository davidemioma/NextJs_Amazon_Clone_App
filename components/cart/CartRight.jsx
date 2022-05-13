import React from "react";
import { useSelector } from "react-redux";
import { totalAmount } from "../../store/cart-slice";
import { useSession } from "next-auth/react";
import getStripe from "../../getStripe";
import axios from "axios";
import classes from "./Cart.module.css";

const CartRight = () => {
  const { data: session } = useSession();

  const cart = useSelector((state) => state.cart.cart);

  const amount = useSelector(totalAmount);

  const createCheckoutSession = async () => {
    const stripe = await getStripe();

    const checkoutSession = await axios.post("/api/stripe", {
      items: cart,
      email: session?.user?.email,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };

  return (
    <div className={classes.cart_right}>
      {cart.length > 0 && (
        <>
          <h3>
            Subtotal ({cart.length} Items): ${amount.toFixed(2)}
          </h3>

          <button
            className={session ? classes.btn : classes.btn_disabled}
            role="link"
            onClick={createCheckoutSession}
            disabled={!session}
          >
            {session ? "Proceed to checkout" : "Sign in to checkout"}
          </button>
        </>
      )}
    </div>
  );
};

export default CartRight;
