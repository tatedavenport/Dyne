import React, { Component } from "react";
import Cart from "./cart";
import NavBar from "./navbar";
import { Route, Link } from "react-router-dom";
import Axios from "axios";

class CartPage extends Component {
  state = { foodItems: [] };

  componentDidMount() {
    console.log("App - Mounted");
    const restaurant_id = this.props.location.query.id;
    console.log(restaurant_id);
    this.setState({foodItems: this.props.foodItems})
  }


  render() {
    const mockFoodItems = [
        {id: "123", name: "mcBurger", price: 12.94, description: "fake description"}, 
        {id: "123", name: "mcBurger", price: 12.94, description: "fake description"}, 
        {id: "123", name: "mcBurger", price: 12.94, description: "fake description"},
        {id: "128391829329", name: "mcNuggets", price: 2.50, description: "wrongfl"}
    ];

    return (
      <div className="container">
        <NavBar />
        <Link to="/" className="link">
          Back
        </Link>
        <hr />
        <div>
          <Cart foodItems={mockFoodItems} />
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" class="btn btn-secondary">
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default CartPage;
