import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import './index.css'

if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
}

ReactDOM.render((<App/>), document.getElementById("app"));