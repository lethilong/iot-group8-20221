import { createSlice } from "@reduxjs/toolkit";
import { getAllDeviceType } from "../action/deviceType";

const initialState = {
  data: null,
};

const deviceTypeSlice = createSlice({
  name: "deviceType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllDeviceType.pending, (state) => {});
    builder.addCase(getAllDeviceType.fulfilled, (state, action) => {
      const types = action.payload.data.deviceTypes.map((type) => {
        return {
          value: type._id,
          label: type.name,
        };
      });
      state.data = types;
    });

    builder.addCase(getAllDeviceType.rejected, (state, action) => {
      state.data = null;
    });
  },
});

const { reducer, actions } = deviceTypeSlice;

export default deviceTypeSlice.reducer;
