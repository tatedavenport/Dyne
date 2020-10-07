import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
//TODO:
//not sure how wait time is gonna be calculated
//status will be calculated depending on the hours of each restaurant (needs function)
//needs method to handle status color change
class Restaurant extends Component {
  state = {};

  componentDidUpdate() {
    console.log("App - Update");
  }

  componentWillUnmount() {
    console.log("App - Unmount");
  }

  render() {
    return (
      <div className="container m-3">
        {this.props.children}
        <div className="row">
          <img
            src={this.props.restaurant.img}
            width="400"
            height="266"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="row">
          <div className="col-4 px-0">
            <h5>{this.props.restaurant.title}</h5>
            <p className="text-muted small">
              Approx wait time: {this.props.restaurant.wait}
            </p>
          </div>
          <div className="col-3 text-right">
            <p className="float-right small">{this.props.restaurant.rating}</p>
            <Rating
              name="half-rating-read"
              size="small"
              defaultValue={5.0}
              value={this.props.restaurant.rating}
              precision={0.1}
              readOnly
            />
            <p className={this.formatRestaurantStatus()}>
              {this.props.restaurant.status}
            </p>
          </div>
        </div>
      </div>
    );
  }

  formatRestaurantStatus() {
    let classes = "small ";
    classes +=
      this.props.restaurant.status === "Open Now"
        ? "text-success"
        : this.props.restaurant.status === "Closed"
        ? "text-danger"
        : "text-warning";
    return classes;
  }
}

export default Restaurant;
