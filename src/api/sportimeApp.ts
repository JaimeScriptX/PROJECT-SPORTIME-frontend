import axios, { AxiosRequestHeaders } from "axios";
import { getEnvVariables } from "../helpers";

const { VITE_API_URL } = getEnvVariables();

const sportimeApi = axios.create({
  baseURL: VITE_API_URL,
});

sportimeApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    } as AxiosRequestHeaders;
  }

  return config;
});

export default sportimeApi;
