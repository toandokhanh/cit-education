// categoryApi.ts

import { Category } from "../types/types";
import axiosClient from "./axiosClient";

const categoryApi = {
  async getCategories(): Promise<Category[]> {
    const url = 'categories';
    return axiosClient.get(url);
  },
};

export default categoryApi;
