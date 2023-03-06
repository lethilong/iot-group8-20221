import { createSlice } from "@reduxjs/toolkit";
import { getAllRoomType } from "../action/roomType";

const initialState = {
  data: null,
};

const roomTypeSlice = createSlice({
  name: "roomType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllRoomType.pending, (state) => {});
    builder.addCase(getAllRoomType.fulfilled, (state, action) => {
      const types = action.payload.data.roomTypes.map((type) => {
        return {
          value: type._id,
          label: type.name,
        };
      });
      state.data = types;
    });

    builder.addCase(getAllRoomType.rejected, (state, action) => {
      state.data = null;
    });
  },
});

const { reducer, actions } = roomTypeSlice;

export default roomTypeSlice.reducer;
