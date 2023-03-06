import { AxiosConfig } from "../config/axiosConfig";

export const getAllHouses = (callback) => {
  const axios = AxiosConfig();
  let api = `/homes`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const createHouse = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/homes`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const updateHouse = (data, callback) => {
  const axios = AxiosConfig();
  let api = `/homes`;

  axios
    .post(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const getHouseInformation = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/homes/${id}`;

  axios
    .get(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const deleteHouse = (id, callback) => {
  const axios = AxiosConfig();
  let api = `/homes/${id}`;

  axios
    .delete(api)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const inviteMember = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/homes/${id}/invite-member`;

  axios
    .patch(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};

export const removeMember = (id, data, callback) => {
  const axios = AxiosConfig();
  let api = `/homes/${id}/remove-member`;

  axios
    .patch(api, data)
    .then((res) => {
      callback(res.data);
    })
    .catch((err) => {
      callback(err.response.data);
    });
};
