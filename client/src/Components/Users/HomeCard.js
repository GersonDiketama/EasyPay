import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomeCard = ({ bill }) => {
  const history = useHistory();

  return (
    <div>
      <h5>Payment Due on 02/20/2022</h5>
      <p>
        Amount: <b>{bill.amount / 3}</b>
      </p>
      <p>ADDRESS: {bill.address.street}</p>
      <p>Apt: {bill.address.apt}</p>
      <p>ZipCode: {bill.address.zipCode}</p>

      <Button
        variant="contained"
        style={{ backgroundColor: "green" }}
        onClick={() => history.push(`/api/Bills/${bill.id}/makePayment`)}>
        Make Payment
      </Button>
    </div>
  );
};

export default HomeCard;
