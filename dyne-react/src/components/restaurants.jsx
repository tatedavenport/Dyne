import React, { Component } from "react";
import Restaurant from "./restaurant";

class Restaurants extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.restaurants.map((restaurant) => (
          <Restaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    );
  }
}

export default Restaurants;
