import React, { useState } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validator from "validator";
const sleep = (ms) => {
  return new Promise(function (resolve, reject) {
    setTimeout(alert("Redirecting to login page in 5 secs"), ms);
  });
};
function RegisterForm() {
  let [FirstName, changeFirstName] = useState("");
  let [LastName, changeLastName] = useState("");
  let [Email, changeEmail] = useState("");
  let [Password, changePassword] = useState("");
  let [RePassword, changeRePassword] = useState("");
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    const NewUser = {
      FirstName: FirstName,
      LastName: LastName,
      Email: Email,
      Password: Password,
      RetypePassword: RePassword,
    };

    let valid = [
      validator.isEmail(NewUser.Email),
      validator.isLength(NewUser.FirstName, { min: 2, max: 50 }),
      validator.isLength(NewUser.LastName, { min: 2, max: 50 }),
      validator.isStrongPassword(NewUser.Password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
      validator.equals(NewUser.Password, NewUser.RetypePassword),
    ];
    console.log(valid.indexOf(false));
    if (valid.indexOf(false) !== -1) {
      let res = document.getElementById("response");
      res.innerText = "Error, failed to register user!";
      res.style.color = "red";
      return;
    }

    axios.post("http://localhost:4000/app/signup", NewUser).then((response) => {
      let res = document.getElementById("response");

      if (response.data["status"] === -1) {
        res.innerText = response.data["error"];
        res.style.color = "red";
      } else if (response.data["status"] === 0) {
        res.innerText = response.data["message"];
        res.style.color = "grey";
      } else {
        res.innerText = response.data["message"];
        res.style.color = "green";
        sleep(5000).then(navigate("/login"));
      }
    });
  }

  return (
    <div className="container">
      <div className="row col-12   ">
        <h2 className="text-center">Sign Up</h2>
        <form
          onSubmit={(event) => onSubmit(event)}
          className=" form-goup col-md-12 "
        >
          <label>First Name:</label>
          <input
            type="text"
            onChange={(event) => {
              changeFirstName(event.target.value);
            }}
            value={FirstName}
            placeholder="First Name"
            className="form-control "
          />
          <label>Last Name:</label>
          <input
            type="text"
            onChange={(event) => {
              changeLastName(event.target.value);
            }}
            value={LastName}
            placeholder="Last Name"
            className="form-control "
          />
          <label>Email:</label>
          <input
            type="text"
            onChange={(event) => {
              changeEmail(event.target.value);
            }}
            value={Email}
            placeholder="Email"
            className="form-control"
          />
          <label>Password:</label>
          <input
            type="password"
            onChange={(event) => {
              changePassword(event.target.value);
            }}
            value={Password}
            placeholder="Password"
            className="form-control"
          />
          <label>Re type Password:</label>
          <input
            type="password"
            onChange={(event) => {
              changeRePassword(event.target.value);
            }}
            value={RePassword}
            placeholder="Retype Password"
            className="form-control"
          />
          <br></br>
          <div className="col-md-12 text-center">
            <input
              type="submit"
              value="submit"
              className="btn btn-primary btn-block"
            />
          </div>

          <div style={{ textAlign: "center" }} id="response"></div>
        </form>
      </div>
    </div>
  );
}
export default RegisterForm;
