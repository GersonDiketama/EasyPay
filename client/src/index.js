import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Route } from "react-router-dom/cjs/react-router-dom.min";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import EasyPayView from "./Components/EasyPay-Main-View/EasyPay-Page-Render";
import firebase from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Route>
    <EasyPayView />
  </Route>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
