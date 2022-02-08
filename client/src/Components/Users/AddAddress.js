import React, { useState } from "react";
import { useHistory } from "react-router";
import DataManager from "./UsersDataManager";
import Button from "@mui/material/Button";

export const ADDAddress = () => {
  const [address, setAddress] = useState({
    street: "",
    apt: "",
    state: "",
    zipCode: "",
  });

  const history = useHistory();

  const HandleInputAndpost = (event) => {
    event.preventDefault();

    const copy = { ...address };
    let val = event.target.value;
    // if (event.target.id.includes("Id")) {
    //   val = parseInt(val);
    // }
    copy[event.target.id] = val;
    setAddress(copy);
  };

  const handleSaveButton = (event) => {
    event.preventDefault();
    DataManager.addAddress(address)
      .then(DataManager.getUserProfile())
      .then(() => history.push("/Account"));
  };

  return (
    <div className="send_invitations">
      <h2>Add Address </h2>

      <form>
        <label>Street</label>
        <input
          className="Street"
          type="text"
          id="street"
          value={address.street}
          onChange={HandleInputAndpost}
        />
        <label>Apt</label>
        <input
          className="Apt"
          type="text"
          id="apt"
          value={address.apt}
          onChange={HandleInputAndpost}
        />
        <label>State</label>
        <input
          className="State"
          type="text"
          id="state"
          value={address.state}
          onChange={HandleInputAndpost}
        />
        <label>Zip Code</label>
        <input
          rows="4"
          cols="50"
          placeholder="zipCode"
          type="text"
          id="zipCode"
          value={address.zipCode}
          onChange={HandleInputAndpost}
        />
        <div className="center-btn-employer-Service-Post">
          <Button
            className="button-style"
            variant="contained"
            onClick={handleSaveButton}>
            Send Request
          </Button>
          <Button
            className="button-style"
            style={{ backgroundColor: "red" }}
            variant="contained"
            onClick={() => history.push("/Account")}>
            Cancel ❌
          </Button>
        </div>
      </form>
    </div>
  );
};
