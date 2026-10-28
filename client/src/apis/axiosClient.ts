import axios from "axios";
import { LOCAL_STORAGE_TOKEN_NAME, HTTP_URL_SERVER_NEST } from "../constant/constant";

const axiosClient = axios.create({
  baseURL: HTTP_URL_SERVER_NEST,
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

