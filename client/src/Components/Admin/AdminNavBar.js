import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../modules/AuthManager";

const AdminNavBar = () => {
  return (
    <div>
      <Link to="/">Manage Bills</Link>
      <Link to="/">Account</Link>
      <button onClick={logout}>LogOut</button>
    </div>
  );
};

export default AdminNavBar;
