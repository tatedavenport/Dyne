import React, { Component } from "react";
import NavBar from "./navbar";
import QrReader from "react-qr-reader";

class QRcode extends Component {
  state = { result: "No result" };

  handleScan = (data) => {
    if (data) {
      this.setState({
        result: data,
      });
    }
  };
  handleError = (err) => {
    console.error(err);
  };

  render() {
    return (
      <div>
        <NavBar />
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: "100%" }}
        />
        <p>{this.state.result}</p>
      </div>
    );
  }
}

export default QRcode;
