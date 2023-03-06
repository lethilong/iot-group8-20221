import Roles from "./config/roles";
import pathname from "./config/pathname";
import {
  Home,
  Notification,
  Profile,
  HomeList,
  CreateHouse,
  HouseData,
  EditHouse,
  EditProfile,
} from "./view";

const routes = [
  {
    path: pathname.home,
    exact: true,
    component: Home,
    name: "Home",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.notification,
    exact: true,
    component: Notification,
    name: "Notification",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.profile,
    exact: true,
    component: Profile,
    name: "Profile",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.homeList,
    exact: true,
    component: HomeList,
    name: "Home List",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.createHouse,
    exact: true,
    component: CreateHouse,
    name: "Create house",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.houseData,
    exact: true,
    component: HouseData,
    name: "House data",
    permission: [Roles.OWNER, Roles.GUEST],
  },
  {
    path: pathname.editHome,
    exact: true,
    component: EditHouse,
    name: "Edit house",
    permission: [Roles.OWNER],
  },
  {
    path: pathname.editProfile,
    exact: true,
    component: EditProfile,
    name: "Edit profile",
    permission: [Roles.OWNER],
  },
];

export default routes;
