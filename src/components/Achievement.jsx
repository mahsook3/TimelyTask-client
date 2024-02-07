import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import image1 from '../assets/achivements/1.png';
import image2 from '../assets/achivements/2.png';
import image3 from '../assets/achivements/3.png';
import image4 from '../assets/achivements/4.png';
import image5 from '../assets/achivements/5.png';
import image6 from '../assets/achivements/6.png';
import image7 from '../assets/achivements/7.png';
import image8 from '../assets/achivements/8.png';

const images = [image8,image1,image2,image3,image4,image5,image6,image7];

const handleDragStart = (e) => e.preventDefault();

export default function Achievement() {
  const items = images.map((image, index) => (
    <div key={index} className="carousel-image">
      <img
        src={image}
        alt={`Image ${index}`}
        onDragStart={handleDragStart}
        role="presentation"
      />
    </div>
  ));

  return (
    <div className="flex justify-center items-center">

      <AliceCarousel
        mouseTracking
        items={items}
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          1024: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={2000}
        disableButtonsControls={false}
        disableDotsControls={false}
        paddingLeft={10}
        paddingRight={10}
        infinite
        renderPrevButton={({ isDisabled }) => (
          <button
            className={`bg-customRed text-white py-2 px-4 rounded ${
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-customRed"
            }`}
            onClick={() => console.log("Previous clicked")}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        renderNextButton={({ isDisabled }) => (
          <button
            className={`bg-customRed text-white py-2 px-4 rounded ${
              isDisabled
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-customRed"
            }`}
            onClick={() => console.log("Next clicked")}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      />
    </div>
  );
}
