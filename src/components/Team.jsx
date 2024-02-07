import { faLinkedin } from "@fortawesome/free-brands-svg-icons"; // Import the LinkedIn icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React,{useState} from "react";
import Mahsook from "../assets/team/1.png";
import Ramya from "../assets/team/2.png";
import Priya from "../assets/team/3.png";
import Vivek from "../assets/team/Vivek.jpg";
import Sanku from "../assets/team/sanku.jpg";
import Mari from "../assets/team/4.png";
import Microsoft from "../assets/partners/1.png";
import Google from "../assets/partners/2.png";
import Ingnite from "../assets/partners/3.png";
import Eshwar from "../assets/partners/4.png";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Achievement from "./Achievement";


const Team = () => {
  const testimonials = [
    {
        avatar: "https://neartreat.in/static/media/1.f8ad4e8bf7c7f282d1b7.png",
        name: "Mahsook M A",
        title: "Founder of TimelyTask",
        quote: "I'm Mohamed Shaik Mahsook M A, the developer behind this project."
    }
]

const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <>
      <Navbar />
      <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h3 className="text-indigo-600 font-semibold pb-6">Welcome to TimelyTask!</h3>
                    <ul>
                        {
                            testimonials.map((item, idx) => (
                                currentTestimonial == idx ? (
                                    <li key={idx}>
                                        <figure>
                                            <blockquote>
                                                <p className="text-gray-800 text-xl font-semibold sm:text-2xl">
                                                    “{item.quote}“
                                                </p>
                                            </blockquote>
                                            <div className="mt-6">
                                                <img src={item.avatar} className="w-25 h-25 mx-auto rounded-full" />
                                                <div className="mt-3">
                                                    <span className="block text-gray-800 font-semibold">{item.name}</span>
                                                    <span className="block text-gray-600 text-sm mt-0.5">{item.title}</span>
                                                </div>
                                            </div>
                                        </figure>
                                    </li>
                                ) : ""
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
     
          <Footer />
    </>
  );
};

export default Team;
