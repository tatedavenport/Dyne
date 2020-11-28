/*!


*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import * as firebase from 'firebase';


// core components
import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import Checkout from "components/checkout/Checkout.js";
import SignInSide from "components/SignIn/SignInSide.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";

var firebaseConfig = {
  apiKey: "AIzaSyBfzTcWMmGaz46fIQ1hARlL-UObPto0vrU",
  authDomain: "dyne-b0c3e.firebaseapp.com",
  databaseURL: "https://dyne-b0c3e.firebaseio.com",
  projectId: "dyne-b0c3e",
  storageBucket: "dyne-b0c3e.appspot.com",
  messagingSenderId: "45525255600",
  appId: "1:45525255600:web:bf0b4fc3de650e4bcc8275",
  measurementId: "G-S88WH0T7PV"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.auth();
firebase.storage();
firebase.firestore();

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/signup" component={Checkout} />
      <Route path="/admin" component={Admin} />
      <Route path="/rtl" component={RTL} />
      <Route path="/signin" component = {SignInSide} />
      <Redirect from="/" to="/signin" />
    </Switch>
  </Router>,
  document.getElementById("root")
);

export { firebase };
