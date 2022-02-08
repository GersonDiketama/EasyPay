import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const HomeCard = ({ bill }) => {
  const history = useHistory();

  return (
    <div>
      <h5>Payment Due on 02/20/2022</h5>
      <p>
        {bill.isPaid == false ? (
          <>
            <b>Amount: ${bill.amount / 3}</b>
          </>
        ) : (
          <b>Amount: $0</b>
        )}
      </p>
      <p>ADDRESS: {bill.address.street}</p>
      <p>Apt: {bill.address.apt}</p>
      <p>ZipCode: {bill.address.zipCode}</p>

      {bill.isPaid == false ? (
        <Button
          variant="contained"
          style={{ backgroundColor: "green" }}
          onClick={() => history.push(`/api/Bills/${bill.id}/makePayment`)}>
          Make Payment
        </Button>
      ) : (
        <Button variant="contained">Bill Paid ✅</Button>
      )}
    </div>
  );
};

export default HomeCard;
