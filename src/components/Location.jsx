import { toast } from "react-toastify";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
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
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import stallIcon from "../assets/icons/stall.png";
import yourLocationIcon from "../assets/icons/you.png";
import "./Location.css";
import defaultLogo from "../assets/logo/NearTreat.png";

//payment
import { loadScript } from "./services/PaymentService";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
const Location = ({ seller }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(2);
  const handleClick = () => {
    if (!isLoading) {
      setIsLoading(true);

      // Simulate an API request or other actions
      setTimeout(() => {
        setIsLoading(false);
      }, 3700);
    }
  };
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([]);
  const [sellerData, setSellerData] = useState(null); // State to hold fetched seller data
  const [selectedRating, setSelectedRating] = useState(0);
  const location = useLocation();
  const details = location.state;
  const [quantities, setQuantities] = useState({});
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("https://neartreat-p34i.onrender.com/seller")
      .then((response) => response.json())
      .then((data) => setSellerData(data[0]))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const response = await axios.get(
          "https://neartreat-p34i.onrender.com/seller"
        );
        const sellerDataFromApi = response.data;
        setSellerData(sellerDataFromApi);
        setReviews(sellerDataFromApi?.reviews || []); // Set reviews array, default to empty array
      } catch (error) {
        console.error("Error fetching seller data:", error);
      }
    };

    fetchSellerData();
  }, []);

  const data = [
    {
      label: "Location",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: `Find Location of your Favourite Street food vendors`,
    },
    {
      label: "Review",
      value: "profile",
      icon: UserCircleIcon,
      desc: `abcd.`,
    },
  ];
  const mapRef = useRef(null);
  const routingControlRef = useRef(null);
  const polylineRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [sellerLocation, setSellerLocation] = useState([11.0168, 76.9558]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const [image, setImage] = useState(null);
  const [upiId, setUpiId] = useState(null);
  const [email, setEmail] = useState("");
  const [stall, setStall] = useState("stall");
  const [ph, setPh] = useState("");
  const [feedback, setFeedback] = useState([]);
  const [reviewsData, setReviewsData] = useState([]);
  const [id, setid] = useState("");
  const [price, setprice] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation([latitude, longitude]);
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    if (localStorage.getItem("location") !== null) {
      const storedSeller = JSON.parse(localStorage.getItem("location"));
      setSellerLocation([storedSeller.latitude, storedSeller.longitude]);
      setName(storedSeller.name);
      setImage(storedSeller.image);
      setUpiId(storedSeller.upi_id);
      setEmail(storedSeller.email);
      setPh(storedSeller.mobile_number);
      setAddress(storedSeller.current_location);
      setStall(storedSeller.stall_type);
      setFeedback(storedSeller.reviews);
      setid(storedSeller._id);
      setprice(storedSeller.prices);
    }

    getLocation();
  }, []);

  const updateQuantity = (menuItem, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [menuItem]: newQuantity,
    }));
  };

  const addToCart = (menuItem, quantity) => {
    const cartItem = {
      name: menuItem,
      price: price[menuItem],
      quantity,
    };
    setCart((prevCart) => [...prevCart, cartItem]);
    // Optional: Reset the quantity to 1 after adding to the cart
    updateQuantity(menuItem, 1);
  };

  useEffect(() => {
    const leafletMap = mapRef.current;

    if (leafletMap && currentLocation && sellerLocation) {
      leafletMap.setView(currentLocation, 13);
    }
  }, [currentLocation, sellerLocation]);

  useEffect(() => {
    const calculateRoute = async () => {
      if (currentLocation && sellerLocation) {
        const leafletMap = mapRef.current;

        if (leafletMap) {
          // Remove previous routing control instance and polyline layer
          if (routingControlRef.current) {
            routingControlRef.current.remove();
          }
          if (polylineRef.current) {
            polylineRef.current.removeFrom(leafletMap);
          }

          // Delay route calculation
          await new Promise((resolve) => setTimeout(resolve, 0));

          // Create a new routing control instance
          const routingControl = L.Routing.control({
            waypoints: [
              L.latLng(currentLocation[0], currentLocation[1]),
              L.latLng(sellerLocation[0], sellerLocation[1]),
            ],
            lineOptions: {
              styles: [{ color: "#00f", opacity: 0.7, weight: 5 }],
            },
            router: new L.Routing.osrmv1({
              serviceUrl: "https://router.project-osrm.org/route/v1",
            }),
            routeWhileDragging: true,
          });

          routingControlRef.current = routingControl;

          routingControl.on("routesfound", (e) => {
            const routes = e.routes;
            const route = routes[0];
            const coordinates = route.coordinates.map((coord) => [
              coord.lat,
              coord.lng,
            ]);
            setRouteCoordinates(coordinates);

            // Create new polyline layer
            const polyline = L.polyline(coordinates, {
              color: "#00f",
              opacity: 0.7,
              weight: 5,
            });
            polylineRef.current = polyline;
            polyline.addTo(leafletMap);
          });

          routingControl.addTo(leafletMap);
          routingControl.route();
        }
      }
    };

    calculateRoute();
  }, [currentLocation, sellerLocation]);

  useEffect(() => {
    if (localStorage.getItem("routeCoordinates") !== null) {
      const storedRoute = JSON.parse(localStorage.getItem("routeCoordinates"));
      setRouteCoordinates(storedRoute);
    }
  }, []);

  useEffect(() => {
    if (routeCoordinates.length > 0) {
      localStorage.setItem(
        "routeCoordinates",
        JSON.stringify(routeCoordinates)
      );
    }
  }, [routeCoordinates]);

  useEffect(() => {
    const allCoordinates = localStorage.getItem("allCoordinates");
    if (allCoordinates) {
      const parsedCoordinates = JSON.parse(allCoordinates);
      const waypoints = [
        L.latLng(currentLocation[0], currentLocation[1]),
        ...parsedCoordinates.map((coord) => L.latLng(coord[0], coord[1])),
        L.latLng(sellerLocation[0], sellerLocation[1]),
      ];

      const routingControl = routingControlRef.current;

      if (routingControl) {
        routingControl.setWaypoints(waypoints);
        routingControl.route();
      }
    }
  }, [currentLocation, sellerLocation]);

  useEffect(() => {
    if (seller) {
      setSellerLocation([seller.latitude, seller.longitude]);
      setName(seller.name);
    }
  }, [seller]);

  useEffect(() => {
    // Reset route coordinates when seller changes
    setRouteCoordinates([]);
  }, [seller]);

  //for payment
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      await loadScript(); // Load the Razorpay script dynamically

      const options = {
        key: "rzp_test_Ks5BQOSKmaPnh2", // Replace with your Razorpay API key
        amount: (cart.reduce((total, item) => total + item.price * item.quantity, 0))*100, // Amount in paise (e.g., 100 paise = ₹1)
        currency: "INR",
        name: "NearTreat",
        description: "Payment for food",
        image: "../assets/logo/logo.png",
        handler: (response) => {
          // Handle the response from Razorpay
          if (response.razorpay_payment_id) {
            // Payment successful, redirect to thank you page
            // You can customize the redirect or handle success as per your requirements
            window.location.href = "/payment/success";
          } else {
            window.location.href = "/payment/fail";
          }
        },
        prefill: {
          email: email,
          contact: ph,
          upi_id: upiId, // Replace with the seller's UPI ID
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      setLoading(false);
    } catch (error) {
      console.log("Error loading Razorpay script:", error);
      setLoading(false);
    }
  };

  function handleGoBack() {
    navigate("/profile/buyer");
  }

  function calculateAverageRating(reviews) {
    if (!reviews || reviews.length === 0) {
      return 0;
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    // console.log("Total Rating:", totalRating); // Log the total rating
    const averageRating = totalRating / reviews.length;
    // console.log("Average Rating:", averageRating); // Log the calculated average rating
    const scaledAverageRating = (averageRating / 5) * 4 + 1;
    // console.log("scaledAverageRating:", scaledAverageRating); // Log the calculated average rating

    return scaledAverageRating;
  }
  const scaledAverageRating = calculateAverageRating(feedback || []);
  // console.log(scaledAverageRating);
  // For example, add logs like these to track the state and data changes
  // console.log("feedback:", feedback);

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmitReview = async () => {
    try {
      const reviewData = {
        reviewer_name: details.name,
        review_text: reviewText,
        rating: selectedRating,
      };

      const response = await axios.post(
        `https://neartreat-p34i.onrender.com/seller/${id}/reviews`,
        reviewData
      );

      // Assuming the response indicates a successful review submission
      // You can handle success and possibly update the reviews state accordingly
      // console.log("Review submitted:", response.data);

      // Clear the review form
      setSelectedRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review:", error);
      // Handle the error scenario if needed
    }
  };
  function handleDelete() {
    localStorage.removeItem("user");
    setName("");
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

  console.log(price);

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
                <img src={defaultLogo} alt={name} />
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
      <div className="max-w-xs flex justify-center mx-auto mb-5">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2">
            <img
              className="w-32 h-32 rounded-full mx-auto"
              src={image || defaultLogo}
              alt={name || "Seller"}
            />
          </div>
          <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
              {name || "Seller Name"}
            </h3>
            <div className="text-center text-gray-400 text-xs font-semibold">
              <p>{stall}</p>
            </div>
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Address
                  </td>
                  <td className="px-2 py-2">
                    {address || "No address available"}
                  </td>
                </tr>

                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Phone
                  </td>
                  <td className="px-2 py-2">
                    {ph || "No phone number available"}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Email
                  </td>
                  <td className="px-2 py-2">{email || "No email available"}</td>
                </tr>
              </tbody>
            </table>
            
          </div>
        </div>
      </div>

      <Tabs value="dashboard">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value }) => (
            <TabPanel key={value} value={value}>
              {value === "dashboard" && currentLocation && (
                <MapContainer
                  ref={mapRef}
                  center={currentLocation}
                  zoom={13}
                  style={{ height: "400px", marginTop: "10px" }}
                >
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <Marker
                    position={currentLocation}
                    icon={L.icon({
                      iconUrl: yourLocationIcon,
                      iconSize: [25, 41],
                      iconAnchor: [12, 41],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41],
                      shadowUrl: "",
                    })}
                    className="custom-marker"
                  />
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${sellerLocation[0]},${sellerLocation[1]}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Marker
                      position={sellerLocation}
                      icon={L.icon({
                        iconUrl: stallIcon,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41],
                        popupAnchor: [1, -34],
                        shadowSize: [41, 41],
                        shadowUrl: "",
                      })}
                      className="custom-marker"
                    />
                  </a>
                  {routeCoordinates.length > 0 && (
                    <Polyline
                      positions={routeCoordinates}
                      color="#00f"
                      opacity={0.7}
                      weight={5}
                    />
                  )}{" "}
                </MapContainer>
              )}
              {value === "profile" && (
                <div className="flex flex-col p-8 shadow-sm rounded-xl bg-gray-100 text-gray-100  ">
                  <div className="flex flex-col items-center w-full text-black rounded-lg">
                    <h2 className="text-3xl font-semibold text-center">
                      Your opinion matters!
                    </h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                      <span className="text-center">
                        How was your experience?
                      </span>
                      <div className="rating">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <input
                            key={rating}
                            type="radio"
                            name="rating"
                            className={`mask mask-star-2 bg-orange-400 ${
                              selectedRating === rating ? "checked" : ""
                            }`}
                            onClick={() => handleRatingChange(rating)}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col w-full">
                      <textarea
                        rows="3"
                        placeholder="Message..."
                        value={reviewText}
                        onChange={handleReviewTextChange}
                        className="p-4 rounded-md resize-none dark:text-gray-100 dark:bg-gray-900 shadow-md"
                      />
                      <button
                        type="button"
                        onClick={handleSubmitReview}
                        className="py-4 my-8 font-semibold rounded-md dark:text-gray-900 dark:bg-violet-400"
                      >
                        Leave feedback
                      </button>
                    </div>
                  </div>
                  <div className="md:w-full px-4 md:px-10 flex flex-col gap-2 p-5 bg-white text-gray-800 shadow-md rounded-lg">
                    <h1 className="py-5 text-lg">Customers Reviews</h1>
                    <div className="px-8 text-center">
                      <Typography variant="h6" className="mt-4">
                        {sellerData?.name}
                      </Typography>
                      <Typography color="gray" className="mb-4 font-normal">
                        {sellerData?.stall_type}
                      </Typography>
                      {/* Display the calculated average rating */}
                      <div className="flex items-center justify-center">
                        {/* Render the appropriate number of filled stars */}
                        {Array.from({
                          length: Math.floor(scaledAverageRating),
                        }).map((_, index) => (
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
                        ))}

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

                    <div className="flex flex-col gap-3 mt-14 ">
                      {/* Review Items */}
                      {(feedback ?? []).length > 0 ? (
                        feedback.map((review, index) => (
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
                                {Array.from(
                                  { length: review.rating },
                                  (_, i) => (
                                    <ion-icon key={i} name="star" />
                                  )
                                )}
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
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1-1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1.523 1.523 0 0 0-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
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
                </div>
              )}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
      <>
        <h1 className="mt-4 text-center text-2xl leading-normal">
          Get detailed information about the menus offered by{" "}
          <span className="bg-customYellow whitespace-nowrap rounded-md px-2 py-1 text-customRed">
            {" "}
            {name}'s {stall}
          </span>
        </h1>
        <div className="h-screen pt-10">
          <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
            <div className="rounded-lg md:w-2/3">
              {price ? (
                <div>
                  {/* Repeat this div for each card */}
                  {Object.entries(price).map(([menuItem, itemPrice]) => (
                    <div
                      key={menuItem}
                      className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                    >
                      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <div className="mt-5 sm:mt-0">
                          <div className="flex items-center">
                            <span className="relative rounded-xl bg-customRed p-4">
                              <svg
                                width={40}
                                fill="currentColor"
                                height={40}
                                className="absolute top-1/2 left-1/2 h-4 -translate-x-1/2 -translate-y-1/2 transform text-customYellow"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M18 11v7a2 2 0 0 1-4 0v-5h-2V3a3 3 0 0 1 3-3h3v11zM4 10a2 2 0 0 1-2-2V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v4h1V1a1 1 0 0 1 2 0v7a2 2 0 0 1-2 2v8a2 2 0 0 1-4 0v-8z" />
                              </svg>
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-gray-900">
                            {menuItem}
                          </h2>
                          <div className="flex items-center text-sm text-green-500">
                            <svg
                              width={20}
                              height={20}
                              fill="currentColor"
                              viewBox="0 0 320 512"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z" />
                            </svg>
                            <span>{itemPrice}</span>
                            <span className="ml-2 text-gray-400">
                              {" "}
                              per {menuItem}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          <div className="flex items-center border-gray-100">
                            <span
                              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-customYellow hover:text-blue-50"
                              onClick={() => {
                                // Decrease quantity but not below 1
                                const newQuantity = Math.max(
                                  1,
                                  (quantities[menuItem] || 1) - 1
                                );
                                updateQuantity(menuItem, newQuantity);
                              }}
                            >
                              -
                            </span>
                            <input
                              className="h-8 w-8 border bg-white text-center text-xs outline-none"
                              type="number"
                              value={quantities[menuItem] || 1}
                              onChange={(e) => {
                                // Ensure the quantity is at least 1
                                const newQuantity = Math.max(
                                  1,
                                  parseInt(e.target.value, 10) || 0
                                );
                                updateQuantity(menuItem, newQuantity);
                              }}
                            />
                            <span
                              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-customYellow hover:text-blue-50"
                              onClick={() => {
                                // Increase quantity
                                const newQuantity =
                                  (quantities[menuItem] || 1) + 1;
                                updateQuantity(menuItem, newQuantity);
                              }}
                            >
                              +
                            </span>
                            
                          </div>
                          <div className="flex items-center space-x-4">
                            <button
                              className={`bg-customRed hover:bg-customYellow text-white font-semibold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-purple-300 ${
                                isLoading ? "animate-pulse" : ""
                              }`}
                              onClick={() => addToCart(menuItem, quantities[menuItem] || 1)}
                            >
                              {isLoading ? "Adding..." : "Add to Cart"}
                            </button>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  ))}
                        
      
                </div>
              ) : (
                <h2 className="mt-4 text-center text-2xl leading-normal no text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400  rounded-lg pt-4 pb-4">
                  {name} has not updated any details😢.
                </h2>
              )}
            </div>
            {/* Subtotal */}
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <div className="flex justify-between">
              <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" class="px-6 py-3 rounded-l-lg">
                Product name
              </th>
              <th scope="col" class="px-6 py-3">
                Qty
              </th>
              <th scope="col" class="px-6 py-3 rounded-r-lg">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} class="bg-white dark:bg-gray-800">
                <td
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </td>
                <td class="px-6 py-4">{item.quantity}</td>
                <td class="px-6 py-4">    <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        width="12"
        height="12"
        fill="currentColor"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z" />
      </svg>
      <span style={{ marginLeft: '5px' }}>
      {item.price * item.quantity}
      </span>
    </div></td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr class="font-semibold text-gray-900 dark:text-white">
              <th scope="row" class="px-6 py-3 text-base">Total</th>
              <td class="px-6 py-3">{cart.reduce((total, item) => total + item.quantity, 0)}</td>
              <td class="px-6 py-3">
              <div style={{ display: 'flex', alignItems: 'center' }}>
      <svg
        width="12"
        height="12"
        fill="currentColor"
        viewBox="0 0 320 512"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.0022 64C.0022 46.33 14.33 32 32 32H288C305.7 32 320 46.33 320 64C320 81.67 305.7 96 288 96H231.8C241.4 110.4 248.5 126.6 252.4 144H288C305.7 144 320 158.3 320 176C320 193.7 305.7 208 288 208H252.4C239.2 266.3 190.5 311.2 130.3 318.9L274.6 421.1C288.1 432.2 292.3 452.2 282 466.6C271.8 480.1 251.8 484.3 237.4 474L13.4 314C2.083 305.1-2.716 291.5 1.529 278.2C5.774 264.1 18.09 256 32 256H112C144.8 256 173 236.3 185.3 208H32C14.33 208 .0022 193.7 .0022 176C.0022 158.3 14.33 144 32 144H185.3C173 115.7 144.8 96 112 96H32C14.33 96 .0022 81.67 .0022 64V64z" />
      </svg>
      <span style={{ marginLeft: '5px' }}>
      {cart.reduce((total, item) => total + item.price * item.quantity, 0)}
      </span>
    </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
              </div>
              <hr className="my-1" />
              <div className="flex justify-between">
              <button className="mt-6 w-full rounded-md bg-customRed py-1.5 font-medium text-blue-50 hover:bg-customYellow" onClick={handlePayment}>
            Pay now
          </button>
              </div>
            </div>
          </div>
        </div>
      </>
      
    </>
  );
};

export default Location;
