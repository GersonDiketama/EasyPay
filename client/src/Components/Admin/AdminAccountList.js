import React from "react";
import { useState, useEffect } from "react";
import DataManager from "../Users/UsersDataManager";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
const AdminAccountList = () => {
  const [user, setUser] = useState({});

  const getUser = () => {
    DataManager.getUserProfile().then((res) => setUser(res));
  };

  useEffect(() => {
    getUser();
  }, []);

  //   return (
  //     <div>
  //       <h4>
  //         Name: {user.firstName} {user.lastName}
  //       </h4>
  //       <h4>Email: {user.email}</h4>
  //       <h4>Job Position: {user.isAdmin && <span>Bill Manager</span>}</h4>
  //     </div>
  //   );

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
          <b>
            Name: {user.firstName} {user.lastName}
          </b>
        </Typography>
        <Typography variant="h7" component="div">
          Email: {user.email}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <b>Job Position: {user.isAdmin && <span>Bill Manager</span>}</b>
        </Typography>
        <Typography variant="body2"></Typography>
      </CardContent>
      <CardActions>
        <Button
          style={{ backgroundColor: "orange" }}
          size="small"
          variant="contained">
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default AdminAccountList;
