import React, { Component } from "react";
import "./Footer.css";
import axios from "axios";

class Footer extends Component {
  constructor() {
    super();
    this.state = {
      user: {}
    };
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      this.setState({ user: response.data });
    });
  }

  render() {
    return (
      <div className="footer">
        {!this.state.user.id && (
          <div className="loginButton">
            <a href={process.env.REACT_APP_LOGIN}> Login </a>
          </div>
        )}
        {this.state.user.id && (
          <div className="loginButton">
            <a href={process.env.REACT_APP_LOGOUT}> Logout </a>
          </div>
        )}
        <div className="welcome">Welcome, {this.state.user.name}</div>
      </div>
    );
  }
}

export default Footer;
