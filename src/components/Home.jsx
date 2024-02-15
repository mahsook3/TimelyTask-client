import logo from "../assets/logo/logo.png";
import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import logoGif from "../assets/logo/TimelyTask.gif";
import { Link, useNavigate } from "react-router-dom";
import preloader from "../assets/preload.gif";
import Footer from "./Footer";
import Microsoft from "../assets/partners/1.png";
import Google from "../assets/partners/2.png";
import Ingnite from "../assets/partners/3.png";
import Eshwar from "../assets/partners/4.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../App.css";
import FeaturesCarousel from "./FeaturesCarousel";
import { faUserPlus, faTasks, faCheckCircle, faMoneyCheckAlt, faChartLine } from '@fortawesome/free-solid-svg-icons';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const openVideoPopup = () => {
    setShowVideo(true);
  };

  const closeVideoPopup = () => {
    setShowVideo(false);
  };

  const contactMethods = [
    {
      icon: <FontAwesomeIcon icon={faUserPlus} className="w-6 h-6" />,

      title: "Sign Up",
      desc: "Create an account on TimelyTask and customize your settings to match your business requirements.",
      link: {
        name: "Join TimelyTask",
        href: "javascript:void(0)",
      },
    },
    {
      icon: <FontAwesomeIcon icon={faTasks} className="w-6 h-6" />,

      title: "Assign Tasks",
      desc: "Easily assign tasks to your workforce through the platform, specifying deadlines and requirements.",
      link: {
        name: "Explore Task Management",
        href: "javascript:void(0)",
      },
    },
    {
      icon: <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6" />,

      title: "Complete Tasks",
      desc: "Workers receive notifications of assigned tasks and can complete them using the mobile app.",
      link: {
        name: "Download Mobile App",
        href: "javascript:void(0)",
      },
    },
    {
      icon: <FontAwesomeIcon icon={faMoneyCheckAlt} className="w-6 h-6" />,

      title: "Automatic Payments",
      desc: "Once a task is completed and verified, payments are automatically processed and sent to the worker's account.",
      link: {
        name: "Learn More about Payments",
        href: "javascript:void(0)",
      },
    },
    {
      icon: <FontAwesomeIcon icon={faChartLine} className="w-6 h-6" />,

      title: "Track Progress",
      desc: "Monitor task progress and payment statuses in real-time through the dashboard.",
      link: {
        name: "Access Dashboard",
        href: "javascript:void(0)",
      },
    },
  ];


  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  return (
    <div>
      <>
        <Navbar />
        <section className="bg-white dark:bg-gray-900">
          <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
            <div className="mr-auto place-self-center lg:col-span-7">
              <a
                href="#"
                className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                role="alert"
              >
                <span className="text-xs bg-customOrange rounded-full text-white px-4 py-1.5 mr-3">
                  New
                </span>{" "}
                <a
                  href="https://timelytask.mahsook.tech/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium"
                >
                  TimelyTask is out! See what's new
                </a>
                <svg
                  className="ml-2 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">The Simplify Your 
                 Task Management  and 
                 Payment Process  with Ease
              </h1>
              <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              Are you tired of the hassle of managing tasks and payments for your blue-collar workforce? Look no further! TimelyTask is here to revolutionize the way you handle your operations.
              </p>
              <div className="flex space-x-3">
                {" "}
                {/* Container for buttons */}
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-customBlue rounded-lg bg-customOrange hover:bg-yellow-500 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                  onClick={() => navigate("/signup")}
                >
                  Get started
                  <svg
                    className="w-5 h-5 ml-2 -mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                  onClick={openVideoPopup}
                >
                  <svg
                    className="mr-2 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                  </svg>
                  Watch video
                </a>
              </div>
            </div>
            <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
              <img src={logoGif} alt="TimelyTaskmockup" />
            </div>
          </div>
        </section>
        <section className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
            <div className="max-w-xl space-y-3">
              <h3 className="text-customOrange font-semibold">Why TimelyTask?</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
              Tired of the complexities and frustrations of managing tasks and payments for your blue-collar workforce?
              </p>
              <p>
              TimelyTask offers a solution that simplifies the entire process.
              </p>
            </div>
          </div>
        </section>
        <FeaturesCarousel />
        <main className="py-14">
          <div className="max-w-screen-xl mx-auto px-4 text-gray-600 gap-12 md:px-8 lg:flex">
            <div className="max-w-md">
              <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                How It Works:
              </h3>
              <p className="mt-3">
              Using TimelyTask is simple:
              </p>
            </div>
            <div>
              <ul className="mt-12 gap-y-6 gap-x-12 items-center md:flex lg:gap-x-0 lg:mt-0">
                {contactMethods.map((item, idx) => (
                  <li
                    key={idx}
                    className="space-y-3 border-t py-6 md:max-w-sm md:py-0 md:border-t-0 lg:border-l lg:px-12 lg:max-w-none"
                  >
                    <div className="w-12 h-12 rounded-full border flex items-center justify-center text-customOrange bg-customBlue">
                      {item.icon}
                    </div>
                    <h4 className="text-gray-800 text-lg font-medium xl:text-xl">
                      {item.title}
                    </h4>
                    <p>{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </main>
        <Footer />{" "}
        {showVideo && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-75">
            <div className="max-w-[800px]  mx-4">
              <button
                className="absolute top-4 right-4 text-white text-2xl cursor-pointer focus:outline-none"
                onClick={closeVideoPopup}
              >
                &#10005;
              </button>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Rx2-sxyCDSE"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default Home;
