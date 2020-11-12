import React, { Component } from "react";
import NavBar from "./components/navbar";
import Restaurants from "./components/restaurants";
import "./App.css";
import Axios from "axios";
import QRcode from "./components/QRcode";
import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends Component {
  state = {
    restaurants: [],
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log("App - Mounted");
    Axios.get("http://localhost:8080/restaurants").then((response) =>
      this.setState({ restaurants: response.data })
    );
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Restaurants restaurants={this.state.restaurants} />
      </React.Fragment>
    );
  }
}

export default App;
