import React, { Component } from "react";
import NavBar from "./navbar";

class OrderComplete extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <NavBar />
        <div className="flex-row d-flex justify-content-center margin-bottom-2">
          <h5>Success!</h5>
          <svg
            width="1.5em"
            height="1.5em"
            viewBox="0 0 16 16"
            className="bi bi-bag-check"
            fill="green"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 1a2.5 2.5 0 0 0-2.5 2.5V4h5v-.5A2.5 2.5 0 0 0 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V5H2z"
            />
            <path
              fillRule="evenodd"
              d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </div>
        <div className="flex-row d-flex justify-content-center">
          <p>Your order has been complete</p>
        </div>
      </div>
    );
  }
}

export default OrderComplete;
