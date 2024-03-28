import axios from "axios";
export const baseURL = "http://localhost:5000/";
export const useAxios = axios.create({
  baseURL: `${baseURL}api/v1`,
  withCredentials: true,
});
