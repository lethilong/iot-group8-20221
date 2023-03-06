import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosConfig } from "../../config/axiosConfig";

export const getAllHome = createAsyncThunk(`home/all`, async () => {
  try {
    const axios = AxiosConfig();
    let api = "/homes";
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
