import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";
import * as firebase from 'firebase';
import {firebaseConfig} from './variables/constants' 

// pages for this product
import Components from "views/Components/Components.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";
import BuyerPage from "views/BuyerPage/BuyerProfile";
import VesselRegisterPage from "views/RegisterVessel/RegisterVessel";
import LoginPage from "views/LoginPage/LoginPage.js";

var hist = createBrowserHistory();
const App = () => {
  React.useEffect(()=>{
    firebase.initializeApp(firebaseConfig)
  },[])
  return (
    <Router history={hist} basename={"/"}>
      <Switch>
        <Route path="/driver" component={BuyerPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/register-vessel" component={VesselRegisterPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/components" component={Components} />
        <Route path="/" component={LandingPage} />
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App/>, document.getElementById("root"));
