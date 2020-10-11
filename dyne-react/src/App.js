import React, { Component } from "react";
import NavBar from "./components/navbar";
import Restaurants from "./components/restaurants";
import MenuPage from "./components/menuPage";
import "./App.css";
import Axios from "axios";

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
    console.log(this.state);
    return (
      <React.Fragment>
        <NavBar />
        <Restaurants restaurants={this.state.restaurants} />
      </React.Fragment>
    );
  }
}

export default App;
