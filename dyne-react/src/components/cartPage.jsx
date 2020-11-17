import React, { Component } from "react";
import Cart from "./cart";
import NavBar from "./navbar";
import { Link } from "react-router-dom";

class CartPage extends Component {
  state = { foodItems: [] };

  componentDidMount() {
    console.log("App - Mounted");
    this.setState({ foodItems: this.props.foodItems });
  }

  render() {
    console.log(this.state);
    const mockFoodItems = [
      {
        id: "123",
        name: "mcBurger",
        price: 12.94,
        description: "fake description",
      },
      {
        id: "123",
        name: "mcBurger",
        price: 12.94,
        description: "fake description",
      },
      {
        id: "123",
        name: "mcBurger",
        price: 12.94,
        description: "fake description",
      },
      {
        id: "128391829329",
        name: "mcNuggets",
        price: 2.5,
        description: "wrongfl",
      },
    ];

    return (
      <div className="container">
        {this.props.children}
        <NavBar />
        <Link to="/" className="link">
          Back
        </Link>
        <hr />
        <div>
          <Cart foodItems={mockFoodItems} />
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-secondary">
            Place Order
          </button>
        </div>
      </div>
    );
  }
}

export default CartPage;
