import { Algorithm } from "../types/types";
import axiosClient from "./axiosClient";

const algorithmApi = {
  async getAlgorithm(): Promise<Algorithm[]> { 
    const url = 'algorithm'; 
    return axiosClient.get(url); 
  },
};

export default algorithmApi;
