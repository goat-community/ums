import axios from "axios";

import { base_url } from "./base-url";

// function getLocalAccessToken(): string | null {
//   const accessToken = localStorage.getItem("access_token") || null;
//   return accessToken;
// }

export const instance = axios.create({
  baseURL: base_url(),
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // const token = getLocalAccessToken();
    // if (token && config.headers) {
    //   config.headers["Authorization"] = `bearer ${token}`;
    // }
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NzAzNjI4MTAsInN1YiI6IjE1Iiwic2NvcGVzIjpbXX0.Nw8DQom5l2kG0Ni3bmA5rt0AVnGw4-PYC7JU2oQCERs";
    config.headers["Authorization"] = `bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    // const originalConfig = err.config;
    if (err.response) {
      //   if (err.response.status === 401 && !originalConfig._retry) {
      //     // Delete current token and redirect user to login
      //     localStorage.removeItem("access_token");
      //     localStorage.removeItem("user_info");
      //     window.location.href = "/login";
      //   }
      //   if (err.response.status === 403 && err.response.data) {
      //     localStorage.removeItem("access_token");
      //     localStorage.removeItem("user_info");
      //     window.location.href = "/login";
      //   }
      return;
    }
    return Promise.reject(err);
  }
);
