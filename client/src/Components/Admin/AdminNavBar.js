import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../../modules/AuthManager";
import Button from "@mui/material/Button";

const AdminNavBar = () => {
  return (
    <div className="AdminNavBar">
      <li>
        <Link to="/">Manage Bills</Link>
      </li>
      <li>
        <Link to="/Account">Account</Link>
      </li>
      <Button variant="contained" onClick={logout}>
        LogOut
      </Button>
    </div>
  );
};

export default AdminNavBar;
