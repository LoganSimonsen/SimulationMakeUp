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
      items: {},
      input: "",
      response: ".",
      newBinNameValue: "",
      newBinIdValue: ""
    };
    this.deleteBin = this.deleteBin.bind(this);
    this.createBin = this.createBin.bind(this);
    this.inputValue = this.inputValue.bind(this);
    this.getMe = this.getMe.bind(this);
    this.editBinNameInput = this.editBinNameInput.bind(this);
    this.editBinIdInput = this.editBinIdInput.bind(this);
    this.editBinName = this.editBinName.bind(this);
  }

  componentDidMount() {
    axios.get("/api/me").then(response => {
      this.setState({ user: response.data });
      axios.get(`/api/bin/${response.data.id}`).then(response => {
        this.setState({ bin: response.data });
      });
    });
  }
  createBin(input) {
    let binName = input;
    let body = {
      name: binName
    };
    axios.post(`/api/binPost/1`, body).then(response => {
      this.setState({ response: response.status }).then(this.getMe());
    });
  }
  getMe() {
    axios.get("/api/me").then(response => {
      this.setState({ user: response.data });
    });
  }
  inputValue(e) {
    this.setState({ input: e.target.value });
  }
  deleteBin(input) {
    axios
      .delete(`/api/deleteBin?bin_id=${input}`)
      .then(response => console.log(response));
  }
  editBinNameInput(e) {
    this.setState({ newBinNameValue: e.target.value });
  }
  editBinIdInput(e) {
    this.setState({ newBinIdValue: e.target.value });
  }
  editBinName(name) {
    let binName = name;
    let body = {
      name: binName
    };
    axios
      .put(`/api/changeName/${this.state.newBinIdValue}`, body)
      .then(response => {
        this.setState({ response: response.status }).then(this.getMe());
      });
  }
  render() {
    let results =
      this.state.bin &&
      this.state.bin.map((obj, i) => {
        return (
          <div>
            <div className="results">{obj.user_id} | </div>
            <div className="results">{obj.bin_id} | </div>
            <div className="results">{obj.bin_name} | </div>
            <button onClick={() => this.deleteBin(obj.bin_id)}>DELETE</button>
          </div>
        );
      });

    return (
      <div>
        <div>
          <h1>GET & DELETE</h1>
          <div>{results}</div>
        </div>
        <div>
          <h1>POST</h1>
          <form type="submit">
            Create New Bin:
            <input
              onChange={e => this.inputValue(e)}
              placeholder="Bin Name Goes Here"
            />
            <button onClick={e => this.createBin(this.state.input)}>
              submit
            </button>
          </form>
          <h1>PUT</h1>
          <form type="submit">
            Edit Bin Name:<br />
            <input
              onChange={e => this.editBinNameInput(e)}
              placeholder="New Bin Name Goes Here"
            />
            <br />
            <br />
            <input
              onChange={e => this.editBinIdInput(e)}
              placeholder="bin id target"
            />
            <br />
            <br />
            <button onClick={e => this.editBinName(this.state.newBinNameValue)}>
              submit
            </button>
          </form>
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
