import Navbar from "./Navbar";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faMoneyCheckAlt, faMobileAlt, faCode, faHardHat,faPeopleGroup,faHourglassHalf,faGem,faDesktop,faRobot,faUserAlt,faUniversalAccess } from '@fortawesome/free-solid-svg-icons';
import Microsoft from "../assets/partners/1.png";
import FAQ from "../assets/icons/faq.png";
import Google from "../assets/partners/2.png";
import Ingnite from "../assets/partners/3.png";
import Eshwar from "../assets/partners/4.png";
import Footer from "./Footer";

export default () => {
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);
  const features = [
    {
      icon: <FontAwesomeIcon icon={faChartLine} />,
      title: "Efficiency",
      desc: "TimelyTask streamlines task management processes, making it easier to assign, receive, and complete tasks through its user-friendly web interface. This efficiency saves time and effort for both workers and employers.",
    },
    {
      icon: <FontAwesomeIcon icon={faMoneyCheckAlt} />,
      title: "Prompt Payments",
      desc: "With TimelyTask, payment for completed tasks is automated, ensuring that workers receive their wages promptly upon task completion. This eliminates delays and enhances financial stability for workers.",
    },
    {
      icon: <FontAwesomeIcon icon={faDesktop} />,
      title: "User-Friendly Interface",
      desc: "TimelyTask boasts an intuitive interface designed for ease of use. Workers can navigate the platform effortlessly, accessing tasks and managing their finances without unnecessary complexity.",
    },
    {
      icon: <FontAwesomeIcon icon={faMobileAlt} />,
      title: "Mobile Accessibility",
      desc: "The TimelyTask mobile app enables users to manage tasks and track payments conveniently on the go. This accessibility ensures that tasks can be efficiently managed from anywhere, enhancing productivity.",
    },
    {
      icon: <FontAwesomeIcon icon={faCode} />,
      title: "Modern Technology Stack",
      desc: "TimelyTask utilizes state-of-the-art technologies such as the MERN Stack and Tailwind CSS, ensuring scalability, performance, and a modern user experience that meets the demands of today's digital landscape.",
    },
    {
      icon: <FontAwesomeIcon icon={faHardHat} />,
      title: "Focus on Blue-Collar Workers",
      desc: "TimelyTask is specifically designed to address the unique needs of blue-collar workers, providing solutions tailored to their requirements in task management and payment processing.",
    },
  ];


  const faq = [
    {
      question: "What is TimelyTask?",
      answer: "TimelyTask is a web-based platform designed to streamline task management and payment processes for blue-collar workers."
    },
    {
      question: "What is the domain of TimelyTask?",
      answer: "TimelyTask is developed using the MERN stack, which includes technologies such as React JS for the frontend, Node JS and Express JS for the backend, and Tailwind CSS for styling."
    },
    {
      question: "What features does TimelyTask offer?",
      answer: "TimelyTask allows users to assign, receive, and complete tasks through its mobile app interface. It also facilitates automatic payment of wages once tasks are successfully completed, providing a seamless process for both task and financial management."
    },
    {
      question: "How does TimelyTask simplify task management for users?",
      answer: "TimelyTask offers a user-friendly interface that makes task management efficient and straightforward. Users can easily assign tasks, track their progress, and mark them as completed, all within the platform."
    },
    {
      question: "Is the login process easy to use?",
      answer: "Yes, TimelyTask provides an easy login process to ensure efficient access to the platform. Users can log in securely using their credentials, allowing them to manage tasks and finances with ease."
    },
    {
      question: "How does TimelyTask ensure timely payment for completed tasks?",
      answer: "TimelyTask automates the payment process, ensuring that wages are transferred promptly upon task completion. This feature eliminates delays and ensures that workers are compensated in a timely manner for their efforts."
    },
    {
      question: "Can tasks be assigned and managed through the mobile app?",
      answer: "Yes, TimelyTask allows users to assign, receive, and manage tasks directly through its mobile app interface. This flexibility enables workers to stay organized and productive while on the go."
    },
    {
      question: "Is TimelyTask suitable for businesses and individual users alike?",
      answer: "Absolutely! TimelyTask is designed to cater to the needs of both businesses and individual users, providing a versatile platform for efficient task management and payment processing."
    },
    {
      question: "What support is available for users of TimelyTask?",
      answer: "TimelyTask offers comprehensive support to its users, including documentation, tutorials, and a responsive customer support team. Users can access help resources and assistance whenever needed to ensure a smooth experience with the platform."
    },
    {
      question: "Is TimelyTask customizable to suit specific business requirements?",
      answer: "While TimelyTask offers a user-friendly interface out of the box, it also provides customization options to accommodate specific business requirements. Users can tailor the platform to meet their unique needs and preferences, enhancing its effectiveness in managing tasks and payments."
    }
  ];
  
  return (
    <>
      <Navbar />
      <section className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-center text-gray-600 md:px-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Why Choose TimelyTask?
            </h3>
            <p className="mt-3">
            TimelyTask presents an innovative solution for task management and payment facilitation, particularly tailored for blue-collar workers. Here's why you should choose TimelyTask:
            </p>
          </div>
          <div className="mt-12">
            <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-customBlue text-customOrange rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg text-gray-800 font-semibold">
                    {item.title}
                  </h4>
                  <p>{item.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <></>
      <>
        {/* Icon Blocks */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
              How Are We Trying to Solve?
              </h2>
              <p className="mt-3 text-gray-800 dark:text-gray-400">
              TimelyTask aims to solve the challenges faced by blue-collar workers in managing tasks and receiving timely payments through the following strategies:
              </p>
              <a
                href="/login"
                className="mt-5 inline-flex items-center gap-x-2 font-medium text-customOrange dark:text-customBlue"
              >
                Get Start, Now
                <svg
                  className="w-2.5 h-2.5 transition ease-in-out group-hover:translate-x-1"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0.975821 6.92249C0.43689 6.92249 0 7.34222 0 7.85999C0 8.37775 0.43689 8.79749 0.975821 8.79749L12.7694 8.79748L7.60447 13.7596C7.22339 14.1257 7.22339 14.7193 7.60447 15.0854C7.98555 15.4515 8.60341 15.4515 8.98449 15.0854L15.6427 8.68862C16.1191 8.23098 16.1191 7.48899 15.6427 7.03134L8.98449 0.634573C8.60341 0.268455 7.98555 0.268456 7.60447 0.634573C7.22339 1.00069 7.22339 1.59428 7.60447 1.9604L12.7694 6.92248L0.975821 6.92249Z"
                    fill="currentColor"
                  />
                </svg>
              </a>
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="flex ">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200  shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200 bg-customBlue  text-customOrange">
                  <svg
                    className="w-5 h-5 "
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <FontAwesomeIcon icon={faRobot} />
                  </svg>
                </span>
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Automation:
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  TimelyTask automates task assignment and payment processes, reducing manual intervention and streamlining operations. This ensures that tasks are efficiently managed and workers receive prompt payments upon completion.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200 shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200 bg-customBlue  text-customOrange">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <FontAwesomeIcon icon={faUniversalAccess} />{" "}
                  </svg>
                </span>
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Accessibility:
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  TimelyTask offers a mobile app, enabling workers to access the platform anytime, anywhere. This accessibility empowers workers to manage tasks and track payments conveniently, improving overall efficiency and responsiveness.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
              {/* Icon Block */}
              <div className="flex">
                {/* Icon */}
                <span className="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border border-gray-200   shadow-sm mx-auto dark:bg-slate-900 dark:border-gray-700 dark:text-gray-200 bg-customBlue  text-customOrange">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <FontAwesomeIcon icon={faUserAlt} />{" "}
                  </svg>
                </span>
                <div className="ml-5 sm:ml-8">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200">
                  User-Centric Design:
                  </h3>
                  <p className="mt-1 text-gray-600 dark:text-gray-400">
                  The platform's user interface is designed with the needs of blue-collar workers in mind, prioritizing simplicity and ease of use. This user-centric approach enhances adoption and usability, ensuring that workers can navigate the platform effortlessly to manage tasks and finances.
                  </p>
                </div>
              </div>
              {/* End Icon Block */}
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Icon Blocks */}
      </>

      <>
        {/* Icon Blocks */}
        <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12">
            <div className="lg:w-3/4">
              <h2 className="text-3xl text-gray-800 font-bold lg:text-4xl dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-3 text-gray-800 dark:text-gray-400">
                Here are few of the most frequently asked questions by our
                valueable customers
              </p>
              <div>
              <img
      className="h-96 w-full object-cover object-center"
      src={FAQ}
      alt="NearTreat"
    />
              </div>
            </div>
            {/* End Col */}
            <div className="space-y-6 lg:space-y-10">
              {/* Icon Block */}
              <div className="grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8">
                {faq.map((entry, index) => (
                  <div className="py-5" key={index}>
                    <details className="group">
                      <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                        <span>{entry.question}</span>
                        <span className="transition group-open:rotate-180">
                          <svg
                            fill="none"
                            height={24}
                            shapeRendering="geometricPrecision"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            viewBox="0 0 24 24"
                            width={24}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </span>
                      </summary>
                      <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                        {entry.answer}
                      </p>
                    </details>
                  </div>
                ))}
              </div>
            </div>
            {/* End Col */}
          </div>
          {/* End Grid */}
        </div>
        {/* End Icon Blocks */}
      </>

      <>
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/styles/tailwind.css"
        />
        <link
          rel="stylesheet"
          href="https://demos.creative-tim.com/notus-js/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
        />

        

        <Footer />
      </>
    </>
  );
};
