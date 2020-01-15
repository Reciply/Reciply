
import React from "react";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage'
// import './App.css';

function App(){
  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/products">
          Product Page
        </Route>
      </Switch>
    </Router>
  )
}

export default hot(App);
