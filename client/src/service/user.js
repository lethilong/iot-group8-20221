import axios from "axios";
import { AxiosConfig } from "../config/axiosConfig";

export function register(data, callback) {
  console.log(process.env.REACT_APP_API, data);
  axios
    .post(`${process.env.REACT_APP_API}/register`, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      if (err.response) {
        callback(err.response.data);
      }
    });
}

export const getUserInfo = (callback) => {
  const axios = AxiosConfig();
  let api = `/users/profile`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const updateUser = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/users/profile`;

  axios
    .patch(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const uploadAvatar = (image, callback) => {
  const axios = AxiosConfig();
  let api = `/users/upload/avatar`;

  axios
    .post(api, image)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
