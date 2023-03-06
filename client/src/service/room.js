import { AxiosConfig } from "../config/axiosConfig";

export const createRoom = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/rooms`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getRoomDetail = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/rooms/${id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const deleteRoom = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/rooms/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
