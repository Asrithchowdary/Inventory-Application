import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9392/api",
});

export default API;