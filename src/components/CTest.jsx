import defaultLogo from "../assets/logo/NearTreat.png";
import {
  Typography,
  Avatar,
  Rating,
  Menu,
  MenuItem,
  MenuList,
  MenuHandler,
  Input,
  Textarea,
} from "@material-tailwind/react";
import profile from "../assets/profile.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageNotFound from "./PageNotFound";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIndianRupeeSign,
  faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { ImageModel } from "react-teachable-machine";
import Webcam from "react-webcam";

const Profile = () => {
  const [details, setDetails] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isForget, setIsForget] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [prediction, setPrediction] = React.useState(null);
  const [recipesearch, setRecipeSearch] = React.useState("");

  const addToRecipe = () => {
    if (prediction) {
      setRecipe((prevRecipe) => {
        return prevRecipe
          ? `${prevRecipe}, ${prediction.className}`
          : prediction.className;
      });
    }
  };

  useEffect(() => {
    if (details && details.recipes) {
      // Split the recipes data and create an array of menu items with recipe names and initial prices
      const recipes = details.recipes.split(",");
      const menuItems = recipes.map((recipe, index) => ({
        recipeName: recipe.trim(),
        price: 0, // Initialize the price to 0 for each recipe
      }));
      setMenuItems(menuItems); // Update the state with the menu items
    }
  }, [details]);

  useEffect(() => {
    try {
      setDetails(JSON.parse(localStorage.getItem("user")));
      // setRecipe(details.recipes);
      if (details) {
        fetch("https://neartreat-p34i.onrender.com/seller")
          .then((response) => response.json())
          .then((data) => {
            const user = data.find(
              (users) =>
                users.email === details.email &&
                users.password === details.password
            );

            if (user) {
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(user));
              setDetails(JSON.parse(localStorage.getItem("user")));
            } else {
              console.log("Invalid credentials");
            }
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      }
    } catch (err) {
      toast.warn("Error on server side.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [recipe]);

  async function handleRecipe(e) {
    await fetch(`https://neartreat-p34i.onrender.com/seller/${details._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipes: recipe }),
    })
      .then((data) => {
        setRecipe("");
        toast.success("Recipe Updated Successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warn("Error on server side.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  async function handlePassword(e) {
    e.preventDefault();
    setIsForget(false);
    await fetch(`https://neartreat-p34i.onrender.com/seller/${details._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    })
      .then((data) => {
        toast.success("Password Updated Successfully.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.warn("Password Not Updated.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  }

  function handleDelete() {
    try {
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
    } catch (err) {
      console.log(err);
      toast.warn("Error on server side.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  async function handleLocation(e) {
    e.preventDefault();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setCurrentLocation({ latitude, longitude });
          await fetchLocationDetails(latitude, longitude); // Fetch full location details and update details.current_location
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }

  const fetchLocationDetails = async (latitude, longitude) => {
    try {
      const nominatimAPI = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      const response = await fetch(nominatimAPI);
      const data = await response.json();

      if (response.ok) {
        const fullAddress = data.display_name || "";
        const city = data.address.city || "";
        const district = data.address.suburb || "";

        const updatedLocation = `${fullAddress} ${city} ${district}`;

        // Update location in the backend and also in the state
        await fetch(
          `https://neartreat-p34i.onrender.com/seller/${details._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              current_location: updatedLocation,
              latitude: latitude,
              longitude: longitude,
              district: district,
            }),
          }
        )
          .then((result) => {
            toast.success("Location Updated Successfully.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });

            // Update the current_location state
            setDetails({
              ...details,
              current_location: updatedLocation,
            });
          })
          .catch((err) =>
            toast.warn("Location not updated Error..", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          );
      } else {
        console.error(
          "Error getting location details:",
          data.error || "Unknown error"
        );
      }
    } catch (error) {
      toast.warn("Error on getting Location ", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.error("Error getting location details:", error);
    }
  };

  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    console.log("Total Rating:", totalRating); // Log the total rating
    const averageRating = totalRating / reviews.length;
    console.log("Average Rating:", averageRating); // Log the calculated average rating
    const scaledAverageRating = (averageRating / 5) * 4 + 1;
    console.log("scaledAverageRating:", scaledAverageRating); // Log the calculated average rating

    return scaledAverageRating;
  }

  const scaledAverageRating = calculateAverageRating(details.reviews);

  const [value, setValue] = useState(0);

  const decrement = () => {
    setValue(value - 1);
  };

  const increment = () => {
    setValue(value + 1);
  };

  // Handle price input change
  const handlePriceChange = (e, index) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      const updatedMenuItems = [...menuItems];
      updatedMenuItems[index].price = newPrice;
      setMenuItems(updatedMenuItems);
    }
  };

  // Handle form submission

  const sendUpdatedPrices = async () => {
    try {
      const sellerId = details._id; // Replace with your seller's ID
      const updatedPrices = {};

      // Create an object with recipe names as keys and their prices as values
      menuItems.forEach((menuItem) => {
        updatedPrices[menuItem.recipeName] = menuItem.price;
      });

      const response = await fetch(
        `https://neartreat-p34i.onrender.com/seller/${sellerId}`,
        {
          method: "PATCH", // Use PATCH or POST depending on your API
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prices: updatedPrices,
          }),
        }
      );

      if (response.ok) {
        console.log("Prices updated successfully");
      } else {
        console.error("Failed to update prices");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    await sendUpdatedPrices(); // Send updated prices to the server
  };

  return (
    <>
      <div className="navbar bg-base-100">
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
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={details.image ? details.image : defaultLogo}
                  alt={details.name}
                />
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
      <link
        href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-center">
            <img
              src={details.image ? details.image : defaultLogo}
              alt={details.name}
              className="rounded-full w-32 h-32"
            />
          </div>
          <div className="mt-4 text-center">
            <h4 className="text-xl font-semibold">{details.name}</h4>
            <p className="text-gray-500 mb-2">{details.stall_type}</p>
            <p className="text-gray-600">{details.current_location}</p>
            <button
              className="bg-customRed hover:bg-red-700 text-white px-4 py-2 rounded mt-2"
              onClick={handleLocation}
            >
              Update Location
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between mt-6">
          <div className="md:w-3/4 bg-white rounded-lg shadow-md p-6 md:mr-4 md:mb-0 mb-4">
            <h6 className="text-sm font-semibold mb-2">Available Menu</h6>
            <ul className="list-none">
              <li className="mb-2">Menu: {details.recipes}</li>
            </ul>
            <div className="mb-6" style={{ zIndex: 5 }}>
              <input
                type="text"
                className="border border-gray-300 rounded-md py-2 px-4 w-full bg-white text-gray-800 focus:outline-none focus:ring focus:border-blue-300 relative"
                name="recipe"
                placeholder="Enter the recipes"
                value={recipe || recipesearch}
                onChange={(e) => setRecipe(e.target.value)}
              />
              <Textarea
                color="blue"
                className="form_input"
                name="recipe"
                placeholder="Enter the recipes"
                type="text"
                value={recipe}
                onChange={(e) => setRecipe(e.target.value)}
              />
              <div className="flex items-center">
  <button
    className="bg-customRed hover:bg-red-700 text-white px-4 py-2 rounded mt-4"
    position="static"
    zIndex="5"
    onClick={handleRecipe}
  >
    Update Menu
  </button>
  <label
    htmlFor="my_modal_7"
    className="btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded ml-4 mt-4"
  >
    Use AI Preditor
  </label>
</div>
              <input type="checkbox" id="my_modal_7" className="modal-toggle" />
              <div className="modal" role="dialog">
                <div className="modal-box">
                <div className="container">
      <Webcam height={600} width={600} />
    </div>
                  <div className="visibility: hidden">
                    <ImageModel
                      preview={false}
                      size={200}
                      interval={500}
                      onPredict={(predictions) => {
                        const topPrediction = predictions.reduce(
                          (prev, current) => {
                            return prev.probability > current.probability
                              ? prev
                              : current;
                          }
                        );

                        setPrediction(topPrediction);
                      }}
                      model_url="https://teachablemachine.withgoogle.com/models/kvITyDm5l/"
                    />
                  </div>
                  {prediction && (
                    <div>
                      <p>Top prediction: {prediction.className}</p>
                      <p>Probability: {prediction.probability * 100}</p>
                      <button className="btn btn-wide" onClick={addToRecipe}>
                        Add it to item
                      </button>
                    </div>
                  )}
                </div>
                <label className="modal-backdrop" htmlFor="my_modal_7">
                  Close
                </label>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Recipe name
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((menuItem, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {menuItem.recipeName}
                      </th>
                      <td className="px-6 py-4">
                        <form onSubmit={(e) => handleSubmit(e, index)}>
                          <label htmlFor={`price-${index}`} className="sr-only">
                            Enter the price for {menuItem.recipeName}
                          </label>
                          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                            <p
                              type="button"
                              className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                            >
                              {/* Add an icon here if needed */}
                            </p>
                            <Textarea
                              id={`price-${index}`}
                              type="number"
                              min="0"
                              step="1"
                              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-customRed focus:border-customRed dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-customRed dark:focus:border-customRed"
                              placeholder={`Enter the price for ${menuItem.recipeName}...`}
                              value={menuItem.price}
                              onChange={(e) => handlePriceChange(e, index)}
                            />
                            <button
                              type="submit"
                              className="inline-flex justify-center p-2 text-customRed rounded-full cursor-pointer hover:bg-blue-100 dark:text-customRed dark:hover:bg-gray-600"
                            >
                              <svg
                                className="w-5 h-5 rotate-90"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 18 20"
                              >
                                {/* Add your submit button icon here */}
                              </svg>
                            </button>
                          </div>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <>
            {/* component */}

            <div className="md:w-3/5 w-full px-4 md:px-10 flex flex-col gap-2 p-5 bg-white text-gray-800 shadow-md">
              <h1 className="py-5 text-lg">Reviews</h1>

              <div className="px-8 text-center">
                <Typography variant="h6" className="mt-4">
                  {details.name}
                </Typography>
                <Typography color="gray" className="mb-4 font-normal">
                  {details.stall_type}
                </Typography>
                {/* Display the calculated average rating */}
                <div className="flex items-center justify-center">
                  {/* Render the appropriate number of filled stars */}
                  {Array.from({ length: Math.floor(scaledAverageRating) }).map(
                    (_, index) => (
                      <svg
                        key={index}
                        className="w-4 h-4 text-yellow-300 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    )
                  )}

                  {/* Render the appropriate number of empty stars */}
                  {Array.from({
                    length: 5 - Math.floor(scaledAverageRating),
                  }).map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-gray-300 mr-1 dark:text-gray-500"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}

                  {/* Display the calculated scaled average rating */}
                  <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {scaledAverageRating.toFixed(2)} out of 5
                  </p>
                </div>
              </div>
              {/* Item Container */}
              <div className="flex flex-col gap-3 mt-14">
                {/* Review Item 1 */}
                {details.reviews ? (
                  details.reviews.map((review, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 bg-gray-100 p-4 rounded-md"
                    >
                      {/* Reviewer Info */}
                      <div className="flex justify-between">
                        <div className="flex gap-2">
                          <div className="w-7 h-7 text-center rounded-full bg-red-500">
                            {review.reviewer_name[0]}
                          </div>
                          <span>{review.reviewer_name}</span>
                        </div>
                        <div className="flex p-1 gap-1 text-orange-500">
                          {/* Display stars based on the rating */}
                          {Array.from({ length: review.rating }, (_, i) => (
                            <ion-icon key={i} name="star" />
                          ))}
                        </div>
                      </div>
                      <div>{review.review_text}</div>
                      <div className="flex justify-between">
                        <span>
                          {new Date(review.date).toLocaleDateString()}
                        </span>
                        {/* Display star rating as a visual element */}
                        <div className="-ml-1 flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              className={`h-5 w-5 ${
                                star <= review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Reviews not available</p>
                )}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default Profile;
