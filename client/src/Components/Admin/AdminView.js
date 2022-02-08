import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import { Redirect } from "react-router-dom";
import AdminAddressList from "./AdminAddressList";

const AdminView = ({ isLoggedIn }) => {
  return (
    <div>
      <Route exact path="/">
        {isLoggedIn ? <AdminAddressList /> : <Redirect to="login" />}
      </Route>
    </div>
  );
};

export default AdminView;
