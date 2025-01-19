import axios from "axios";

const axiosInstance = axios.create({
    baseURL: '/api/',  // Use the proxy path
    withCredentials: true,  // This allows sending cookies or credentials
    headers: {
        Accept: "application/json",
        "X-Requested-With": 'XMLHttpRequest',
        "Content-Type": 'multipart/form-data',
    },
});

export default axiosInstance;
