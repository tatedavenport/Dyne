import React, { Component } from "react";
const max_length = 100;
class SimpleFoodItem extends Component {
  state = {};
  componentDidMount() {}

  render() {
    return (
      <div className="container">
        {this.props.children}
          <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <div className="d-flex flex-column">
                <h6>{this.props.foodItem.name}</h6>
                <p className="small">${this.props.foodItem.price}</p>
            </div>
            <div className="d-flex flex-row">
                <h6>Count: </h6>
                <h6>{this.props.foodItem.count}</h6>
            </div>
          </div>
        <hr />
      </div>
    );
  }
}

export default SimpleFoodItem;