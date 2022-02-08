import React from "react";
import { useState, useEffect } from "react";
import DataManager from "../Users/UsersDataManager";
import AdminAddressCard from "./AdminAddressCard";

const AdminAddressList = () => {
  const [address, setAddress] = useState([]);

  const getAddress = () => {
    DataManager.getAddress().then((res) => setAddress(res));
  };

  useEffect(() => {
    getAddress();
  }, []);

  return (
    <div>
      {address.map((addresses) => (
        <AdminAddressCard key={addresses.id} addresses={addresses} />
      ))}
    </div>
  );
};

export default AdminAddressList;
