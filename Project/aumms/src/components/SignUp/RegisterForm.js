import React, { Component } from "react";
//import "./RegisterForm.css";

import axios from "axios";
//import center from "../PAGES/center";

class RegisterForm extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      RePassword: "",
    };

    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.changeRePassword = this.changeRePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  changeFirstName(event) {
    this.setState({
      FirstName: event.target.value,
    });
  }
  changeLastName(event) {
    this.setState({
      LastName: event.target.value,
    });
  }
  changePassword(event) {
    this.setState({
      Password: event.target.value,
    });
  }
  changeEmail(event) {
    this.setState({
      Email: event.target.value,
    });
  }
  changeRePassword(event) {
    this.setState({
      RePassword: event.target.value,
    });
  }
  onSubmit(event) {
    event.preventDefault();
    const registered = {
      FirstName: this.state.FirstName,
      LastName: this.state.LastName,
      Email: this.state.Email,
      Password: this.state.Password,
    };

    axios
      .post("http://localhost:4000/app/signup", registered)
      .then((response) => {
        console.log(response.data);
      });
    this.setState = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
      RePassword: "",
    };
  }
  render() {
    return (
      <div className="container">
        <div className="row col-12   ">
          <h2 className="text-center">Sign Up</h2>
          <form onSubmit={this.onSubmit} className=" form-goup col-md-12 ">
            <label>First Name:</label>
            <input
              type="text"
              onChange={this.changeFirstName}
              value={this.state.FirstName}
              placeholder="First Name"
              className="form-control "
            />
            <label>Last Name:</label>
            <input
              type="text"
              onChange={this.changeLastName}
              value={this.state.LastName}
              placeholder="Last Name"
              className="form-control "
            />
            <label>Email:</label>
            <input
              type="text"
              onChange={this.changeEmail}
              value={this.state.Email}
              placeholder="Email"
              className="form-control"
            />
            <label>Password:</label>
            <input
              type="password"
              onChange={this.changePassword}
              value={this.state.Password}
              placeholder="Password"
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
          </form>
        </div>
      </div>
    );
  }
}
export default RegisterForm;
