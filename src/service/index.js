import axios from "axios";

const baseUrl = "https://randomuser.me/api/";

const service = {
  get: (endpoint, payload) => {
    const instance = axios.create({
      baseURL: baseUrl,
      params: payload
    });
  
    return instance.get(baseUrl + endpoint);
  },
};

export default service;