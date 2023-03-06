import auth from "./slice/auth";
import roomType from "./slice/roomType";
import home from "./slice/home";
import deviceType from "./slice/deviceType";
import { configureStore } from "@reduxjs/toolkit";
export const store = configureStore({
  reducer: {
    auth: auth,
    roomType: roomType,
    home: home,
    deviceType: deviceType,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
