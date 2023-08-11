import baseUrl from "../config.json";
import axios from "axios";
import headerService from "../services/headerService";




const articleService = {
  createAricle: async (formData: FormData) => {
    try {
      const response = await axios.post(`${baseUrl.serverUrl}/api/article/create`, formData,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getCustomerArticles: async () => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/article/all`,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },
 
  getSalesmanArticles: async (id: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/article/salesman/`+id,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteArticle: async (articleId: number, salesmanId: number) => {
    try {
      const response = await axios.delete(`${baseUrl.serverUrl}/api/article/delete/`+articleId +"/"+salesmanId,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  updateArticle: async (formData: FormData) => {
    try {
      const response = await axios.patch(`${baseUrl.serverUrl}/api/article/update`,formData,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getArticle: async (articleId: number) => {
    try {
      const response = await axios.get(`${baseUrl.serverUrl}/api/article/detail/`+ articleId,headerService.getHttpHeaderWithToken());
      return response.data;
    } catch (error) {
      throw error;
    }
  },


 
 
  
};

export default articleService;
