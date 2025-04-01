import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />{" "}
    <ToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      pauseOnFocusLoss={false}
      closeOnClick
      rtl={false}
      draggable
      pauseOnHover
      theme="dark"
    />
  </>
);
