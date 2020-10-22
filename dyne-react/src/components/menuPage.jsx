import React, { Component } from "react";
import Menu from "./menu";
import NavBar from "./navbar";
import { Link } from "react-router-dom";
import Axios from "axios";

class MenuPage extends Component {
  state = { foodItems: [] };

  componentDidMount() {
    console.log("App - Mounted");
    console.log(this.props);
    const restaurant_id = this.props.location.query.id;
    Axios.get(
      "http://localhost:8080/restaurants/" + restaurant_id + "/menu"
    ).then((response) => this.setState({ foodItems: response.data }));
  }

  render() {
    //console.log(this.state.foodItems);
    return (
      <div className="container">
        <NavBar />
        <Link to="/">Back</Link>
        <Menu foodItems={this.state.foodItems} />
      </div>
    );
  }
}

export default MenuPage;
