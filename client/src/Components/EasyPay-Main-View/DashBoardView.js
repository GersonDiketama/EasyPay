import React from "react";
import { useEffect } from "react/cjs/react.development";
import DataManager from "../Users/UsersDataManager";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const DashBoardView = () => {
  const [typeOfUser, setTypeOfUser] = useState([]);

  const getUsers = () => {
    DataManager.getAllUsers().then((res) => setTypeOfUser(res));
  };

  useEffect(() => getUsers(), []);

  return <div></div>;
};

export default DashBoardView;
