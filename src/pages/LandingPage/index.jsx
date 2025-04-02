import React, { useState, useEffect } from "react";
import Select from "react-select"; // Import React-Select
import ButtonDanger from "./ButtonDanger"; // Import ButtonDanger component
import image5 from "./image-5.png"; // Import image-5
import f1LapSimulator from "./Image0.png"; // Import Image0
import image6 from "./image-6.png"; // Import image-6
import image7 from "./image-7.png"; // Import image-7
import "./style.css"; // Import styles
import { useNavigate } from "react-router-dom"; // For navigation to AboutPage

export const LandingPage = () => {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [constructors, setConstructors] = useState([]);
  const [circuits, setCircuits] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [selectedConstructor, setSelectedConstructor] = useState(null);
  const [selectedCircuit, setSelectedCircuit] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch dropdown data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const driversResponse = await fetch("http://127.0.0.1:5000/drivers");
        const constructorsResponse = await fetch("http://127.0.0.1:5000/constructors");
        const circuitsResponse = await fetch("http://127.0.0.1:5000/circuits");

        const driversData = await driversResponse.json();
        const constructorsData = await constructorsResponse.json();
        const circuitsData = await circuitsResponse.json();

        // Map the data to React-Select options
        setDrivers(driversData.map((driver) => ({ value: driver.driverId, label: driver.driverRef })));
        setConstructors(constructorsData.map((constructor) => ({ value: constructor.constructorId, label: constructor.constructorRef })));
        setCircuits(circuitsData.map((circuit) => ({ value: circuit.circuitId, label: circuit.circuitRef })));
      } catch (err) {
        console.error("Failed to fetch dropdown data:", err);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log("Selected Driver:", selectedDriver);
      console.log("Selected Constructor:", selectedConstructor);
      console.log("Selected Circuit:", selectedCircuit);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          driverID: selectedDriver?.value,
          constructorID: selectedConstructor?.value,
          circuitID: selectedCircuit?.value,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      console.log("Received prediction from backend:", data);
      setPrediction(data.prediction);
    } catch (err) {
      console.error("Error fetching prediction:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landing-page">
      {/* Image-5 Button on Top-Left */}
      <div className="image-5-container">
        <img
          className="image-5-button"
          alt="Reset App"
          src={image5}
          onClick={() => window.location.reload()} // Reset the app on click
        />
      </div>

      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            {/* Dropdowns Section */}
            <div className="dropdowns-container">
              <Select
                className="dropdown"
                options={drivers}
                value={selectedDriver}
                onChange={setSelectedDriver}
                placeholder="Select Driver ID"
              />
              <Select
                className="dropdown"
                options={constructors}
                value={selectedConstructor}
                onChange={setSelectedConstructor}
                placeholder="Select Constructor ID"
              />
              <Select
                className="dropdown"
                options={circuits}
                value={selectedCircuit}
                onChange={setSelectedCircuit}
                placeholder="Select Circuit ID"
              />
            </div>

            {/* Image0 Section */}
            <div className="image0-container">
              <img className="image0" alt="F1 Lap Simulator" src={f1LapSimulator} />
            </div>

            {/* Prediction Section */}
            <form onSubmit={handleSubmit}>
              <button type="submit" className="go-button">
                Go
              </button>
            </form>

            {loading && <p>Loading...</p>}
            <div className="output-screen">
              {prediction && <p className="prediction-output">{prediction}</p>}
              {error && <p className="error-output">{error}</p>}
            </div>

            {/* Additional Buttons */}
            <div className="buttons-container">
              <ButtonDanger />
              <img
                className="image-6"
                src={image6}
                onClick={() => console.log("Info button clicked")} // Add functionality here
              />
              <img
                className="image-7"
                src={image7}
                style={{
                  width: "60px",
                  height: "60px",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/about")} // Navigate to AboutPage
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};