import React from "react";
/*React is a flexible component-based front-end JavaScript library for building user interfaces.
The Browser does not understand React, it only understands HTML, CSS, and JavaScript. 
So to convert React into valid JavaScript we use a webpack called Babel. It is used to convert JSX into objects and then return that object. */
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//package provides client-specific methods used for initializing an app on the client.
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); //createRoot()-client environment
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
//root node is the HTML element where the result is displayed
