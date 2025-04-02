import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Optional, depending on your setup
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root") // This must match the `id="root"` in public/index.html
);