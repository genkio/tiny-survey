import axios from "axios";

const axiosApiInstance = axios.create();

/**
 * Expose API custom error messages instead of generic http status code + message
 */
axiosApiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    return Promise.reject(error.response?.data?.messages ?? [error.message]);
  }
);

export default axiosApiInstance;
