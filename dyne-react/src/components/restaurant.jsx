import React, { Component } from "react";
import Rating from "@material-ui/lab/Rating";
//titles will come from the restaurants class and before that, from the DB
//same for the pictures I believe
//not sure how wait time is gonna be calculated or rating
//still figuring out status
class Restaurant extends Component {
  state = {};

  componentDidUpdate() {
    console.log("App - Update");
  }

  componentWillUnmount() {
    console.log("App - Unmount");
  }

  render() {
    //console.log(this.props.restaurant.title);
    return (
      <div className="container m-3">
        {this.props.children}
        <div className="row">
          <img src="" width="400" height="90" alt="" loading="lazy" />
        </div>
        <div className="row">
          <div className="col-4 px-0">
            <h5>{this.props.restaurant.title}</h5>
            <p className="text-muted">
              Wait time is {this.props.restaurant.wait}
            </p>
          </div>
          <div className="col-3 text-right">
            <Rating
              name="half-rating-read"
              size="small"
              defaultValue={5.0}
              value={this.props.restaurant.rating}
              precision={0.1}
              readOnly
            />
            <p>{this.props.restaurant.status}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Restaurant;
