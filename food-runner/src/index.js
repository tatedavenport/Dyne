import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RestaurantCard from './components/RestaurantCard';
import { withStyles } from '@material-ui/core/styles';
import App from './App';
import Test2 from './Test2';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  BrowserRouter
} from "react-router-dom";
import OrderPage from './components/OrderPage';
import DeliverPage from './components/DeliverPage';


ReactDOM.render(
  <BrowserRouter>
    <Router>
      <Switch>
        <Route exact path="/" component={App}>

        </Route>
        <Route path="/order-page" component={OrderPage}>

        </Route>
        <Route path="/deliver-page" component={DeliverPage}>

        </Route>
      </Switch>
    </Router>
  </BrowserRouter>,
  document.getElementById('root')
);
