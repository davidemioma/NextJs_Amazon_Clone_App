import React, { useEffect, useState } from "react";
import Banner from "../components/banner/Banner";
import ProductsFeed from "../components/products/ProductsFeed";
import axios from "axios";

const Home = () => {
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
