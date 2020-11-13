import React, { Component } from "react";
import Menu from "./menu";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Axios from "axios";

class MenuPage extends Component {
  state = { foodItems: [] };

  componentDidMount() {
    console.log("App - Mounted");
    const restaurant_id = this.props.location.query.id;
    Axios.get(
      "http://localhost:8080/restaurants/" + restaurant_id + "/menu"
    ).then((response) => this.setState({ foodItems: response.data }));
  }

  render() {
    return (
      <div className="container">
        <NavBar />
        <Link to="/" className="link">
          Back
        </Link>
        <hr />
        <div className="d-flex justify-content-center">
          <img
            src={this.props.location.query.imageUrl}
            width="400"
            height="266"
            alt=""
            loading="lazy"
          />
        </div>
        <div>
          <Menu
            foodItems={this.state.foodItems}
            onIncrement={this.handleIncrement}
            onDecrease={this.handleDecrease}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-secondary">
            Your Cart
          </button>
          <button type="button" className="btn btn-secondary">
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default MenuPage;
