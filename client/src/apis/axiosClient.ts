import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME } from "../constant/constant";

const axiosClient = axios.create({
  baseURL: 'http://localhost:3003',
  headers: {
    'Content-Type' : 'application/json'
  }
});

// Add a request interceptor to axiosClient
axiosClient.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME); 
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;

