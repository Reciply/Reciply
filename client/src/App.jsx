
import React from "react";
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './state/store'

import HomePage from './pages/homepage/HomePage';
import ProductPage from './pages/productpage/ProductPage';
import OrderPage from './pages/orderpage/OrderPage';
import ProfilePage from './pages/profilepage/ProfilePage'
import Confirmation from './pages/confirmpage/ConfirmPage'
import history from './history'

import styles from './App.css';

function App(){
  return(
    <div className={styles.App} id="app">
      <Provider store={store}>
        <Router history={history}>
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
            <Route path="/confirmation">
              <Confirmation/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  )
}

export default hot(App);
