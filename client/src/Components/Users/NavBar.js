import react from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { UserProfileDataDataManager } from "./UsersDataManager";
import { useEffect } from "react/cjs/react.development";
import { logout } from "../../modules/AuthManager";
const NavBar = () => {
  return (
    <div>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/Bills">Bill</Link>
      </li>
      <li>
        <Link to="/Account">Account</Link>
      </li>
      <li>
        <button onClick={logout}>Logout</button>
      </li>
    </div>
  );
};

export default NavBar;
