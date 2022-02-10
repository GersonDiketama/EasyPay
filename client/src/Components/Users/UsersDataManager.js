import { getToken } from "../../modules/AuthManager";
export const billurl = "/api/Bills";
export const userProfileUrl = "/api/UserProfile/";
const addressUrl = "/api/address/GetallAddress";
const editAdressURL = "/api/Address/UpdateAddress";
const getAddressById = "/api/Address/GetAddressById";
const deleteURL = "/api/Address";
const addAddress = "/api/Address";
const updateBillUrl = "/api/Bills/UpdatePaidBill";

export const DataManager = {
  deleteAddress: (addressId) => {
    return getToken().then((token) => {
      return fetch(`${deleteURL}/${addressId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  },

  getUserByFireBaseUserId: (fireId) => {
    return getToken().then((token) => {
      return fetch(`${userProfileUrl}/${fireId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  updatePaidBill: (bill) => {
    return getToken().then((token) => {
      return fetch(`${updateBillUrl}/${bill.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    });
  },

  addAddress: (address) => {
    return getToken().then((token) => {
      return fetch(addAddress, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      }).then((res) => res.json());
    });
  },

  getBills: () => {
    return getToken().then((token) => {
      return fetch(`${billurl}/GetAllBills`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  getBiilById: (id) => {
    return getToken().then((token) => {
      return fetch(`${billurl}/GetBillById/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
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

  getAllUsers: () => {
    return getToken().then((token) => {
      return fetch(`${userProfileUrl}/GetAllUsers`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  getAddress: () => {
    return getToken().then((token) => {
      return fetch(`${addressUrl}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  getAddressId: (id) => {
    return fetch(`${getAddressById}/${id}`).then((res) => res.json());
  },

  editAddress: (address) => {
    return getToken().then((token) => {
      return fetch(`${editAdressURL}/${address.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(address),
      });
    });
  },
};

export default DataManager;
