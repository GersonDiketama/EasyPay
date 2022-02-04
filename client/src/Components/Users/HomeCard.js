import React from "react";
import Button from "@mui/material/Button";

const HomeCard = ({ bill }) => {
  return (
    <div>
      <h5>Payment Due on 01/31/2022</h5>
      <p>
        Amount: <b>{bill.amount / 3}</b>
      </p>
      <p>ADDRESS: {bill.address.street}</p>
      <p>Apt: {bill.address.apt}</p>
      <p>ZipCode: {bill.address.zipCode}</p>

      <Button variant="contained" style={{ backgroundColor: "green" }}>
        Make Payment
      </Button>
    </div>
  );
};

export default HomeCard;
