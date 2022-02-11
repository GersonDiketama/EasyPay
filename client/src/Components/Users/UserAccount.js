import React from "react";
import { useState, useEffect } from "react";
import DataManager from "./UsersDataManager";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

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

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
      •
    </Box>
  );

  return (
    <CardContent>
      <Typography sx={{ fontSize: 18 }} color="text.black" gutterBottom>
        <span>Name:</span>
        <b>
          {user?.firstName} {user?.lastName}
        </b>
      </Typography>
      <Typography variant="h5" component="div">
        Email: {user?.email}
      </Typography>
      <Button
        className="userAccountBtn"
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          backgroundColor: "orange",
        }}
        variant="contained"
        onClick={() => history.push(`/AddAddress/${user.id}`)}>
        Add Address
      </Button>

      {address.map((A) => (
        <Card key={A.id} className="AdminAddressCard userAccountBtn">
          <Typography>Street: {A?.street}</Typography>
          <Typography>Apartment: {A?.apt}</Typography>
          <Typography>State: {A.state}</Typography>
          <Typography>ZipCode: {A?.zipCode}</Typography>
          <Button
            style={{ backgroundColor: "orange" }}
            className="userAccountBtn"
            variant="contained"
            onClick={() => history.push(`/EditAddress/${A.id}/Edit`)}>
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "orange" }}
            className="userAccountBtn"
            variant="contained"
            onClick={() => deleteAddress(A.id)}>
            Delete
          </Button>
        </Card>
      ))}
    </CardContent>
  );
};

export default UserAccount;
