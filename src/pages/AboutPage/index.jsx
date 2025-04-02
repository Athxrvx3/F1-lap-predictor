import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import divider from "./divider.svg"; // Import divider.svg
import image8 from "./image-8.png"; // Import image-8.png
import "./style.css"; // Import CSS

const AboutPage = () => {
  const navigate = useNavigate(); // Initialize navigation

  const handleNavigateToLanding = () => {
    navigate("/"); // Navigate back to LandingPage
  };

  return (
    <div className="about">
      <div className="div">
        <div className="navigation-footer">
          <p className="BY-PARAG-GUPTA">
            BY: PARAG GUPTA (230957144)
            <br />
            ATHARVA MISHRA (230957134)
          </p>
          <img className="divider" alt="Divider" src={divider} />
        </div>

        <div className="form">
          <div className="input">
            <div className="text-wrapper">First name</div>
            <div className="field">
              <div className="label">Jane</div>
            </div>
          </div>

          <div className="input-2">
            <div className="text-wrapper">Last name</div>
            <div className="field">
              <div className="label">Smitherton</div>
            </div>
          </div>

          <div className="input-3">
            <label className="text-wrapper" htmlFor="input-1">
              Email address
            </label>
            <input
              className="label-wrapper"
              id="input-1"
              placeholder="email@janesfakedomain.net"
              type="email"
            />
          </div>

          <div className="input-4">
            <div className="text-wrapper">Your message</div>
            <input
              className="label-wrapper"
              placeholder="Enter your question or message"
              type="text"
            />
          </div>

          <button className="button">
            <div className="text-wrapper-2">Submit</div>
          </button>
        </div>

        <div className="heading">
          <div className="text-wrapper-3">Contact me</div>
        </div>

        {/* Image-8 button to navigate back to LandingPage */}
        <img 
            className="image-8-button"
            alt="Navigate to Landing Page"
            src={image8}
            onClick={handleNavigateToLanding}
            style={{ cursor: "pointer" }}
        />

        <p className="p">
          DATASET USED: Formula 1 World Championship (1950 - 2024)
        </p>

        <div className="text-wrapper-4">
          (LINK:
          https://www.kaggle.com/datasets/rohanrao/formula-1-world-championship-1950-2020)
        </div>

        <p className="text-wrapper-5">
          THIS ML MODEL PREDICTS LAP-TIME BASED ON THE DATASET ABOVE
        </p>
      </div>
    </div>
  );
};

export default AboutPage; // Ensure the component is exported as default