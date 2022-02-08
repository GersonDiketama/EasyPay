import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "reactstrap";
const AdminAddressCard = ({ addresses }) => {
  const history = useHistory();
  return (
    <div>
      <h1>{addresses.street}</h1>
      <p>{addresses.apt}</p>
      <p>{addresses.state}</p>
      <p>{addresses.zipCode}</p>
      <p>{}</p>
      <button onClick={() => history.push(`addressId/${addresses.id}/AddBill`)}>
        Add Bill
      </button>
    </div>
  );
};

export default AdminAddressCard;
