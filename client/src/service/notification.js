import { AxiosConfig } from "../config/axiosConfig";

export const getAllNotifications = (callback) => {
  const axios = AxiosConfig();
  let api = `/notifications`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getAllRequest = (callback) => {
  const axios = AxiosConfig();
  let api = `/request-member`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const responseRequest = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/request-member/${id}`;

  axios
    .patch(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const readNoti = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/notifications/${id}/read`;

  axios
    .patch(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
