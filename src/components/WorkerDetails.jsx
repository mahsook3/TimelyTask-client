import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const WorkerDetails = () => {
  const location = useLocation();
  const worker = location.state ? location.state.worker : null;

  useEffect(() => {
    // Access worker data and perform any necessary operations
    if (worker) {
      console.log("Worker details:", worker);
    }
  }, [worker]);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-4">Worker Details</h1>
      {worker ? (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-4"><span className="font-bold">Name:</span> {worker.Name}</p>
          <p className="mb-4"><span className="font-bold">Email:</span> {worker.email}</p>
          <p className="mb-4"><span className="font-bold">Phone:</span> {worker.phone}</p>
          <p className="mb-4"><span className="font-bold">Work Category:</span> {worker.workcategory}</p>
          <p className="mb-4"><span className="font-bold">Work Description:</span> {worker.workdescription}</p>
          <p className="mb-4"><span className="font-bold">Payment Amount:</span> {worker.paymentamount}</p>
          <p className="mb-4"><span className="font-bold">Location:</span> {worker.location}</p>
          <p className="mb-4"><span className="font-bold">Latitude:</span> {worker.latitude}</p>
          <p className="mb-4"><span className="font-bold">Longitude:</span> {worker.longitude}</p>
          <p className="mb-4"><span className="font-bold">History of Works Given:</span> {worker.Historyworksgiven}</p>
          <p className="mb-4"><span className="font-bold">History of Work Done:</span> {worker.historyworkdone}</p>
          <p className="mb-4"><span className="font-bold">Date:</span> {new Date(worker.date).toLocaleString()}</p>
        </div>
      ) : (
        <p className="text-gray-600">No worker data available</p>
      )}
    </div>
  );
};

export default WorkerDetails;
