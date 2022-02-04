import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import DataManager from "./UsersDataManager";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
const EditAddress = () => {
  const [editAddress, setEditAddress] = useState({
    street: "",
    apt: "",
    state: "",
    zipCode: "",
  });

  const history = useHistory();
  const { addressId } = useParams();

  const handleFields = (event) => {
    const copy = { ...editAddress };
    copy[event.target.id] = event.target.value;
    setEditAddress(copy);
  };

  const updateAddress = (event) => {
    event.preventDefault();

    const addressToUpdate = {
      id: addressId,
      street: editAddress.street,
      apt: editAddress.apt,
      state: editAddress.state,
      zipCode: editAddress.zipCode,
    };

    DataManager.editAddress(addressToUpdate).then(() =>
      history.push("/Account")
    );
  };

  //WE NEED THIS USE EFFECT TO UPDATE/ REACT TO EACH SPECIFIC EDIT IN AN ID
  useEffect(() => {
    DataManager.getAddressId(addressId).then((address) =>
      setEditAddress(address)
    );
  }, []);

  return (
    <>
      <div className="Form-input">
        <h1>Edit Your Address</h1>
        <div className="input-styles">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 0.5, width: "30ch" },
            }}
            noValidate
            autoComplete="off">
            <div>
              <TextField
                id="street"
                label="Street"
                onChange={handleFields}
                multiline
                maxRows={4}
                value={editAddress.street}
              />
              <TextField
                id="apt"
                label="Apt"
                value={editAddress.apt}
                onChange={handleFields}
                placeholder="Placeholder"
                multiline
              />
              <TextField
                id="zipCode"
                label="zipCode"
                value={editAddress.zipCode}
                onChange={handleFields}
                multiline
                rows={1}
                defaultValue=""
              />
            </div>
            <div>
              <TextField
                id="state"
                label="State"
                value={editAddress.state}
                placeholder="state"
                onChange={handleFields}
                multiline
                maxRows={4}
                variant="filled"
              />
            </div>

            <div className="send-btn">
              <Button onClick={updateAddress} variant="contained">
                Save
              </Button>
              <Button
                onClick={() => history.push("/Account")}
                variant="contained">
                Cancel
              </Button>
            </div>
          </Box>
        </div>
      </div>
    </>
  );
};

export default EditAddress;
