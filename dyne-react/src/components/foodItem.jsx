import React, { Component } from "react";
const max_length = 100;

class FoodItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.foodItem.id,
      count: 0,
    };
  }

  handleChange = (e) => {
    this.setState({ [e.id]: e.count });
  };


  incrementCount = () => {
    this.props.onAddItem({id: this.state.id});
    this.setState({count: this.state.count+1});
  };

  decrementCount = () => {
    this.props.onSubtractItem({id: this.state.id});
    if (!(this.state.count===0))
    this.setState({count: this.state.count-1});
  };

  render() {
    let { count } = this.state;
    return (
      <div className="container">
        {this.props.children}
        <div className="d-flex row-auto justify-content-between">
          <div className="d-flex flex-column">
            <h6>{this.props.foodItem.data.name}</h6>
            {this.props.foodItem.data.description.length > max_length ? (
              <p className="text-muted small">
                {this.props.foodItem.data.description.substring(0, max_length)}
                ...
              </p>
            ) : (
              <p className="text-muted small">
                {this.props.foodItem.data.description}
              </p>
            )}

            <p className="small">${this.props.foodItem.data.price}</p>
          </div>
          <div className="d-flex flex-column">
            <img
              src={this.props.foodItem.data.imageUrl}
              width="100"
              height="100"
              alt=""
              loading="lazy"
            />
          </div>
          <button
            className="btn btn-light countBtn"
            onClick={this.decrementCount}
          >
            -
          </button>
          <p>{count} </p>
          <button
            className="btn btn-light countBtn"
            onClick={this.incrementCount}
          >
            +
          </button>
        </div>

        <hr />
      </div>
    );
  }
}

export default FoodItem;
