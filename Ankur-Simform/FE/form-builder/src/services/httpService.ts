import axios from "axios";
import { BACKEND_API_URL } from "../constants/api";

const request = axios.create({
  baseURL: BACKEND_API_URL,
});

export default request;
