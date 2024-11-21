import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8300", // 设置基础URL
});
export default API;
