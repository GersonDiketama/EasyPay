import react from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import DataManager from "./UsersDataManager";
import { useEffect } from "react/cjs/react.development";
import { logout } from "../../modules/AuthManager";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepOrange, deepPurple } from "@mui/material/colors";
const NavBar = () => {
  const [getCurrentUser, setCurrentUser] = useState({});

  const sessionToRemove = ["IsAdmin", "LoggedInUserId"];

  const getUser = () => {
    DataManager.getUserProfile().then((res) => setCurrentUser(res));
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="AdminNavBar">
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
          <Button
            style={{ backgroundColor: "white", color: "orange" }}
            variant="contained"
            onClick={logout}>
            Logout
          </Button>
        </li>

        <li>
          <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              {getCurrentUser.firstName}
            </Avatar>
          </Stack>
        </li>
      </div>
    </>
  );
};

export default NavBar;
