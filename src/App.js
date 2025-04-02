import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage"; // Import AboutPage (default export)
import PredictionForm from "./components/PredictionForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/predict" element={<PredictionForm />} />
      </Routes>
    </Router>
  );
};

export default App;