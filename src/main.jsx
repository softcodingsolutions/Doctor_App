import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://4dd9-2401-4900-1c80-f52f-e9d1-5de1-c68d-399d.ngrok-free.app/";
axios.defaults.headers.common["ngrok-skip-browser-warning"] = true;
axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
