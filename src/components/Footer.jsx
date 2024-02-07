import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookSquare,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
  return (
    <footer className="relative bg-gray-200 pt-8 pb-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl fonat-semibold text-gray-700">
              Let's keep in touch!
            </h4>
            <h5 className="text-lg mt-0 mb-2 text-gray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
  <button
    className="bg-[#1DA1F2] text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
    type="button"
  >
    <a
      href="https://twitter.com/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faTwitter} />
    </a>
  </button>
  <a
    href="https://www.facebook.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      className="bg-[#1877F2] text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
      type="button"
    >
      <FontAwesomeIcon icon={faFacebookSquare} />
    </button>
  </a>
  <a
    href="https://linkedin.com/"
    target="_blank"
    rel="noopener noreferrer"
  >
    <button
      className="bg-[#0A66C2] text-white shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"
      type="button"
    >
      <FontAwesomeIcon icon={faLinkedin} />
    </button>
  </a>
</div>

          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-gray-500 text-sm font-semibold mb-2">
                  Useful Links
                </span>
                <ul className="list-unstyled">
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/community"
                      // Opens link in a new tab
                      rel="noopener noreferrer" // Recommended for security
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/team"
                    >
                      Meet Our team
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-gray-600 hover:text-gray-800 font-semibold block pb-2 text-sm"
                      href="/contact"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-gray-500 font-semibold py-1">
              {/* Copyright © <span id="get-current-year">2021</span> */}
              <a
                href="#"
                className="text-gray-500 hover:text-gray-800"
                target="_blank"
              >
                {/* {" "} */}
                Made with ❤️ in Kovai | கோவையில் ❤️ உருவாக்கப்பட்டது
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800">
                {/* Creative Tim */}
              </a>
              {/* . */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
