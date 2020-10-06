import React, { Component } from "react";
import NavBar from "./components/navbar";
import Restaurants from "./components/restaurants";
import "./App.css";

class App extends Component {
  state = {
    restaurants: [
      { id: 1, title: "Naka Sushi" },
      { id: 2, title: "Pasta Della Nona" },
      { id: 3, title: "Giovanni's Pizzeria" },
    ],
  };

  constructor(props) {
    super(props);
    console.log("App - Constructor");
  }

  componentDidMount() {
    console.log("App - Mounted");
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
