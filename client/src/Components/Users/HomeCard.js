import React from "react";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const HomeCard = ({ bill }) => {
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
          <b>Street: {bill.address.street}</b>
        </Typography>
        <Typography variant="h7" component="div">
          Apartment: {bill.address.apt}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary"></Typography>
        <Typography variant="body2">
          State: {bill.address.state}
          <br />
        </Typography>
        <br />
        <Typography>ZipCode: {bill.address.zipCode}</Typography>
      </CardContent>
      <CardActions>
        {bill.isPaid == false ? (
          <Button
            variant="contained"
            style={{ backgroundColor: "green" }}
            onClick={() => history.push(`/api/Bills/${bill.id}/makePayment`)}>
            Make Payment
          </Button>
        ) : (
          <Button style={{ backgroundColor: "orange" }} variant="contained">
            Bill Paid ✅
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default HomeCard;
