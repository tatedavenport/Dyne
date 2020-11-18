import React, { Component } from "react";
import Menu from "./menu";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Axios from "axios";

class MenuPage extends Component {
  state = { foodItems: [], restId: "" };

  componentDidMount() {
    console.log("App - Mounted");
    const restaurant_id = this.props.match.params.restaurantID;
    Axios.get(
      "http://localhost:8080/restaurants/" + restaurant_id + "/menu"
    ).then((response) =>
      this.setState({
        foodItems: response.data,
        restId: restaurant_id,
      })
    );
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
            src={this.state.image}
            width="500"
            height="166"
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
          <Link
            to={{
              pathname: "/cartPage",
              query: { id: this.state.restId, foodItems: this.state.foodItems },
            }}
            className="link"
          >
            <button type="button" className="btn btn-success">
              Your Cart
            </button>
          </Link>
          <button type="button" className="btn btn-success">
            Checkout
          </button>
        </div>
      </div>
    );
  }
}

export default MenuPage;
