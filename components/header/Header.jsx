import React from "react";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn, signOut } from "next-auth/react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import classes from "./Header.module.css";

const Header = () => {
  const { data: session } = useSession();

  const cart = useSelector((state) => state.cart.cart);

  const router = useRouter();

  return (
    <header className={classes.header}>
      <div className={classes.nav_top}>
        <img
          onClick={() => router.push("/")}
          src="https://links.papareact.com/f90"
          alt=""
        />

        <div className={classes.inputs}>
          <input type="text" />

          <div className={classes.search_icon}>
            <SearchIcon width="17px" height="17px" />
          </div>
        </div>

        <div className={classes.nav_top_right}>
          <div onClick={!session ? signIn : signOut}>
            <p>{session ? `Hello ${session.user.name}` : "Sign In"}</p>

            <p>Account & Lists</p>
          </div>

          <div onClick={() => router.push("/orders")}>
            <p>Returns</p>

            <p>& Orders</p>
          </div>

          <div className={classes.basket} onClick={() => router.push("/cart")}>
            <div className={classes.basket_icon}>
              <span>{cart.length}</span>

              <ShoppingCartIcon width="30px" height="30px" />
            </div>

            <p>Cart</p>
          </div>
        </div>
      </div>

      <div className={classes.nav_btm}>
        <p className={classes.menu_icon}>
          <MenuIcon width="20px" height="20px" /> All
        </p>

        <p>Prime Video</p>

        <p>Amazon Business</p>

        <p>Today's Deal</p>

        <p className={classes.text_md}>Electronics</p>

        <p className={classes.text_sm}>Food & Grocery</p>

        <p className={classes.text_sm}>Prime</p>

        <p className={classes.text_sm}>Buy Again</p>

        <p className={classes.text_sm}>Shooper Toolkit</p>

        <p className={classes.text_sm}>Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
