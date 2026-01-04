import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AdminProvider } from "./context/AdminContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AdminProvider>
  </React.StrictMode>
);
