import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../modules/AuthManager";

const AdminNavBar = () => {
  return (
    <div>
      <li>
        <Link to="/">Manage Bills</Link>
      </li>
      <li>
        <Link to="/Account">Account</Link>
      </li>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default AdminNavBar;
