import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import App from "./App";
import MenuPage from "./components/menuPage";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import QRcode from "./components/QRcode";
<<<<<<< HEAD
import FoodDetail from "./components/foodDetail";
=======
import CartPage from "./components/cartPage";
>>>>>>> b3125d112eb5ef4672bcd6a2503a8f86c4af0cf2

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/menuPage" component={MenuPage} />
      <Route path="/QRcode" component={QRcode} />
<<<<<<< HEAD
      <Route path="/foodDetail" component={FoodDetail} />
=======
      <Route path="/cartPage" component={CartPage} />
>>>>>>> b3125d112eb5ef4672bcd6a2503a8f86c4af0cf2
    </div>
  </Router>
);
ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
