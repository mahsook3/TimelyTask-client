//BuyerProfile.jsx
import React, { useEffect, useRef, useState } from "react";
import profile from "../assets/profile.png";
import Info from "./Info";
import Location from "./Location";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageNotFound from "./PageNotFound";
import defaultLogo from "../assets/logo/NearTreat.png";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const BuyerProfile = () => {
  const navigate = useNavigate();


  function handleClick(item) {
    // e.preventDefault();
    if (localStorage.getItem("location") === null) {
      localStorage.setItem("location", JSON.stringify(item));
    } else if (localStorage.getItem("location") !== null) {
      localStorage.removeItem("location");
      localStorage.setItem("location", JSON.stringify(item));
    }
    navigate("/seller/location",{state : details});
  }
  const [recipes, setRecipes] = useState([]);
  const [selectedItem, setSelectedItem] = useState({
    item: null,
    idx: null,
  });

  const [state, setState] = useState(false);
  const [searchFieldVal, setSearchFieldVal] = useState("");

  const listboxRef = useRef();

  const [filteredRecipes, setFilteredRecipes] = useState(recipes);


  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".label-button")) setState(false);
    };

    fetch("https://neartreat-p34i.onrender.com/seller")
      .then((response) => response.json())
      .then((data) => {
        const allRecipes = data.reduce((recipesList, seller) => {
          if (seller.recipes && typeof seller.recipes === "string") {
            const sellerRecipes = seller.recipes.split(",").map((recipe) => recipe.trim());
            return [...recipesList, ...sellerRecipes];
          } else if (seller.recipes === null) {
            console.log("No recipes found for seller:", seller.name);
            return recipesList;
          }
        }, []);
        

        
        
        
        
        
        
        const uniqueRecipes = Array.from(new Set(allRecipes));
        setRecipes(uniqueRecipes);
      })
      .catch((error) => console.error("Error fetching seller details:", error));
  }, []);

  const [details, setDetails] = useState({ name: "none" });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sellerDetails, setSellerDetails] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);

  useEffect(() => {
    setDetails(JSON.parse(localStorage.getItem("user")));

    fetch("https://neartreat-p34i.onrender.com/seller")
      .then((response) => response.json())
      .then((data) => {
        setSellerDetails(data);
        getCurrentLocation();
      })
      .catch((error) => console.error("Error fetching seller details:", error));
  }, []);

  function handleDelete() {
    localStorage.removeItem("user");
    setDetails("");
    toast.success("Logout Successfully.", {
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
  }

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance.toFixed(2);
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  const getDistanceToSeller = (seller) => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation;
      const distance = calculateDistance(
        latitude,
        longitude,
        seller.latitude,
        seller.longitude
      );
      return parseFloat(distance);
    }
    return Infinity;
  };

  const sortSellersByDistance = (sellers) => {
    return sellers.sort((a, b) => {
      const distanceA = getDistanceToSeller(a);
      const distanceB = getDistanceToSeller(b);
      return distanceA - distanceB;
    });
  };

  const sortedSellerDetails = sortSellersByDistance(sellerDetails);
  const nearbySellers = sortedSellerDetails.filter(
    (seller) => getDistanceToSeller(seller) <= 10
  );

  const handleSellerClick = (seller) => {
    setSelectedSeller(seller);
  };

  const [favoriteSellers, setFavoriteSellers] = useState([]);

  const handleAddToFavorites = (seller) => {
    if (!favoriteSellers.includes(seller)) {
      setFavoriteSellers([...favoriteSellers, seller]);
    } else {
      const updatedFavorites = favoriteSellers.filter(
        (favSeller) => favSeller !== seller
      );
      setFavoriteSellers(updatedFavorites);
    }
  };

  const handleSearch = (e) => {
    const menuEls = document.querySelectorAll(".menu-el-js");
    const searchVal = e.target.value.toLowerCase();
    const alrtEl = document.getElementById("li-alert");
    setSearchFieldVal(e.target.value);
    const handleAlert = () => {
      if (listboxRef.current && listboxRef.current.offsetHeight < 5)
        alrtEl.classList.remove("hidden");
      else alrtEl.classList.add("hidden");
    };
    handleAlert();
    setTimeout(() => handleAlert(), 100);

    menuEls.forEach((el, idx) => {
      el.classList.remove("hidden");
      if (!recipes[idx].toLowerCase().includes(searchVal)) {
        el.classList.add("hidden");
      }
    });
    const filtered = recipes.filter((recipe) =>
    recipe.toLowerCase().includes(searchVal)
  );
  setFilteredRecipes(filtered);
  };

  console.log(sellerDetails)

  return (
    <>
      <div className="navbar bg-base-100 bg-white">
        <div className="flex-1">
          <a
            onClick={() => navigate("/")}
            className="btn btn-ghost normal-case text-xl"
          >
            NearTreat
          </a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="indicator">
                <FontAwesomeIcon
                  icon={regularHeart}
                  className="w-5 h-5 text-red-600"
                />
                <span className="badge badge-sm indicator-item">
                  {favoriteSellers.length}
                </span>
              </div>
            </label>

            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <ul className="grid gap-2 md:grid-cols-2 lg:grid-cols-3">
                  {favoriteSellers.map((item, idx) => (
                    <li key={idx} className="border rounded-lg shadow-lg">
                      <div className="flex items-start justify-between p-4">
                        <div className="space-y-2">
                          <img
                            src={item.image ? item.image : defaultLogo}
                            alt={item.name}
                            className="w-10 h-10"
                          />
                        </div>
                        <h4 className="text-gray-800 font-semibold">
                          {item.name}
                        </h4>
                      </div>
                      <a
                        href="javascript:void(0)"
                        className="text-red-600 hover:text-red-500 text-sm font-medium flex justify-center"
                        onClick={() => handleClick(item)}
                      >
                        Get Location
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="card-actions">
                  <button
                    className="btn btn-block bg-customRed text-white" // Applying customRed background and white text
                    onClick={() => setFavoriteSellers([])}
                  >
                    Remove all
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={defaultLogo} alt={details.name} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">{details.name}</a>
              </li>
              <li>
                <a onClick={handleDelete}>
                  Logout
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-log-out w-5 h-5"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1={21} y1={12} x2={9} y2={12} />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {details ? (
        <>
          <div className="flex flex-col w-full h-full mt-8">
            <div className="relative max-w-xs px-4 text-base">
              <div className="label-button flex items-center gap-1 px-2 border rounded-lg shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Type to search"
                  className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                  value={searchFieldVal}
                  onChange={handleSearch}
                  onFocus={() => setState(true)}
                />
                {searchFieldVal ? (
                  <button
                  onClick={() => {
                    setSearchFieldVal("");
                    setSelectedItem({ item: "", idx: null });
                    setState(false);
                    setFilteredRecipes(recipes); // Reset to display all recipes
                  }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-gray-400 "
                    >
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                  </button>
                ) : (
                  <button onClick={() => setState(!state)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {state ? (
                <div className="relative w-full z-50">
                  <ul
                    ref={listboxRef}
                    className="absolute w-full mt-3 overflow-y-auto bg-white border rounded-md shadow-sm max-h-64"
                    role="listbox"
                  >
                    <li
                      id="li-alert"
                      className="hidden px-3 py-2 text-center text-gray-600"
                    >
                      No results available
                    </li>
                    {filteredRecipes.map((recipe, idx) => (
                      <li
                        key={idx}
                        onClick={() => {
                          setSelectedItem({ item: recipe, idx });
                          setSearchFieldVal(recipe);
                        }}
                        role="option"
                        aria-selected={selectedItem.idx === idx}
                        className={`${
                          selectedItem.idx === idx
                            ? "text-red-600 bg-red-50"
                            : ""
                        } menu-el-js flex items-center justify-between px-3 py-2 cursor-default duration-150 text-gray-500 hover:text-red-600 hover:bg-red-50`}
                      >
                        {recipe}
                        {selectedItem.idx === idx ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-red-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          ""
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>

            <section className="py-16">
              <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
                <div className="max-w-md ">
                  <h1 className="text-gray-800 text-xl font-extrabold sm:text-2xl">
                    Search for your Favorite recipes
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Find a nearby street food stall
                  </p>
                </div>
                <ul className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 ">
                  {sellerDetails.map((item, idx) => (
                    <li key={idx} className="border rounded-lg shadow-lg">
                      <div className="flex items-start justify-between p-4">
                        <div className="space-y-2">
                          <img
                            src={item.image ? item.image : defaultLogo}
                            alt={item.name}
                            className="w-10 h-10"
                          />
                          <h4 className="text-gray-800 font-semibold">
                            {item.name}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {item.recipes
                              .split(",")
                              .map((recipe) => recipe.trim())
                              .filter(
                                (value, index, self) =>
                                  self.indexOf(value) === index
                              )
                              .join(", ")}
                          </p>
                          <p>{item.current_location}</p>
                        </div>
                        <button
                          onClick={() => handleAddToFavorites(item)}
                          className={`text-sm rounded-lg px-3 py-2 duration-150 ${
                            favoriteSellers.includes(item)
                              ? "text-red-600"
                              : "text-gray-700 hover:text-red-600"
                          }`}
                        >
                          <FontAwesomeIcon
                            icon={
                              favoriteSellers.includes(item)
                                ? solidHeart
                                : regularHeart
                            }
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between py-5 px-4 border-t text-right">
                        <div className="flex items-center">
                          <svg
                            className="w-4 h-4 text-yellow-300 mr-1"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 22 20"
                          >
                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                          </svg>
                          <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                            {item.reviews && item.reviews.length > 0
                              ? (
                                  item.reviews.reduce(
                                    (total, review) => total + review.rating,
                                    0
                                  ) / item.reviews.length
                                ).toFixed(2)
                              : "NA"}
                          </p>
                          <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400" />
                          <a className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                            {item.reviews && item.reviews.length > 0
                              ? `${item.reviews.length} ${
                                  item.reviews.length === 1
                                    ? "review"
                                    : "reviews"
                                }`
                              : "No reviews"}
                          </a>
                        </div>

                        <a
                          href="javascript:void(0)"
                          className="text-red-600 hover:text-red-500 text-sm font-medium"
                          onClick={() => handleClick(item)}
                        >
                          Get Location
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {selectedSeller && (
              <Location seller={selectedSeller} key={selectedSeller._id} />
            )}
          </div>
        </>
      ) : (
        <>
          <PageNotFound />
        </>
      )}
    </>
  );
};

export default BuyerProfile;
