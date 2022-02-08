import { getToken } from "../../modules/AuthManager";

const addressByIdURL = "/api/Address/GetAddressById";

const AddBillURL = "/api/Bills";

export const AdminDataManager = {
  getAddressById: (id) => {
    return getToken().then((token) => {
      return fetch(`${addressByIdURL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json());
    });
  },

  addBill: (bill) => {
    return getToken().then((token) => {
      return fetch(AddBillURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bill),
      }).then((res) => res.json());
    });
  },
};
