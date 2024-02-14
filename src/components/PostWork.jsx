import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
export default function PostWork() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve the user data from local storage and parse it to an object
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, []);

  console.log("post work " + (user ? user._id : "No user"));

  const [showOtherField, setShowOtherField] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [formData, setFormData] = useState({
    workcategory: "",
    workdescription: "",
    paymentamount: "",
    location: "",
  });

  const handleWork = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    if (name === "workcategory" && value === "Others") {
      setShowOtherField(true);
    } else if (name === "workcategory") {
      setShowOtherField(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Check if user exists
    if (!user) {
      console.log("No user");
      return;
    }
  
    // Send a PUT request to the backend
    fetch(`https://timelytask.onrender.com/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        toast.success('Work posted successfully');
        
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('An error occurred. Please try again later.');
      });
  
    // Reset form fields
    setFormData({
      workcategory: "",
      workdescription: "",
      paymentamount: "",
      location: "",
    });
  };

  return (
    <>
      <div className="navbar bg-base-100">{/* Navbar content */}</div>
      <div className="bg-gray-100 p-4">
        {/* Content for post work page */}
        <div className="mx-auto sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Column 1 */}
            <div className="bg-white p-4 shadow-md rounded-md">
              {/* Content for column 1 */}
              <div className="max-w-md mx-20">
                <h2 className="text-2xl font-bold mb-4">Enter Work Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="workcategory"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Work Category:
                    </label>
                    <select
                      id="workcategory"
                      name="workcategory"
                      value={formData.workcategory}
                      onChange={handleWork}
                      required
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="Construction Worker">
                        Construction Worker
                      </option>
                      <option value="Electrician">Electrician</option>
                      <option value="Plumber">Plumber</option>
                      <option value="Welder">Welder</option>
                      <option value="Mechanic">Mechanic</option>
                      <option value="Driver">Driver</option>
                      <option value="Mason">Mason</option>
                      <option value="Painter">Painter</option>
                      <option value="Carpenter">Carpenter</option>
                      <option value="Security Guard">Security Guard</option>
                      <option value="Others">Others</option>
                    </select>
                    {showOtherField && (
                      <>
                        <label
                          htmlFor="otherWorkCategory"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Other Work Category:
                        </label>
                        <input
                          type="text"
                          id="otherWorkCategory"
                          name="otherWorkCategory"
                          value={formData.otherWorkCategory || ""}
                          onChange={handleWork}
                          required
                          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="workdescription"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Work Description:
                    </label>
                    <input
                      type="text"
                      id="workdescription"
                      name="workdescription"
                      value={formData.workdescription}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="paymentamount"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Payment Amount:
                    </label>
                    <input
                      type="text"
                      id="paymentamount"
                      name="paymentamount"
                      value={formData.paymentamount}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Location:
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            {/* Column 2 */}
            <div className="bg-white p-4  rounded-md py-28">
              {/* Content for column 2 */}
              <div className="container mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <div className="flex items-center mr-auto mb-4 md:mb-0">
          
        <h1 className="text-2xl font-bold text-gray-800">{user ? user.workcategory : 'Loading...'}</h1>        </div>
        <div className="flex items-center space-x-2 md:flex-grow">
        <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-600">
  {user && new Date(user.date).toLocaleDateString()}
</span>
          <span className="px-2 py-1 rounded-full bg-gray-200 text-gray-600">{user ? user.paymentamount : 'Loading...'}</span>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="text-base lg:text-lg">
        {user ? user.workdescription : 'Loading...'}
        </p>
      </div>
    </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
