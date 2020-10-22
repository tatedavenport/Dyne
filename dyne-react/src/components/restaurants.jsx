import React, { Component } from "react";
import { Link } from "react-router-dom";
import Restaurant from "./restaurant";

class Restaurants extends Component {
  state = {};
  render() {
    return (
      <div>
        {this.props.restaurants.map((restaurant) => (
          <Link
            to={{ pathname: "/menuPage", query: { id: restaurant.id } }}
            key={restaurant.id}
            restaurant={restaurant}
          >
            <Restaurant key={restaurant.id} restaurant={restaurant} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Restaurants;
