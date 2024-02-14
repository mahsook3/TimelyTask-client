import { BsFillShieldLockFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import React, { useState } from "react";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Logo from '../assets/logo/logo.png';

export default () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const navigate = useNavigate();

  const onSignup = () => {
    setLoading(true);
    const appVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
      },
      auth
    );
    const formatPh = "+91" + phone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast.error("Failed to send OTP");
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) => {
        console.log("OTP Verification Successful:", res);
        setLoading(false);
        toast.success("OTP verified successfully!");
        // Proceed with user registration
        registerUser();
      })
      .catch((err) => {
        console.error("OTP Verification Error:", err);
        setLoading(false);
        toast.error("OTP verification failed");
      });
  };

  const registerUser = () => {
    const userData = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };

    fetch("https://timelytask.onrender.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        return response.json();
      })
      .then((data) => {
        console.log("User created successfully:", data);
        toast.success("User created successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        toast.error("Failed to create user");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) {
      toast.error("Please fill all the fields");
    } else {
      onSignup();
    }
  };

  return (
    <main className="w-full flex">
            <Toaster toastOptions={{ duration: 4000 }} />
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-600 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <img src={Logo} width={150} />
          <div className=" mt-16 space-y-3">
            <h3 className="text-customOrange text-3xl font-bold">
              Welcome back to TimelyTask!
            </h3>
            <p className="text-gray-300">
              Say goodbye to the hassle of managing tasks and chasing payments.
            </p>
          </div>
        </div>
      </div>
      <div id="recaptcha-container"></div>
        <div className="flex-1 flex items-center justify-center h-screen">
          <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
            <div>
              <div className="mt-5 space-y-2">
                <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">Sign up</h3>
                <div className="">
            <img
              src={Logo}
              width={150}
              className="lg:hidden"
            />
            <div className="mt-5 space-y-2">
              <p>
                Already have an account?{" "}
                <a
                  href="javascript:void(0)"
                  onClick={() => navigate("/login")}
                  className="font-medium text-customOrange hover:text-customBlue"
                >
                  Log in here
                </a>
              </p>
            </div>
          </div>
              </div>
            </div>
            {showOTP ? (
              <>
                <div className="text-black w-fit mx-auto p-4 rounded-full">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="font-bold text-xl text-black text-center">
                  Enter your OTP
                </label>
                <input
                  type="number"
                  required
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:customOrange shadow-sm rounded-lg"
                />
                <button
                  onClick={onOTPVerify}
                  className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="font-medium">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:customOrange shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:customOrange shadow-sm rounded-lg"
                  />
                </div>
                <div>
                  <label className="font-medium">Phone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:customOrange shadow-sm rounded-lg"
                  />
                  <p>*Just give 10 digit of your phone number</p>
                </div>
                <div>
                  <label className="font-medium">Password</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:customOrange shadow-sm rounded-lg"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white font-medium bg-customBlue hover:bg-customOrange active:bg-customBlue rounded-lg duration-150"
                >
                  {loading ? (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
    </main>
  );
};
