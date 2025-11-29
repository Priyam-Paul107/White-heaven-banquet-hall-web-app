import axios from "axios";
import axiosClient from "../api/axiosClient";
//customer
export const loginCustomer = async (email, password) => {
  return axiosClient.post("/login", { email, password });
};
export const getCustomerById = async (id) => {
  return axiosClient.get("/customer/"+id,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("customerJwtToken")}`,

      }
    });
};
export const registerCustomer = async (formData) => {
  return axiosClient.post("/signup", formData,{
      headers: {
        "Content-Type": "multipart/form-data",
      }
    });
};
export const updateCustomerById = async (formData,id) => {
  return axiosClient.put("/update/"+id, formData,{
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("customerJwtToken")}`,

      }
    });
};
export const getNearestBanquets = async (lat, lng) => {
  return axiosClient.get(`/banquet/nearest`, {
    params: { lat, lng }
  });
};

//payment

export const makePayment = (amount, bookingId) =>
  axiosClient.post(`/payment/create-order`, {
    amount,
    bookingId,
  });

export const verifyPayment = (data) =>
  axiosClient.post(`/payment/verify-order`, data);

export const getBanquetById = async (id) => {
  return axiosClient.get("/banquet/" + id);
};
export const getAllBanquet = async () => {
  return axiosClient.get("/banquet");
};
export const createBooking = async (formData) => {
  return axiosClient.post("/booking", formData, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("customerJwtToken")}`,
    },
  });
};
export const getBookingByCustomerId = async (id) => {
  return axiosClient.get("/booking/" + id, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("customerJwtToken")}`,
    },
  });
};
export const deleteBookingById = async (id) => {
  return axiosClient.delete("/booking/" + id, {
    headers: {
      Authorization: `Bearer ${
        localStorage.getItem("customerJwtToken") ||
        localStorage.getItem("adminJwtToken")
      }`,
    },
  });
};
//admin
export const loginAdmin = async (email, password) => {
  return axiosClient.post("/admin/login", { email, password });
};
export const registerBanquet = async (formData) => {
  return axiosClient.post(
    "/admin/banquet",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
      },
    }
  );
};

export const updateBanquetById = async (id, formData) => {
  return axiosClient.put("/admin/banquet/" + id, formData,{
    headers: {
       "Content-Type": "multipart/form-data" ,
      Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
    },
  });
};
export const deleteCustomertById = async (id) => {
  return axiosClient.delete("/admin/customer/" + id,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
    },
  });
};
export const getAllCustomer = async () => {
  return axiosClient.get("/admin/customer" ,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
    },
  });
};
export const deleteBanquetById = async (id) => {
  return axiosClient.delete("/admin/banquet/" + id,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
    },
  });
};

export const getAllBooking = async () => {
  return axiosClient.get("/admin/getallbooking", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("adminJwtToken")}`,
    },
  });
};
