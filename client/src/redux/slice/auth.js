import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "../action/auth";

const initialState = {
  data:
    JSON.parse(
      localStorage.getItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`)
    ) || null,
  message: "",
  status: false,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.message = "Logout successful !";
      state.data = null;
      state.status = true;
      localStorage.removeItem(`${process.env.REACT_APP_PREFIX_LOCAL}_user`);
      localStorage.removeItem(
        `${process.env.REACT_APP_PREFIX_LOCAL}_access_token`
      );
      window.location.href = "/login";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state) => {});
    builder.addCase(userLogin.fulfilled, (state, action) => {
      const userData = {
        token: action.payload.data.token,
        id: action.payload.data.id,
      };
      state.data = userData;
      state.message = "Login successful !";
      state.status = true;
    });

    builder.addCase(userLogin.rejected, (state, action) => {
      state.data = null;
      state.message = "Login failed !";
      state.status = false;
    });
  },
});

const { reducer, actions } = authSlice;

export const { logout } = actions;

export default authSlice.reducer;
