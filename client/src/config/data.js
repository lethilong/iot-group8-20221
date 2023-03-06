import { Devices } from "./devices";
import { Rooms } from "./rooms";
const home1 = [
  {
    room: Rooms.BED_ROOM,
    devices: [
      {
        device: Devices.LIGHTING,
        brand: "Samsung",
        status: true,
      },
      {
        device: Devices.DOOR,
        brand: "Samsung",
        status: false,
      },
      {
        device: Devices.AIR_CONDITIONER,
        brand: "Samsung",
        status: true,
      },
    ],
  },
  {
    room: Rooms.BED_ROOM,
    devices: [
      {
        device: Devices.LIGHTING,
        brand: "Samsung",
        status: true,
      },
      {
        device: Devices.DOOR,
        brand: "Samsung",
        status: false,
      },
      {
        device: Devices.AIR_CONDITIONER,
        brand: "Samsung",
        status: true,
      },
    ],
  },
  {
    room: Rooms.LIVING_ROOM,
    devices: [
      {
        device: Devices.LIGHTING,
        brand: "Samsung",
        status: true,
      },
      {
        device: Devices.DOOR,
        brand: "Samsung",
        status: false,
      },
    ],
  },
  {
    room: Rooms.LIVING_ROOM,
    devices: [
      {
        device: Devices.LIGHTING,
        brand: "Samsung",
        status: true,
      },
      {
        device: Devices.DOOR,
        brand: "Samsung",
        status: false,
      },
    ],
  },
  {
    room: Rooms.KITCHEN,
    devices: [
      {
        device: Devices.LIGHTING,
        brand: "Samsung",
        status: true,
      },
      {
        device: Devices.DOOR,
        brand: "Samsung",
        status: false,
      },
      {
        device: Devices.CCTV,
        brand: "Samsung",
        status: false,
      },
      {
        device: Devices.HEATER,
        brand: "Samsung",
        status: false,
      },
      {
        device: Devices.SPEAKER,
        brand: "Samsung",
        status: true,
      },
    ],
  },
];

export default home1;

export const home = {
  name: "Rose house",
  address: "221B Baker Street, London, England",
  host: {
    _id: "123a",
    name: "Nhung hoang",
    phone: "0987654321",
  },
  roomTypes: [
    {
      id: "123b",
      type: {
        id: "123c",
        name: Rooms.BED_ROOM,
      },
      rooms: [
        {
          name: "Child bed room",
          devices: [
            {
              id: "123d",
              type: {
                id: "123e",
                name: Devices.LIGHTING,
              },
              name: "Love light",
              status: true,
            },
          ],
        },
        {
          name: "Child bed room",
          devices: [
            {
              id: "123d",
              type: {
                id: "123e",
                name: Devices.LIGHTING,
              },
              name: "Love light",
              status: true,
            },
          ],
        },
      ],
    },
    {
      id: "123b",
      type: {
        id: "123c",
        name: Rooms.LIVING_ROOM,
      },
      rooms: [
        {
          name: "Child bed room",
          devices: [
            {
              id: "123d",
              type: {
                id: "123e",
                name: Devices.LIGHTING,
              },
              name: "Love light",
              status: true,
            },
          ],
        },
        {
          name: "Child bed room",
          devices: [
            {
              id: "123d",
              type: {
                id: "123e",
                name: Devices.LIGHTING,
              },
              name: "Love light",
              status: true,
            },
          ],
        },
      ],
    },
  ],
};
