import React from "react";
import "./LoginForm.css"; //importing css file
//import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="login">
      <h1>Login</h1>
      <input type="text" name="email" value="" placeholder="Enter your Email" />

      <input
        type="password"
        name="password"
        value=""
        placeholder="Enter your Password"
      />
      <input type="button" value="Login" />

      {/* <div className="button">Login</div> */}
    </div>
  );
}
export default LoginForm;
