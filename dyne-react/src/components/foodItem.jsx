import React, { Component } from "react";

class FoodItem extends Component {
  state = {};

  render() {
    return (
      <div className="container">
        {this.props.children}
        <div className="d-flex row-auto justify-content-between">
          <div className="d-flex flex-column">
            <h6>{this.props.foodItem.name}</h6>
            <p className="text-muted small">${this.props.foodItem.price}</p>
          </div>
          <div className="d-flex flex-column">
            <img
              src={this.props.foodItem.imageUrl}
              width="100"
              height="100"
              alt=""
              loading="lazy"
            />
          </div>
        </div>

        <hr />
      </div>
    );
  }
}

export default FoodItem;