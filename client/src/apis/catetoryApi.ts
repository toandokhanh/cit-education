// catetoryApi.ts

import { Category } from "../types/types";
import axiosClient from "./axiosClient";

const categoryApi = {
  async getCategories(): Promise<Category[]> { 
    const url = 'catetory'; 
    return axiosClient.get(url); 
  },
};

export default categoryApi;
