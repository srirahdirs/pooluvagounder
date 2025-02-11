import React from "react";
import ReactDOM from "react-dom/client";  // Correct import for React 18
import './assets/css/index.css';
import App from './App';

// Create a root for the App component
const appRoot = ReactDOM.createRoot(document.getElementById("root"));
appRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


