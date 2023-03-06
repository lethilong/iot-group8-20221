import { createSlice } from "@reduxjs/toolkit";
import { getAllHome } from "../action/home";
import { getAllRoomType } from "../action/roomType";

const initialState = {
  data: null,
};

const homeSlice = createSlice({
  name: "homes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllHome.pending, (state) => {});
    builder.addCase(getAllHome.fulfilled, (state, action) => {
      const houses = action.payload.data.homes.map((home) => {
        return {
          ...home,
          value: home._id,
          label: home.name,
        };
      });
      state.data = houses;
    });

    builder.addCase(getAllHome.rejected, (state, action) => {
      state.data = null;
    });
  },
});

const { reducer, actions } = homeSlice;

export default homeSlice.reducer;
