import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
class App extends Component {
  constructor() {
    super();
    this.state = {
      FirstName: "",
      LastName: "",
      Email: "",
      Password: "",
    };
    this.changeFirstName = this.changeFirstName.bind(this);
    this.changeLastName = this.changeLastName.bind(this);
    this.changeEmail = this.changeEmail.bind(this);
    this.changePassword = this.changePassword.bind(this);
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
    };
  }
  render() {
    return (
      <div>
        <div className="container">
          <div className="form-div">
            <form onSubmit={this.onSubmit}>
              <input
                type="text"
                onChange={this.changeFirstName}
                value={this.state.FirstName}
                placeholder="First Name"
                className="form-control form-group"
              />
              <input
                type="text"
                onChange={this.changeLastName}
                value={this.state.LastName}
                placeholder="Last Name"
                className="form-control form-group"
              />
              <input
                type="text"
                onChange={this.changeEmail}
                value={this.state.Email}
                placeholder="Email"
                className="form-control form-group"
              />
              <input
                type="password"
                onChange={this.changePassword}
                value={this.state.Password}
                placeholder="Password"
                className="form-control form-group"
              />
              <input
                type="submit"
                value="submit"
                className="btn btn-danger btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
