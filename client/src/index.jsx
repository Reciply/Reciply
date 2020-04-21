import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import './index.css'

ReactDOM.render((<App/>), document.getElementById("app"));