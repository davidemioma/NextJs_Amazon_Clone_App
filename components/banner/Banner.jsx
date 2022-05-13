import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import classes from "./Banner.module.css";

const Banner = () => {
  return (
    <div className={classes.banner}>
      <div className={classes.gradient} />

      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" />
        </div>

        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" />
        </div>

        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
