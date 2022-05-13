import React from "react";
import Banner from "../components/banner/Banner";
import ProductsFeed from "../components/products/ProductsFeed";
import axios from "axios";

const Home = ({ products }) => {
  return (
    <div className="container">
      <Banner />

      <ProductsFeed products={products} />
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const products = await axios
    .get("https://fakestoreapi.com/products")
    .then((res) => res.data);

  return {
    props: {
      products,
    },
  };
};

export default Home;
