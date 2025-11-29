import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://localhost:4000/api/v1",   // your backend URL
    withCredentials: true,             // only if you use cookies
  
});

export default axiosClient;
