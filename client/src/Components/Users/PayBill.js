import React from "react";
import { useState, useEffect } from "react";
import DataManager from "./UsersDataManager";
import Button from "@mui/material/Button";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";

const PayBill = () => {
  const [bill, setbill] = useState({
    id: 3,
    amount: 300,
    isPaid: false,
    addressId: 1,
  });

  const history = useHistory();
  const { billId } = useParams();

  const updateBill = (event) => {
    event.preventDefault();

    const billToUpdate = {
      id: billId,
      amount: bill.amount,
      isPaid: !bill.isPaid,
      addressId: bill.addressId,
    };

    DataManager.updatePaidBill(billToUpdate).then(() => history.push("/Bills"));
  };

  return (
    <div>
      <Button onClick={updateBill}>Pay Bill</Button>
    </div>
  );
};

export default PayBill;
