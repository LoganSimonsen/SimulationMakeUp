import React, { Component } from "react";
import "./App.css";

class Header extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App">
        <a href={process.env.REACT_APP_LOGIN}> Login </a>
      </div>
    );
  }
}

export default Header;
