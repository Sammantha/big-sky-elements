'use client';

import { useState, useEffect, React } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel({children}) {
  const [width, setWidth] = useState(undefined);

  const settings = {
    infinite: false,
    initialSlide: 1,
    speed: 500,
    slidesToShow: width > 640 ? 2 : 1,
    slidesToScroll: width > 640 ? 0 : 1,
    dots: width <= 640
  };

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);


  return (
    <div className="slider-container">
      <Slider {...settings}>
          {children}
      </Slider>
    </div>
  );
}