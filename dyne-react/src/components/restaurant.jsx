import React, { Component } from "react";
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
      <div>
        {this.props.children}
        <img src="" width="400" height="90" alt="" loading="lazy" />
        <h5>{this.props.restaurant.title}</h5>
        <p className="text-muted">Wait time not more than 20min</p>
      </div>
    );
  }
}

export default Restaurant;
