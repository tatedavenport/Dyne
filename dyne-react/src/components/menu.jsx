import React, { Component } from "react";
import FoodItem from "./foodItem";

class Menu extends Component {
  state = {};

  render() {
    console.log(this.props);
    return (
      <div>
        This is the menu of the restaurant where the food items will show up
      </div>
    );
  }
}

export default Menu;
