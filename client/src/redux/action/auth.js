import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userLogin = createAsyncThunk(
  `user/login`,
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/login`, data);
      localStorage.setItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`,
        res.data.data.token
      );
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
