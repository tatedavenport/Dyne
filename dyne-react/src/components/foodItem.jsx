import React, { Component } from "react";

class FoodItem extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        {this.props.children}
        <h6>{this.props.restaurant.foodItems}</h6>
      </div>
    );
  }
}

export default FoodItem;
