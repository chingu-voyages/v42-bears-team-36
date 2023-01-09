import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  headers: {
    "Authorization": `Bearer ${Cookies.get("token")}`
}
});

export default axiosInstance;
