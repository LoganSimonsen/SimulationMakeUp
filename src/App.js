import React, { Component } from "react";
import "./App.css";
import Footer from "./components/Footer/Footer";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      bin: [],
      items: {}
    };
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      this.setState({ user: response.data });
      axios.get(`/api/bin/${response.data.id}`).then(response => {
        this.setState({ bin: response.data });
      });
    });
  }

  render() {
    console.log(this.state.bin);
    let results =
      this.state.bin &&
      this.state.bin.map((obj, i) => {
        return (
          <div>
            <div className="results">{obj.user_id} | </div>
            <div className="results">{obj.bin_id} | </div>
            <div className="results">{obj.bin_name} | </div>
          </div>
        );
      });

    return (
      <div>
        <div>
          <h1>GET</h1>
          <div>{results}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
