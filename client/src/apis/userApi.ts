// catetoryApi.ts

import { User } from "../types/types";
import axiosClient from "./axiosClient";

const categoryApi = {
  async register(data: User): Promise<any> { 
    const url = 'user/register'; 
    return axiosClient.post(url, data); 
  },



  async login(data: User): Promise<any> { 
    const url = 'user/login'; 
    return axiosClient.post(url, data); 
  },
};

export default categoryApi;
