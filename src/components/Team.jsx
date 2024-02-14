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
    const teamMembers = [
        {
          name: "Mahsook M A",
          role: "Founder of TimelyTask",
          photoUrl: Mahsook,
          linkedinUrl: "https://www.linkedin.com/in/mahsook/",
    
        }
      ];

const [currentTestimonial, setCurrentTestimonial] = useState(0)

  return (
    <>
      <Navbar />
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="text-center pb-12">
            <h2 className="text-base font-bold text-customOrange">
            Welcome to TimelyTask!
            </h2>
            <h1 className="font-bold text-3xl md:text-4xl lg:text-4xl font-heading text-customBlue">
              Meet the Face Behind TimelyTask
            </h1>
          </div>
          <div className="flex flex-wrap justify-center">
          {teamMembers.map((member, index) => (
  <div
    key={index}
    className="flex flex-col items-center bg-white rounded-lg p-6 m-4 space-y-4"
  >
    <img
      className="object-center object-cover rounded-full h-40 w-40"
      src={member.photoUrl}
      alt="photo"
    />
    <div className="text-center">
      <p className="text-xl text-gray-700 font-bold mb-2">
        {member.name}
      </p>
      <p className="text-base text-gray-400 font-normal">
        {member.role}
      </p>
      <a
        href={member.linkedinUrl} // Use the LinkedIn URL from the teamMembers array
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 hover:text-blue-500"
      >
        <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
      </a>
    </div>
  </div>
))}

          </div>
        </section>

     
          <Footer />
    </>
  );
};

export default Team;
