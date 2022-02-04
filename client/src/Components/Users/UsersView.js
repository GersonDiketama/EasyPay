import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import UserAccount from "./UserAccount";
import Register from "../Register";
import Login from "../Login";
import EditAddress from "./EditAddress";

const UsersView = ({ isLoggedIn }) => {
  return (
    <div>
      <Route exact path="/">
        {isLoggedIn ? <NavBar /> : <Redirect to="/login" />}
        {isLoggedIn ? <Home /> : <Redirect to="/login" />}
      </Route>
      <Route path="/Bills">
        {isLoggedIn ? <NavBar /> : <Redirect to="/login" />}
        {isLoggedIn ? <Home /> : <Redirect to="login" />}
      </Route>

      <Route path="/Account">
        {isLoggedIn ? <NavBar /> : <Redirect to="/login" />}
        {isLoggedIn ? <UserAccount /> : <Redirect to="login" />}
      </Route>
      <Route path="/EditAddress/:addressId(\d+)/Edit">
        {isLoggedIn ? <EditAddress /> : <Redirect to="login" />}
      </Route>

      <Route exact path="/login">
        <Login />
      </Route>

      <Route exact path="/register">
        <Register />
      </Route>
    </div>
  );
};

export default UsersView;