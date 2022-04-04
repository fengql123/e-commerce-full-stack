import axios from "axios";

const endpoint = "http://localhost:3001/";

export const fetchProfileAPI = async () => {
  const response = await axios.get(`${endpoint}profile`);
  return response.data;
};

export const fetchProductsAPI = async () => {
  const response = await axios.get(`${endpoint}product`);
  return response.data;
};

export const fetchCartAPI = async () => {
  const response = await axios.get(`${endpoint}cart`);
  return response.data;
};

export const fetchOrdersAPI = async () => {
  const response = await axios.get(`${endpoint}order`);
  return response.data;
};
