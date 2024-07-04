import axios from "axios";
import Cookies from "js-cookie";

const getBaseURL = () => {
  return import.meta.env.VITE_API_BASE_URL;
};

// This creates an Axios instance with the base URL and enables sending credentials with requests.
const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  withCredentials: true,
});

/** 
 * This adds an interceptor to the Axios instance to:
    - Retrieve a token from cookies using js-cookie.
    - Attach the token to the Authorization header if it exists.
    - Handle any request errors.
 */

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
