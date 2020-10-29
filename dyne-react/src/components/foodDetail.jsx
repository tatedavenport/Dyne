import React, { Component } from "react";
import { Link } from "react-router-dom";

class FoodDetail extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="d-flex row-auto">THis is gonna be the image</div>
        <div className="d-flex row-auto">
          <h5>THis is gonna be the Title</h5>
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-info">
            ADD TO CART
          </button>
        </div>
      </div>
    );
  }
}

export default FoodDetail;
