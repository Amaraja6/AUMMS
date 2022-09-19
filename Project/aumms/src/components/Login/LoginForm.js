import React, { useState } from "react";
import "./LoginForm.css"; //importing css file
import axios from "axios";
import validator from "validator";
import { useNavigate } from "react-router-dom";

// import { Route } from "react-router-dom";
// import SearchBar from "../Search/SearchBar";
//import { Link } from "react-router-dom";

function LoginForm({ setAuthorized }) {
  const [Email, changeEmail] = useState("");
  const [Password, changePassword] = useState("");

  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    const User = {
      Email: Email,
      Password: Password,
    };

    let valid = [
      validator.isEmail(User.Email),
      validator.isStrongPassword(User.Password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    ];

    if (valid.indexOf(false) !== -1) {
      let res = document.getElementById("response");
      res.innerText = "Invalid user";
      res.style.color = "red";
      return;
    }

    axios.post("http://localhost:4000/app/login", User).then((response) => {
      let res = document.getElementById("response");
      if (response.data["status"] === -1) {
        res.innerText = response.data["error"];
        res.style.color = "red";
        setAuthorized({
          authorized: false,
          initializing: false,
        });
      } else if (response.data["status"] === 0) {
        res.innerText = response.data["message"];
        res.style.color = "grey";
        setAuthorized({
          authorized: false,
          initializing: false,
        });
      } else {
        res.innerText = response.data["message"];
        res.style.color = "green";
        localStorage.setItem("UserToken", response.data["token"]);
        setAuthorized({
          authorized: true,
          initializing: false,
        });
        navigate("/search");
      }
    });
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        onSubmit={(event) => {
          onSubmit(event);
        }}
      >
        <input
          type="text"
          name="email"
          className="login"
          value={Email}
          onChange={(event) => {
            changeEmail(event.target.value);
          }}
          placeholder="Enter your Email"
        />

        <input
          type="password"
          name="password"
          className="login"
          value={Password}
          onChange={(event) => {
            changePassword(event.target.value);
          }}
          placeholder="Enter your Password"
        />
        <input
          type="submit"
          value="submit"
          className="btn btn-primary btn-block"
        />
        <div style={{ textAlign: "center" }} id="response"></div>
        {/* <div className="button">Login</div> */}
      </form>
    </div>
  );
}
export default LoginForm;
