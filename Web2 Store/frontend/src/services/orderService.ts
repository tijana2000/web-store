import baseUrl from "../config.json";
import axios from "axios";
import headerService from "../services/headerService";
import { CancelOrder, MakeOrder } from "../models/oreder";




const orederService = {
  createOredr: async (newOrder: MakeOrder) => {
    try {
      const response = await axios.post(`${baseUrl.serverUrl}/api/order/create`, newOrder,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getActive: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/order/active/`+ id, headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 

  getHistory: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/order/history/`+ id, headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getAllOrders: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/order/all`, headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  cancel: async (cancelation: CancelOrder) => {
    try {
      const response = await axios.patch(`${baseUrl.serverUrl}/api/order/cancel`,cancelation ,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  
  
};

export default orederService;
