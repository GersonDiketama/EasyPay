import { getToken } from "../../modules/AuthManager";
export const billurl = "/api/Bills";
export const userProfileUrl = "/api/UserProfile/";
const addressUrl = "/api/address/GetallAddress";
const editAdressURL = "/api/Address/UpdateAddress";
const getAddressById = "/api/Address/GetAddressById";
const deleteURL = "/api/Address";
const addAddress = "/api/Address";

export const DataManager = {
  deleteAddress: (addressId) => {
    return fetch(`${deleteURL}/${addressId}`, {
      method: "DELETE",
    }).then((res) => res.json());
  },

  addAddress: (address) => {
    return fetch(addAddress, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    });
  },

  getBills: () => {
    return fetch(`${billurl}/GetAllBills`).then((res) => res.json());
  },

  getBiilById: (id) => {
    return fetch(`${billurl}/GetBillById/${id}`).then((res) => res.json());
  },

  getUserProfile: () => {
    return getToken().then((token) => {
      return fetch(`${userProfileUrl}/GetUserProfile`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  getAddress: () => {
    return fetch(addressUrl).then((res) => res.json());
  },

  getAddressId: (id) => {
    return fetch(`${getAddressById}/${id}`).then((res) => res.json());
  },

  editAddress: (address) => {
    return getToken().then((token) => {
      return fetch(`${editAdressURL}/${address}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      }).then((res) => res.json());
    });
  },
};

export default DataManager;
