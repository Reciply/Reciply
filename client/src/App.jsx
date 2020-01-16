
import React from "react";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/HomePage';
import ProductPage from './pages/productpage/ProductPage';
import OrderPage from './pages/orderpage/OrderPage';
import ProfilePage from './pages/profilepage/ProfilePage'
import './App.css';

function App(){
  return(
    <div className="App" id="app">
      <Router>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/products">
            <ProductPage/>
          </Route>
          <Route path="/order">
            <OrderPage/>
          </Route>
          <Route path="/profile">
            <ProfilePage/>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default hot(App);
