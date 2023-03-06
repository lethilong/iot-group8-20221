import { AxiosConfig } from "../config/axiosConfig";

export const controlDevice = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/devices/${id}/control`;

  axios
    .patch(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getAllDeviceType = (callback) => {
  const axios = AxiosConfig();
  let api = `/devices/device-types`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const addDevice = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/devices`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const deleteDevice = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/devices/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
