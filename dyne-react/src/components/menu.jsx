import React, { Component } from "react";
import { Link } from "react-router-dom";
import FoodItem from "./foodItem";

class Menu extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <h5>Menu</h5>
        {this.props.foodItems.map((foodItem) => (
          <Link
            to={{
              pathname: "/foodDetail",
              query: { id: foodItem.id, imageUrl: foodItem.imageUrl },
            }}
            key={foodItem.id}
            foodItem={foodItem}
            className="link"
          >
            <FoodItem key={foodItem.id} foodItem={foodItem} />
          </Link>
        ))}
      </div>
    );
  }
}

export default Menu;
