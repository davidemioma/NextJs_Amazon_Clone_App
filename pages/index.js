import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login, logout } from "../store/store";
import Banner from "../components/banner/Banner";
import ProductsFeed from "../components/products/ProductsFeed";
import axios from "axios";

const Home = () => {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data))
      .catch((err) => alert(err.message));
  }, []);

  return (
    <div className="container">
      <Banner />

      <ProductsFeed products={products} />
    </div>
  );
};

export default Home;
