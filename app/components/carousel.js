"use client";

import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel({children}) {
  const settings = {
    infinite: false,
    speed: 500,
    initialSlide: 0,
    slidesToShow: 2,
    slidesToScroll: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 0,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: true,
        }
      }
    ]
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
          {children}
      </Slider>
    </div>
  );
}