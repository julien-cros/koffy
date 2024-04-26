"use client";

import Card from "./card";
import React from "react";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { coffeDsisplay } from "@/constant";

const DisplayCard = () => {
  const OwlCarousel = dynamic(() => import("react-owl-carousel"), {
    ssr: false,
  });

  const options = {
    loop: true,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    items: 1,
    touchDrag: true,
  };

  return (
    <div className="h-[350px] lg:h-[100%] w-full">
      <div className="flex h-full items-center justify-center overflow-hidden">
        <OwlCarousel className="owl-theme" {...options}>
          {coffeDsisplay.map((coffee) => (
            <div
              key={coffee.title}
              className="flex h-full justify-center mt-10 mb-10"
            >
              <Card
                key={coffee.title}
                title={coffee.title}
                brand={coffee.brand}
                tasting={coffee.tasting}
                rate={coffee.rate}
                createdAt={coffee.createdAt}
                id=""
                session={null}
                clickable={false}
              />
            </div>
          ))}
        </OwlCarousel>
      </div>
    </div>
  );
};

export default DisplayCard;
