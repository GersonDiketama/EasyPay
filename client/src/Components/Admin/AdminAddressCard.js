import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "../Users/main.css";
const AdminAddressCard = ({ addresses }) => {
  const history = useHistory();

  // return (
  //   <div>
  //     <h1>{addresses.street}</h1>
  //     <p>{addresses.apt}</p>
  //     <p>{addresses.state}</p>
  //     <p>{addresses.zipCode}</p>
  //     <p>{}</p>
  //     <button onClick={() => history.push(`addressId/${addresses.id}/AddBill`)}>
  //       Add Bill
  //     </button>
  //   </div>
  // );

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
