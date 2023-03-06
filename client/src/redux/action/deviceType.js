import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../config/axiosConfig";

export const getAllDeviceType = createAsyncThunk(`deviceType/all`, async () => {
  try {
    const axios = AxiosConfig();
    let api = "/devices/device-types";
    const res = await axios.get(api);
    return res.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    } else {
      return error.message;
    }
  }
});
