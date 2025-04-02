import React, { useState } from "react";

const PredictionForm = () => {
  const [input, setInput] = useState({ feature1: "", feature2: "", feature3: "" });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setLoading(true); // Start loading

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          input: [parseFloat(input.feature1), parseFloat(input.feature2), parseFloat(input.feature3)],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch prediction");
      }

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div>
      <h1>F1 Lap Predictor</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="feature1"
          placeholder="Feature 1"
          value={input.feature1}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="feature2"
          placeholder="Feature 2"
          value={input.feature2}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="feature3"
          placeholder="Feature 3"
          value={input.feature3}
          onChange={handleChange}
          required
        />
        <button type="submit">Predict</button>
      </form>

      {loading && <p>Loading...</p>} {/* Show loading message */}

      {prediction && (
        <div>
          <h2>Prediction</h2>
          <p>{prediction[0]}</p>
        </div>
      )}

      {error && (
        <div>
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;