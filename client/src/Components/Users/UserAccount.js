import React from "react";
import { useState, useEffect } from "react";
import DataManager from "./UsersDataManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const UserAccount = () => {
  const [user, setUser] = useState({});
  const [address, setAddress] = useState([]);

  const history = useHistory();

  const getTheAddress = () => {
    DataManager.getAddress().then((res) => {
      const filterAddress = res.filter(
        (addresses) => addresses.userProfileAddress.userProfileId === user?.id
      );
      setAddress(filterAddress);
    });
  };

  const deleteAddress = (deleteId) => {
    DataManager.deleteAddress(deleteId).then(() => getTheAddress());
  };

  useEffect(() => {
    getTheAddress();
    //This useEffect will loads only after the GetUser Effect loads
  }, [user]);

  const getUser = () => {
    DataManager.getUserProfile().then((res) => setUser(res));
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div>
        <p>
          Name: {user?.firstName} {user?.lastName}
        </p>
        <p>Email: {user?.email}</p>
      </div>

      <div>
        {address.map((A) => (
          <div key={A.id}>
            <p>Street: {A?.street}</p>
            <p>Apartment: {A?.apt}</p>
            <p>State: {A.state}</p>
            <p>ZipCode: {A?.zipCode}</p>
            <button onClick={() => history.push(`/EditAddress/${A.id}/Edit`)}>
              Edit
            </button>
            <button onClick={() => deleteAddress(A.id)}>Delete</button>
          </div>
        ))}
      </div>
      <div>
        <Button
          variant="contained"
          onClick={() => history.push(`/AddAddress/${user.id}`)}>
          <AddIcon />
          Add Address
        </Button>
      </div>
    </div>
  );
};

export default UserAccount;
