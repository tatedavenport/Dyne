import React, { Component } from "react";
import Cart from "./cart";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Axios from "axios";

class CartPage extends Component {
  state = { order: [] };

  componentDidMount() {
    console.log("App - Mounted");
    this.setState({
      order: this.props.location.query.order,
      restID: this.props.match.params.restaurantID,
    });
  }

  render() {
    const postOrder = () => {
      const restaurant_id = this.state.restID;
      Axios.post(
        "http://localhost:8080/restaurants/" + restaurant_id + "/orders",
        {
          name: "testUser",
          foodItems: this.state.order,
        }
      ).then(function (response) {
        console.log(response);
      });
    };
    return (
      <div className="container">
        {this.props.children}
        <NavBar />
        <Link to="/" className="link">
          Back
        </Link>
        <hr />
        <div>
          <Cart order={this.state.order} />
        </div>
        <div className="d-flex justify-content-center">
          <Link
            to={{
              pathname: "/orderComplete",
              query: {},
            }}
            className="link"
            onClick={postOrder}
          >
            <button type="button" className="btn btn-success">
              Place Order
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

export default CartPage;
