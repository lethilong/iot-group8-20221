import { message } from "antd";
import { Devices } from "./devices";
import { Rooms } from "./rooms";

export const notiType = {
  WARNING: "Warning",
  INFO: "INFO",
  STATISTIC: "STATISTIC",
};
export const notifications = [
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.WARNING,
      content: "Over heat !",
    },
  },
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.INFO,
      content: "Over heat !",
    },
  },
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.WARNING,
      content: "Over heat !",
    },
  },
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.WARNING,
      content: "Over heat !",
    },
  },
];

export const requests = [
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.WARNING,
      content: "Over heat !",
    },
  },
  {
    house: "Rose farm house",
    room: {
      type: Rooms.DINING_ROOM,
      name: "rosie night",
    },
    device: {
      type: Devices.AIR_CONDITIONER,
      name: "Samsung air conditioner",
    },
    message: {
      type: notiType.INFO,
      content: "Over heat !",
    },
  },
];
