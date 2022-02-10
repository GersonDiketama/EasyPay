import React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import UsersView from "../Users/UsersView";
import AdminView from "../Admin/AdminView";
import DataManager from "../Users/UsersDataManager";
import { onLoginStatusChange } from "../../modules/AuthManager";
import Login from "../Login";
const EasyPayView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("IsAdmin"));

  useEffect(() => {
    setIsAdmin(localStorage.getItem("IsAdmin"));
  }, [isAdmin]);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  console.log(isAdmin);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/">
        {isAdmin == "false" ? (
          <UsersView isLoggedIn={isLoggedIn} />
        ) : (
          <AdminView isLoggedIn={isLoggedIn} />
        )}

        {/* {isAdmin && (
          <Route>
            <AdminView isLoggedIn={isLoggedIn} />
          </Route>
        )} */}
      </Route>

      {/* 
      <Route path="/">
        <Route>{<UsersView isLoggedIn={isLoggedIn} />}</Route>
        <Route>{<AdminView isLoggedIn={isLoggedIn} />}</Route>
      </Route> */}
    </div>
  );
};

export default EasyPayView;
