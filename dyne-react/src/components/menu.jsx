import React, { Component } from "react";
import FoodItem from "./foodItem";

class Menu extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        <h5>Menu</h5>
        {this.props.foodItems.map((foodItem) => (
          <FoodItem
            key={foodItem.id}
            foodItem={foodItem}
            onAddItem={this.props.onAddItem}
            onSubtractItem={this.props.onSubtractItem}
          />
        ))}
      </div>
    );
  }
}

export default Menu;
