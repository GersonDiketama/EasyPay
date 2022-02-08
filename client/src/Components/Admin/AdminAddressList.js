import React from "react";
import { useState, useEffect } from "react";
import DataManager from "../Users/UsersDataManager";
import AdminAddressCard from "./AdminAddressCard";

const AdminAddressList = () => {
  const [address, setAddress] = useState();

  const getAddress = () => {
    DataManager.getAddress().then((res) => setAddress(res));
  };

  useEffect(() => {
    getAddress();
  }, []);

  return <div>{<AdminAddressCard key={address.id} address={address} />}</div>;
};

export default AdminAddressList;
