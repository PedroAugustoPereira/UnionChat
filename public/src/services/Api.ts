import axios from "axios";

const baseUrl = "http://localhost:8000/";
console.log(baseUrl);

const Api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export default Api;
