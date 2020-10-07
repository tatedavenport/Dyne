import React, { Component } from "react";
import NavBar from "./components/navbar";
import Restaurants from "./components/restaurants";
import "./App.css";

class App extends Component {
  state = {
    restaurants: [
      {
        id: 1,
        title: "Naka Sushi",
        wait: "30min",
        rating: 4.5,
        status: "Open Now",
      },
      {
        id: 2,
        title: "Pasta Della Nona",
        wait: "20min",
        rating: 4.9,
        status: "Closed",
      },
      {
        id: 3,
        title: "Giovanni's Pizzeria",
        wait: "45min",
        rating: 4.3,
        status: "Closing Soon",
      },
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
