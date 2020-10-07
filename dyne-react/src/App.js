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
        img:
          "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
      },
      {
        id: 2,
        title: "Pasta Della Nona",
        wait: "20min",
        rating: 4.9,
        status: "Closed",
        img:
          "https://www.budgetbytes.com/wp-content/uploads/2018/04/The-Best-Weeknight-Pasta-Sauce-plate-H1.jpg",
      },
      {
        id: 3,
        title: "Giovanni's Pizzeria",
        wait: "45min",
        rating: 4.3,
        status: "Closing Soon",
        img:
          "https://cdn.loveandlemons.com/wp-content/uploads/2018/09/vegan-pizza-500x375.jpg",
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
