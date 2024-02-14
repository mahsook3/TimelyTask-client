import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const AvatarMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state || {}; 

  const [state, setState] = useState(false);
  const profileRef = useRef();
  const navigation = [
    { title: "Post Work", path: "/postwork" },
    { title: "Your work", path: "javascript:void(0)" },
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

const UserDetails = ({ userData }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage and parse it to an object
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
  useEffect(() => {
    // Retrieve the user data from local storage and parse it to an object
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);
  return (
    <div>
      {/* <h1>Welcome, {user ? user.name : "Guest"}!</h1> */}
    </div>
  );
};

const WorkerItem = ({ worker, userData }) => {
  const navigate = useNavigate();

  const handleConnectClick = (e) => {
    e.preventDefault();
    if (worker) {
      navigate("/details", { state: { worker, user: userData } });
    } else {
      console.log("Worker data is not available");
    }
  };

  if (
    !worker.workcategory ||
    !worker.workdescription ||
    !worker.location ||
    !worker.paymentamount ||
    !worker.date
  ) {
    return null; // Don't render the worker if any required field is null
  }

  return (
    <li className="border rounded-lg">
      
      <div className="flex items-start justify-between p-4">
        <div className="space-y-2">
          <h4 className="text-gray-800 font-semibold">{worker.workcategory}</h4>
          <p className="text-gray-600 text-sm">{worker.workdescription}</p>
          <span className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
              className="w-5 h-5 text-gray-500"
            >
              <path
                fill="#9CA3AF"
                d="M0 64C0 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 0 193.7 0 176C0 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 0 81.67 0 64V64z"
              ></path>
            </svg>
            {worker.paymentamount}
          </span>
          <span className="flex items-center gap-2 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="none"
              className="w-5 h-5 text-gray-500"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.05025 4.05025C7.78392 1.31658 12.2161 1.31658 14.9497 4.05025C17.6834 6.78392 17.6834 11.2161 14.9497 13.9497L10 18.8995L5.05025 13.9497C2.31658 11.2161 2.31658 6.78392 5.05025 4.05025ZM10 11C11.1046 11 12 10.1046 12 9C12 7.89543 11.1046 7 10 7C8.89543 7 8 7.89543 8 9C8 10.1046 8.89543 11 10 11Z"
                fill="#9CA3AF"
              ></path>
            </svg>
            {worker.location}
          </span>
        </div>
        <button
          className="text-gray-700 text-sm border rounded-lg px-3 py-2 duration-150"
          onClick={handleConnectClick}
        >
          {new Date(worker.date).toLocaleDateString("en-GB")}
        </button>
      </div>
      <div className="py-5 px-4 border-t text-right bg-customBlue rounded-b-lg">
        {" "}
        <a
          href="#"
          onClick={handleConnectClick}
          className="text-gray-100 hover:text-customOrange text-sm font-medium "
        >
          Get Connect
        </a>
      </div>
    </li>
  );
};

const DiscoverWorkers = ({userData}) => {
  const [integrations, setIntegrations] = useState([]);
  const [workerCategories, setWorkerCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetch("https://timelytask.onrender.com/users")
      .then((response) => response.json())
      .then((data) => {
        const locations = [...new Set(data.map((worker) => worker.location))].sort();
        setLocations(locations);
        const categories = [...new Set(data.map((worker) => worker.workcategory))].sort();
        setWorkerCategories(categories);
        setIntegrations(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredWorkers = integrations.filter((worker) => {
    if (selectedLocation && worker.location !== selectedLocation) return false;
    if (selectedCategory && worker.workcategory !== selectedCategory) return false;
    return true;
  });

  return (
    <>
    <UserDetails userData={userData} />
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
      <div className="max-w-screen-xl mx-auto px-4 pt-4 md:px-8">
        <div className="items-start justify-between gap-x-4 py-4 border-b sm:flex">
          {/* Render Filter Options */}
          <div className="relative mt-6 sm:mt-0">
            <select 
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg sm:max-w-xs"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Worker category</option>
              {isLoading ? (
                <option value="" disabled>Loading categories...</option>
              ) : (
                workerCategories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))
              )}
            </select>
          </div>
          <div className="relative mt-6 sm:mt-0">
            <select 
              className="w-full pl-12 pr-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 rounded-lg sm:max-w-xs"
              value={selectedLocation}
              onChange={handleLocationChange}
            >
              <option value="">Location</option>
              {isLoading ? (
                <option value="" disabled>Loading locations...</option>
              ) : (
                locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>
      <section className="py-16">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              filteredWorkers.map((worker, idx) => (
                <WorkerItem key={idx} worker={worker} userData={userData} />
              ))
            )}
          </ul>
        </div>
      </section>
    </>
  );
};


export default DiscoverWorkers;
