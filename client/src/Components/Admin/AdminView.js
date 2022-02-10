import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import AdminAddressList from "./AdminAddressList";
import AdminNavBar from "./AdminNavBar";
import { AddBill } from "./AddBill";
import AdminAccountList from "./AdminAccountList";

const AdminView = ({ isLoggedIn }) => {
  return (
    <div>
      <Route exact path="/">
        {isLoggedIn ? <AdminNavBar /> : <Redirect to="login" />}
        {isLoggedIn ? <AdminAddressList /> : <Redirect to="login" />}
      </Route>
      <Route exact path="/addressId/:addressId/AddBill">
        {isLoggedIn ? <AddBill /> : <Redirect to="login" />}
      </Route>
      <Route exact path="/Account">
        {isLoggedIn ? <AdminNavBar /> : <Redirect to="login" />}
        {isLoggedIn ? <AdminAccountList /> : <Redirect to="login" />}
      </Route>
    </div>
  );
};

export default AdminView;
