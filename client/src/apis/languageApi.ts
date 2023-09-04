import { Language } from "../types/types";
import axiosClient from "./axiosClient";

const langaugeApi = {
  async getLangauges(): Promise<Language[]> { 
    const url = 'language'; 
    return axiosClient.get(url); 
  },
};

export default langaugeApi;
