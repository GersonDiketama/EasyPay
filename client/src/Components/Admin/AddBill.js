import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router";
import { AdminDataManager } from "./AdminDataManager";
import Button from "@mui/material/Button";

export const AddBill = () => {
  const { addressId } = useParams();

  const [bill, setbill] = useState({
    amount: "",
    isPaid: false,
    addressId: addressId,
  });

  console.log(addressId);

  const history = useHistory();

  const HandleInputAndpost = (event) => {
    event.preventDefault();

    const copy = { ...bill };
    let val = event.target.value;
    // if (event.target.id.includes("Id")) {
    //   val = parseInt(val);
    // }
    copy[event.target.id] = val;
    setbill(copy);
  };

  const handleSaveButton = (event) => {
    event.preventDefault();
    AdminDataManager.addBill(bill).then(() => history.push("/"));
  };

  return (
    <div className="send_invitations">
      <h2>Add bill </h2>

      <form>
        <label>Amount</label>
        <input
          className="amount"
          type="text"
          id="amount"
          value={bill.amount}
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
