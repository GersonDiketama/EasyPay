import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import DataManager from "../Users/UsersDataManager";
import Typography from "@mui/material/Typography";
import "../Users/main.css";
const AdminAddressCard = ({ addresses }) => {
  const [bills, setBills] = useState([]);

  const getBill = () => {
    DataManager.getBills().then((res) => setBills(res));
  };

  useEffect(() => getBill(), []);

  const history = useHistory();

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
      •
    </Box>
  );

  return (
    <Card sx={{ minWidth: 275 }} className="AdminAddressCard">
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Street: {addresses.street}
        </Typography>
        <Typography variant="h5" component="div">
          Apartment: {addresses.apt}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          State: {addresses.state}
        </Typography>
        <Typography variant="body2">
          Zip Code: {addresses.zipCode}
          <br />
        </Typography>

        <Typography>
          {bills.map((bill) => (
            <div key={bill.id}>
              {bill?.addressId == addresses.id ? (
                <Typography>
                  Bill paid in the Amount of <b>${bill.amount}</b>
                </Typography>
              ) : (
                ""
              )}
            </div>
          ))}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => history.push(`addressId/${addresses.id}/AddBill`)}>
          Add Bill
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminAddressCard;
