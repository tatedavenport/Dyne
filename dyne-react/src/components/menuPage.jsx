import React, { Component } from "react";
import Menu from "./menu";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Axios from "axios";

class MenuPage extends Component {
  state = { foodItems: [], restId: "", order: [] };

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

  onAddItem = (item) => {
    console.log(item);
    let newArray = [...this.state.order];
    console.log(newArray);
    //check if item is already in array, if found then increment
    let found = false;
    for (let i = 0; i < newArray.length; i++) {
      let foodItem = newArray[i];
      if (foodItem.id === item.id) {
        found = true;
        newArray[i].count += 1;
      }
    }
    console.log(newArray);
    //if not found, add item
    if (!found) {
      newArray.push({
        id: item.id,
        name: item.name,
        price: item.price,
        count: 1,
      });
      this.setState({ order: newArray });
      console.log(newArray);
    }
  };

  onSubtractItem = (item) => {
    let newArray = [...this.state.order];
    //check if item is already in array, if found and count > 1, decrement; if count is 1 remove
    let found = false;
    for (let i = 0; i < newArray.length; i++) {
      let foodItem = newArray[i];
      if (foodItem.id === item.id) {
        found = true;
        if (foodItem.count > 1) {
          newArray[i].count -= 1;
        } else if (foodItem.count === 1) {
          newArray.splice(i, 1); //remove 1 item, starting at index i
        }
      }
    }
    if (found) {
      this.setState({ order: newArray });
    }
    console.log(newArray);
  };

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
            onAddItem={this.onAddItem}
            onSubtractItem={this.onSubtractItem}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Link
            to={{
              pathname: "/cartPage",
              query: { id: this.state.restId, order: this.state.order },
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
