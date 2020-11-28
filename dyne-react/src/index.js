import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import MenuPage from "./components/menuPage";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import QRcode from "./components/QRcode";
import CartPage from "./components/cartPage";
import OrderComplete from "./components/orderComplete";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/menuPage/:restaurantID" component={MenuPage} />
      <Route path="/QRcode" component={QRcode} />
      <Route path="/cartPage/:restaurantID" component={CartPage} />
      <Route path="/orderComplete" component={OrderComplete} />
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
