import axios from "axios";
export const api = axios.create({
  baseURL: "http://3.36.89.237:8000",
  timeout: 10000,
}); 