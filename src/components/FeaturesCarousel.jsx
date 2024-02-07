import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTasks, faMoneyCheckAlt, faMobileAlt, faSyncAlt, faCog, faLock } from '@fortawesome/free-solid-svg-icons';

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const FeaturesCarousel = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    const features = [
      {
          icon: <FontAwesomeIcon icon={faTasks} className="w-6 h-6" />,
          title: "Task Management",
          desc: "Easily assign, track, and manage tasks from a centralized dashboard."
      },
      {
          icon: <FontAwesomeIcon icon={faMoneyCheckAlt} className="w-6 h-6" />,
          title: "Automated Payments",
          desc: "Ensure timely and accurate payments with our automated payment system."
      },
      {
          icon: <FontAwesomeIcon icon={faMobileAlt} className="w-6 h-6" />,
          title: "Mobile Accessibility",
          desc: "Access TimelyTask anytime, anywhere with our mobile app, perfect for workers on the go."
      },
      {
          icon: <FontAwesomeIcon icon={faSyncAlt} className="w-6 h-6" />,
          title: "Real-Time Updates",
          desc: "Stay informed with real-time updates on task statuses and payment processing."
      },
      {
          icon: <FontAwesomeIcon icon={faCog} className="w-6 h-6" />,
          title: "Customizable Settings",
          desc: "Tailor TimelyTask to your specific needs with customizable settings and preferences."
      },
      {
          icon: <FontAwesomeIcon icon={faLock} className="w-6 h-6" />,
          title: "Secure Transactions",
          desc: "Rest easy knowing that all transactions on TimelyTask are secure and encrypted."
      }
      // Add more features as needed
  ];
  return (
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-xl space-y-3">
              <h3 className="text-customRed font-semibold">Look at</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Features That Delight:
              </p>
              <p>
              TimelyTask is packed with features designed to delight both employers and workers:
              </p>
            </div>
            <div className="mt-12">
          <AliceCarousel
            mouseTracking
        responsive={{
          0: { items: 1 },
          600: { items: 2 },
          1024: { items: 3 },
        }}
        autoPlay
        autoPlayInterval={3000}
        disableButtonsControls={true}
        disableDotsControls={false}
        paddingLeft={10}
        paddingRight={10}
        infinite
            items={features.map((item, idx) => (
              <div key={idx} className="space-y-3 ml-20 mr-10">
                <div className="w-12 h-12 mx-auto bg-gray-100 text-customRed rounded-full flex items-center justify-center">
                  {item.icon}
                </div>
                <h4 className="text-lg text-gray-800 font-semibold">
                  {item.title}
                </h4>
                <p>{item.desc}</p>
              </div>
            ))}
            activeIndex={activeSlideIndex}
            onSlideChanged={({ item }) => setActiveSlideIndex(item)}
          />
        </div>
          </div>
        </section>
  );
};

export default FeaturesCarousel;
