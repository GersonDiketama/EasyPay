import React from "react";
import { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import { Spinner } from "reactstrap";
import UsersView from "../Users/UsersView";
import AdminView from "../Admin/AdminView";
import { onLoginStatusChange } from "../../modules/AuthManager";
const EasyPayView = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  // The "isLoggedIn" state variable will be null until //  the app's connection to firebase has been established.
  //  Then it will be set to true or false by the "onLoginStatusChange" function
  if (isLoggedIn === null) {
    // Until we know whether or not the user is logged in or not, just show a spinner
    return <Spinner className="app-spinner dark" />;
  }

  return (
    <div>
      <Route path="/">
        <UsersView isLoggedIn={isLoggedIn} />
      </Route>
      <Route>
        <AdminView isLoggedIn={isLoggedIn} />
      </Route>
    </div>
  );
};

export default EasyPayView;
