// catetoryApi.ts

import { LOCAL_STORAGE_TOKEN_NAME } from "../constant/constant";
import { LoginUser, RegisterUser } from "../types/types";
import axiosClient from "./axiosClient";

const userApi = {
  async register(data: RegisterUser): Promise<any> { 
    const url = 'user/register'; 
    return axiosClient.post(url, data); 
  },



  async login(data: LoginUser): Promise<any> { 
    const url = 'user/login'; 
    return axiosClient.post(url, data); 
  },


  async getMyAccount(): Promise<any> { 
    const url = 'user/me'; 
    return axiosClient.get(url); 
  },
};

export default userApi;
