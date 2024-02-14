import React from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Contact = () => {
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
    .sendForm("service_4db287e", "template_f7szpg1", e.target, "iD6eSbwQ2NjIhMYRN")
    .then((result) => {
      toast.success("Email sent successfully!"); // Show success toast
      e.target.reset(); // Reset the form
      })
      .catch((error) => {
        toast.error("Error sending email. Please try again."); // Show error toast
      });
  };

  const contactMethods = [
    
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      ),
      contact:
        "Sri Eshwar College of Engineering, Kinathukadavu, Coimbatore – 641 202, Tamil Nadu.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="py-14">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="max-w-lg mx-auto gap-12 justify-between lg:flex lg:max-w-none">
          <div className="max-w-lg space-y-3">
              <h3 className="text-customOrange font-semibold">Contact</h3>
              <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                Let us know how we can help
              </p>
              <p>
                We’re here to help and answer any question you might have, We
                look forward to hearing from you! Please fill out the form, or
                us the contact information bellow .
              </p>
              <div>
                <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-6 items-center">
                  {contactMethods.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-x-3">
                      <div className="flex-none text-gray-400">{item.icon}</div>
                      <p>{item.contact}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex-1 mt-12 sm:max-w-lg lg:max-w-md">
              <form onSubmit={sendEmail} className="space-y-5">
                <div>
                  <label className="font-medium">Full name</label>
                  <input
                    type="text"
                    required
                    name="from_name" // Placeholder "from_name" in the email template
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    required
                    name="to_name" // Placeholder "to_name" in the email template
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    name="subject" // Placeholder "subject" in the email template
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Message</label>
                  <textarea
                    required
                    name="message" // Placeholder "message" in the email template
                    className="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-customOrange shadow-sm rounded-lg"
                  ></textarea>
                </div>
                <button className="w-full px-4 py-2 text-white font-medium bg-customBlue hover:bg-customOrange active:bg-customBlue rounded-lg duration-150">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
