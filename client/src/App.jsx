
import React from "react";
import { hot } from 'react-hot-loader/root';
import { Route, Switch } from 'react-router-dom'
// import './App.css';

function App(){
  return(
    <div>
      <Switch>
        <Route
          path="/"
          render={() => <div>HomePage</div>}
        />
        <Route
          path="/products"
          render={() => <div>ProductsPage</div>}
        />
        <Route path="/">
          test
        </Route>
      </Switch>
    </div>
  )
}

export default hot(App);
