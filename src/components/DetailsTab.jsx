import React, { useState, useEffect} from "react";
import { useRef } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Map from "./Location";
import Worker from "./WorkerDetails";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
const AvatarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {}; 

  const [state, setState] = useState(false);
  const profileRef = useRef();
  const navigation = [
    { title: "Post Work", path: "/postwork" },
    { title: "Your work", path: "/recivedworks" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target))
        setState(false);
    };
    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  const Logout = () => {
    // Remove the user data from local storage
    localStorage.removeItem('user');
  
    // Redirect to the login page after logout
    navigate("/login");
  };

  const goToPostWork = () => {
    navigate("/postwork", { state: userData });
  };

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          ref={profileRef}
          className="w-10 h-10 outline-none rounded-full ring-offset-2 ring-gray-200 lg:focus:ring-2"
          onClick={() => setState(!state)}
        >
          <img
            src="https://cdn1.iconfinder.com/data/icons/heroicons-ui/24/menu-512.png"
            className="w-full h-full rounded-full"
          />
        </button>
      </div>
      <ul
        className={`bg-white top-14 right-0 mt-6 space-y-6 lg:absolute lg:border lg:rounded-md lg:w-52 lg:shadow-md lg:space-y-0 ${
          state ? "" : "hidden"
        }`}
      >
        {navigation.map((item, idx) => (
          <li key={idx}>
            <a
              className="block text-gray-600 hover:text-gray-900 lg:hover:bg-gray-50 lg:p-3"
              href={item.path === "/postwork" ? "#" : item.path}
              onClick={item.path === "/postwork" ? goToPostWork : null}
            >
              {item.title}
            </a>
          </li>
        ))}
        <button
          className="block w-full text-justify text-gray-600 hover:text-gray-900 border-t py-3 lg:hover:bg-gray-50 lg:p-3"
          onClick={Logout}
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage and parse it to an object
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("Contact Details");
  const worker = location.state ? location.state.worker : null;

  useEffect(() => {
    if (worker) {
      console.log("Worker details:", worker);
    }
  }, [worker]);

  useEffect(() => {
    if (user) {
      console.log("User details:", user);
    }
  }, [user]);

  const handleRequestWork = async () => {
    try {
      const response = await fetch(`https://timelytask.onrender.com/users/${worker._id}/historyworksgiven`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          location: user.location,
        })
      });
      if (!response.ok) {
        throw new Error('Failed to request work');
      }
      // Handle success, maybe redirect or show a success message
      console.log('Work requested successfully');
      toast.success('Work requested successfully');
    } catch (error) {
      console.error('Error requesting work:', error.message);
      // Handle error, maybe show an error message to the user
    }
  };
  
  
  


  const tabItems = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
          />
        </svg>
      ),
      name: "Contact Details",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
          />
        </svg>
      ),
      name: "Live Location",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
          />
        </svg>
      ),
      name: "Reviews",
    },
  ];

  return (
    <>
      {/* Render Navbar and User Details */}
      <div className="navbar bg-base-100">
        <div className="flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">TimelyTask</a>
        </div>
        <div className="flex-none">
          <AvatarMenu />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 mt-8">
        <div className="items-start justify-between md:flex">
            <div>
                
            </div>
            <div className="items-center gap-x-3 mt-6 md:mt-0 sm:flex">
            <button
            onClick={handleRequestWork}
            className="block px-4 py-2 mt-3 text-center text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 sm:mt-0 md:text-sm"
          >
            Request this work
          </button>
            </div>
        </div>
      </div>
      <Tabs.Root
        className="max-w-screen-xl mx-auto px-4 md:px-8"
        defaultValue="Contact Details" // Set default value to the first tab
        onValueChange={(newValue) => setActiveTab(newValue)} // Update active tab on change
      >
        <Tabs.List
          className="w-full border-b flex items-center gap-x-3 overflow-x-auto text-sm"
          aria-label="Manage your account"
        >
          {tabItems.map((item, idx) => (
            <Tabs.Trigger
              key={idx}
              className={`group outline-none py-1.5 border-b-2 border-white text-gray-500 ${activeTab === item.name ? 'border-indigo-600 text-indigo-600' : ''}`}
              value={item.name}
            >
              <div className={`flex items-center gap-x-2 py-1.5 px-3 rounded-lg duration-150 group-hover:text-indigo-600 group-hover:bg-gray-50 group-active:bg-gray-100 font-medium ${activeTab === item.name ? 'text-indigo-600 bg-gray-50' : ''}`}>
                {item.icon}
                {item.name}
              </div>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {tabItems.map((item, idx) => (
          <Tabs.Content key={idx} className="py-6" value={item.name}>
            {activeTab === "Live Location" && worker && <Map latitude={worker.latitude} longitude={worker.longitude} />} 
            {activeTab === "Contact Details" && <Worker />} {/* Ensure to pass props accordingly */}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </>
  );
};
