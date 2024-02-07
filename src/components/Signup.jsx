import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import OtpInput from "otp-input-react";
import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { Toaster } from "react-hot-toast";
import { ToastContainer, toast } from "react-toastify";
import Footer from "./Footer";
import logoGif from "../assets/logo/TimelyTask.gif";
const Signup = () => {
  const navigate = useNavigate();

  const [option, setOption] = useState("Buyer");
  const [value, setValue] = useState("Pushcart");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [recipe, setRecipe] = useState("");
  const [upiId, setUpiId] = useState("");
  const [oneClick, setOneClick] = useState(true);
  const [isLoading, setIsLoading] = useState(false); // Define isLoading state
  const [isSuccess, setIsSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function handleOption(e) {
    const selectedOption = e.target.value;
    setOption(selectedOption);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (option === "Buyer") {
      if (!name || !email || !ph || !password) {
        toast.warn("errorMessage 1", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if (oneClick) {
        setOneClick(false);
        const newObj = { name, email, mobile_number: ph, password };
        await fetch("https://TimelyTask-p34i.onrender.com/buyer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        })
          .then(() => {
            toast.success("Account created Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/login");

            setName("");
            setEmail("");
            setPh("");
            setPassword("");
          })
          .catch((err) => {
            toast.warn("errorMessage 2", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setOneClick(true);
            return;
          });
      }
    } else if (option === "Seller") {
      if (!name || !email || !ph || !password || !recipe || !value) {
        toast.warn("errorMessage 3", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }
      if (oneClick) {
        setOneClick(false);
        const newObj = {
          name,
          email,
          mobile_number: ph,
          password,
          stall_type: value,
          recipes: recipe,
          location: city + " " + street,
          latitude: currentLocation?.latitude,
          longitude: currentLocation?.longitude,
          district,
          image,
          upi_id: upiId,
        };

        await fetch("https://TimelyTask-p34i.onrender.com/seller", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newObj),
        })
          .then(() => {
            toast.success("Account created Successfully", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            navigate("/login");

            setCurrentLocation("");
            setStreet("");
            setCity("");
            setDistrict("");
            setRecipe("");
            setUpiId("");

            setName("");
            setEmail("");
            setPh("");
            setPassword("");
            setImage("");
          })
          .catch((err) => {
            toast.warn("Error ...", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setOneClick(true);
            return;
          });
      }
    }
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({ latitude, longitude });
          console.log("Latitude:", latitude);
          console.log("Longitude:", longitude);
          fetchLocationDetails(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const apiKey = "1YCcEbdT3y5XkYbLvlnKK46SSWYjEkYa";
      const geocodingAPI = `https://www.mapquestapi.com/geocoding/v1/reverse?key=${apiKey}&location=${latitude},${longitude}`;

      const response = await fetch(geocodingAPI);
      const data = await response.json();

      if (response.ok) {
        const {
          street,
          adminArea5: city,
          adminArea4: district,
        } = data.results[0].locations[0];
        setStreet(street || "");
        setCity(city || "");
        setDistrict(district || "");
      } else {
        console.error(
          "Error getting location details:",
          data.error || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Error getting location details:", error);
    }
  };

  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup(); // Make sure this function is only called once when Recaptcha is verified.
          },
          "expired-callback": () => {
            console.log("Recaptcha expired");
          },
        },
        auth
      );
    }
  }

  async function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    setPh(formatPh);

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPh,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setLoading(false);
      setShowOTP(true);
      toast.success("OTP sent successfully!");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  function convertToBase64(e) {
    e.preventDefault();
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);

    reader.onload = () => {
      // console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (err) => {
      console.log("Error", err);
    };
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const missingFields = [];

  // Check each field and add its name to the array if it's missing
  if (!name) {
    missingFields.push("Name");
  }
  if (!email) {
    missingFields.push("Email");
  }
  if (!ph) {
    missingFields.push("Phone Number");
  }
  if (!password) {
    missingFields.push("Password");
  }

  // Generate the error message based on the missing fields
  let errorMessage =
    "Please enter the following fields: " + missingFields.join(", ");

  return (
    <>
      <div className="navbar bg-base-100 ">
        <div className="flex-1 ">
          <a className="btn btn-ghost normal-case text-xl hover:bg-transparent">
            {" "}
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="tablet:w-[10rem] w-[8rem] cursor-pointer  ml-3"
              />
            </Link>
          </a>
        </div>
      </div>
      {/* component */}
      <style
        dangerouslySetInnerHTML={{
          __html:
            "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')",
        }}
      />
      <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
        <div
          className=" text-gray-500 rounded-3xl shadow-2xl w-full overflow-hidden"
          style={{ maxWidth: 1000 }}
        >
          <div className="md:flex w-full">
            <Toaster toastOptions={{ duration: 4000 }} />
            <div id="recaptcha-container"></div>
            {user ? (
              <>
                {/* component */}
                <style
                  dangerouslySetInnerHTML={{
                    __html:
                      "@import url('https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/5.3.45/css/materialdesignicons.min.css')",
                  }}
                />

                <div
                  className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden"
                  style={{ maxWidth: 1000 }}
                >
                  <div className="md:flex w-full">
                    <div className="hidden md:block w-1/2 bg-white-500 py-10 px-10">
                      <div className="flex justify-center items-center h-full">
                        <img src={logoGif} alt="Logo Gif" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                      <div className="text-center mb-10">
                        <h1 className="font-bold text-3xl text-gray-900">
                          REGISTER
                        </h1>
                        <p>Enter your information to register</p>
                      </div>
                      <div>
                        <div className="flex -mx-3">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor=""
                              className="text-xs font-semibold px-1"
                            >
                              Name
                            </label>
                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
                                  />
                                </svg>
                              </div>
                              <input
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-red-500"
                                name="Name"
                                type="text"
                                placeholder="Enter your full name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex -mx-3">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor=""
                              className="text-xs font-semibold px-1"
                            >
                              Mobile Number
                            </label>
                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M17 19H7V5h10m0-4H7c-1.11 0-2 .89-2 2v18a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Z"
                                  />
                                </svg>
                              </div>
                              <input
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-red-500"
                                name="phonenumber"
                                type="tel"
                                placeholder="+91 97865xxxxx"
                                value={ph}
                                onChange={(e) => setPh(e.target.value)}
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex -mx-3">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor=""
                              className="text-xs font-semibold px-1"
                            >
                              Email
                            </label>
                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="m20 8l-8 5l-8-5V6l8 5l8-5m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"
                                  />
                                </svg>
                              </div>
                              <input
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-red-500"
                                name="Email"
                                type="email"
                                placeholder="Enter your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex -mx-3">
                          <div className="w-full px-3 mb-5">
                            <label
                              htmlFor=""
                              className="text-xs font-semibold px-1"
                            >
                              Password
                            </label>
                            <div className="flex">
                              <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M12 17a2 2 0 0 0 2-2a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2m6-9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2h1V6a5 5 0 0 1 5-5a5 5 0 0 1 5 5v2h1m-6-5a3 3 0 0 0-3 3v2h6V6a3 3 0 0 0-3-3Z"
                                  />
                                </svg>
                              </div>
                              <input
                                className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-red-500"
                                placeholder="************"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                       

                        <div className="flex">
                          <div className="flex -mx-3">
                            <div className="w-full px-3 mb-5">
                              <button
                                className="block w-full max-w-xs mx-auto bg-customRed hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold mt-4"
                                onClick={handleSubmit}
                                disabled={isLoading}
                              >
                                {isLoading ? "Wait..." : "Register Now"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-80 flex flex-col gap-4 rounded-lg p-4 mx-auto">
                <h1 className="text-center leading-normal text-[#D2042D] font-medium text-3xl mb-6">
                  Welcome to <br /> TimelyTask
                </h1>
                {showOTP ? (
                  <>
                    <div className="bg-white text-[#D2042D] w-fit mx-auto p-4 rounded-full">
                      <BsFillShieldLockFill size={30} />
                    </div>
                    <label
                      htmlFor="otp"
                      className="font-bold text-xl text-black text-center"
                    >
                      Enter your OTP
                    </label>
                    <div className=" bg-[rgba(0,0,0,0.1)]">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="opt-container -mx-4 relative w-full p-2 text-black"
                      ></OtpInput>
                    </div>
                    <button
                      onClick={onOTPVerify}
                      className="bg-[#D2042D] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                    >
                      {loading && (
                        <CgSpinner size={20} className="mt-1 animate-spin" />
                      )}
                      <span>Verify OTP</span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className=" bg-slate-400 text-white w-fit mx-auto p-4 rounded-full">
                      <BsTelephoneFill size={30} />
                    </div>
                    <div className="flex flex-col items-center">
                      <label
                        htmlFor=""
                        className="font-bold text-xl text-black text-center mb-2"
                      >
                        Verify your phone number
                      </label>

                      <div>
                        <PhoneInput
                          country={"in"}
                          value={ph}
                          onChange={setPh}
                        />
                      </div>

                      <button
                        onClick={onSignup}
                        className="block w-full max-w-xs mx-auto bg-customRed hover:bg-red-700 focus:bg-red-700 text-white rounded-lg px-3 py-3 font-semibold mt-4"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send code via SMS</span>
                      </button>

                      <p>
                        Have an account?{" "}
                        <Link
                          to="/login" // Define the route you want to navigate to
                          className="text-red-600 transition duration-200 hover:underline dark:text-red-400"
                        >
                          Login Here
                        </Link>
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Signup;
