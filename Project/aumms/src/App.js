import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProtectedRoute from "./components/PrivateRoute/ProtectedRoute";
/*browser router is a std library for routing in react---enables 
navigation between views of different components,browser url changes.*/
import Navbar from "./components/Navbar/Navbar"; //importing the different components into App.js file
import Home from "./components/PAGES/Home";
import NotFound from "./components/NotFound/NotFound";
import LoginForm from "./components/Login/LoginForm";
import RegisterForm from "./components/SignUp/RegisterForm";
import SearchBar from "./components/Search/SearchBar";
import Logout from "./components/Logout/Logout";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const [authorized, setAuthorized] = useState({
    authorized: false,
    initializing: true,
  });
  useEffect(() => {
    const JWTToken = localStorage.getItem("UserToken");
    axios
      .get("http://localhost:4000/app/authorize", {
        headers: {
          "x-access-token": JWTToken,
        },
      })
      .then((response) => {
        setAuthorized({
          authorized: response.data["status"] === 1,
          initializing: false,
        });
      })
      .catch((error) => {
        setAuthorized({
          authorized: false,
          initializing: false,
        });
      });
  }, [setAuthorized]);
  if (authorized.initializing) {
    return <div>Loading</div>;
  }

  return (
    <div className="app">
      <Navbar authorized={authorized.authorized} />
      {console.log(authorized.authorized)}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<NotFound />}></Route>
        <Route
          authorized={authorized.authorized}
          setAuthorized={setAuthorized}
          element={
            <ProtectedRoute
              authorized={authorized.authorized}
              setAuthorized={setAuthorized}
            />
          }
        >
          <Route
            element={
              <LoginForm
                authorized={authorized.authorized}
                setAuthorized={setAuthorized}
              />
            }
            path="/login"
          />
          <Route
            element={
              <RegisterForm
                authorized={authorized.authorized}
                setAuthorized={setAuthorized}
              />
            }
            path="/signup"
          />
        </Route>

        <Route
          authorized={authorized.authorized}
          setAuthorized={setAuthorized}
          element={
            <PrivateRoute
              authorized={authorized.authorized}
              setAuthorized={setAuthorized}
            />
          }
        >
          <Route
            element={
              <Logout
                authorized={authorized.authorized}
                setAuthorized={setAuthorized}
              />
            }
            path="/logout"
          />
          <Route
            element={
              <SearchBar
                authorized={authorized.authorized}
                setAuthorized={setAuthorized}
              />
            }
            path="/search"
          />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
/*Switch helps to look for a path match in Route and render that particular URL,
 if Switch is not used all paths will be displayed at once.
 The exact param disables the partial matching for a route and makes sure that 
 it only returns the route if the path is an EXACT match to the current url.*/
