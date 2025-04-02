from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib  # For loading the ML model
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the ML model
MODEL_PATH = os.path.join('dataset', 'model.pkl')
model = joblib.load(MODEL_PATH)

# Load the datasets
DRIVERS_PATH = os.path.join('dataset', 'drivers.csv')  # Replace with actual path
CONSTRUCTORS_PATH = os.path.join('dataset', 'constructors.csv')  # Replace with actual path
CIRCUITS_PATH = os.path.join('dataset', 'circuits.csv')  # Replace with actual path

drivers_df = pd.read_csv(DRIVERS_PATH)
constructors_df = pd.read_csv(CONSTRUCTORS_PATH)
circuits_df = pd.read_csv(CIRCUITS_PATH)

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the F1 Lap Predictor API!"})

# Endpoint to fetch Driver Names and IDs
@app.route('/drivers', methods=['GET'])
def get_drivers():
    drivers = drivers_df[['driverId', 'driverRef']].to_dict(orient='records')
    return jsonify(drivers)

# Endpoint to fetch Constructor Names and IDs
@app.route('/constructors', methods=['GET'])
def get_constructors():
    constructors = constructors_df[['constructorId', 'constructorRef']].to_dict(orient='records')
    return jsonify(constructors)

# Endpoint to fetch Circuit Names and IDs
@app.route('/circuits', methods=['GET'])
def get_circuits():
    circuits = circuits_df[['circuitId', 'circuitRef']].to_dict(orient='records')
    return jsonify(circuits)

import logging
logging.basicConfig(level=logging.INFO)

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Parse the input from the frontend
        data = request.get_json()
        driverID = data.get("driverID")
        constructorID = data.get("constructorID")
        circuitID = data.get("circuitID")

        # Log the inputs
        logging.info(f"Inputs: driverID={driverID}, constructorID={constructorID}, circuitID={circuitID}")

        # Fixed variables
        lap = 25
        lap_progression = 25 / 60
        prev_lap_time = 92000
        rolling_avg_lap_time = 93000
        constructor_avg_lap_time = 92500
        pit_stop_delay = 0

        # Combine the user-provided and fixed variables into a feature set
        full_features = [
            driverID, constructorID, circuitID,
            lap, lap_progression, prev_lap_time,
            rolling_avg_lap_time, constructor_avg_lap_time, pit_stop_delay
        ]

        # Log the full features
        logging.info(f"Full features: {full_features}")

        # Make a prediction using the loaded model
        prediction = model.predict([full_features])[0]  # Get the first prediction

        # Log the prediction
        logging.info(f"Prediction: {prediction}")

        logging.info(f"Received driverID: {driverID}, constructorID: {constructorID}, circuitID: {circuitID}")
        logging.info(f"Full features: {full_features}")

        # Format the output (convert milliseconds to mins:seconds:ms)
        mins = prediction // 60000
        seconds = (prediction % 60000) // 1000
        milliseconds = prediction % 1000
        formatted_time = f"{int(mins)}:{int(seconds):02}:{int(milliseconds):03}"

        # Return the formatted prediction
        return jsonify({"prediction": formatted_time})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)