import { config } from "../../config/config";
import { adminLogout } from "../redux/adminSlice";
import { userLogout } from "../redux/slices";
import { store } from "../redux/store";
import axios from "axios";

const baseUrl = config.VITE_BaseUrl;

const CreateInstance = (baseURL, accessTokenKey, action, contentType) => {
  const instance = axios.create({
    baseURL,
    headers: { "Content-Type": contentType },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem(accessTokenKey);
      if (accessToken) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        try {
          const response = await instance.post('refresh');

          const { accessToken } = response.data;

          localStorage.setItem(accessTokenKey, accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        } catch (err) {
          store.dispatch(action());
          return Promise.reject(err);
        }
      }

      if (!error.response) {
        console.error("Network error or no response received:", error.message);
      } else {
        console.error("Error status:", error.response.status);
        console.error("Error data:", error.response.data);
      }

      return Promise.reject(error);
    }
  );
  return instance;
};

export const userInstance = CreateInstance(
  baseUrl,
  "userTokenKey",
  userLogout,
  "application/json"
);
export const adminInstance = CreateInstance(
  baseUrl,
  "adminTokenKey",
  adminLogout,
 "application/json"
);
