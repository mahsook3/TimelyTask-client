import React, { useRef, useState } from "react";
import { ImageModel } from "react-teachable-machine";
import { Textarea } from "@material-tailwind/react";
import Webcam from "react-webcam";

export default function App() {
  const [prediction, setPrediction] = React.useState(null);
  const [recipesearch, setRecipeSearch] = React.useState("");
  const videoRef = useRef(null);
  const startCamera = () => {
    if (videoRef.current) {
      setLoading(true);
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" }, // Use the back camera
        })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setLoading(false);
        })
        .catch((error) => {
          handleCameraError(error);
          setLoading(false);
        });
    }
  };

  const addToRecipe = () => {
    if (prediction) {
      setRecipeSearch((prevRecipe) => {
        return prevRecipe
          ? `${prevRecipe}, ${prediction.className}`
          : prediction.className;
      });
    }
  };

  const handlePredictions = (predictions) => {
    const topPrediction = predictions.reduce((prev, current) => {
      return prev.probability > current.probability ? prev : current;
    });

    setPrediction(topPrediction);
  };

  const handleCameraError = (error) => {
    console.error("Error accessing camera:", error);
  };
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    if (videoRef.current) {
      setLoading(true);
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: "environment" },
        })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          setLoading(false);
        })
        .catch((error) => {
          handleCameraError(error);
          setLoading(false);
        });
    }
  }, []);

  return (
    <>
      <Textarea
        color="blue"
        className="form_input"
        name="recipe"
        placeholder="Enter the recipes"
        type="text"
        value={recipesearch}
      />
      <label htmlFor="my_modal_7" className="btn" onClick={startCamera}>
        open modal
      </label>

      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <div
            className="container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Webcam
              audio={false}
              ref={videoRef}
              screenshotFormat="image/jpeg"
              videoConstraints={{
                facingMode: "environment",
              }}
            />{" "}
          </div>
          <div className="visibility: hidden">
            
            <ImageModel
              preview={false}
              size={200}
              interval={500}
              onPredict={handlePredictions}
              model_url="https://teachablemachine.withgoogle.com/models/kvITyDm5l/"
            />
          </div>
          {loading ? (
            <p>Loading, please wait...</p>
          ) : prediction ? (
            <div>
              <p>Top prediction: {prediction.className}</p>
              <p>Probability: {prediction.probability * 100}</p>
              <button className="btn btn-wide" onClick={addToRecipe}>
                Add it to item
              </button>
            </div>
          ) : null}
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </>
  );
}
