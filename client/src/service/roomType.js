import { AxiosConfig } from "../config/axiosConfig";

export const getAllRoomTypes = (callback) => {
  const axios = AxiosConfig();
  let api = `/rooms/room-types`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const createRoomType = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/rooms/room-types`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
