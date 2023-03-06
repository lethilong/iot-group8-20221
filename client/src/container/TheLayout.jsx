import { Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import nav from "../nav";
import { getAllDeviceType } from "../redux/action/deviceType";
import { getAllHome } from "../redux/action/home";
import { getAllRoomType } from "../redux/action/roomType";
import routes from "../routes";
import "../scss/layout.scss";
import { getAllowedNav, getAllowedRoute } from "../service/auth";
import { getUserInfo } from "../service/user";
import TheContent from "./TheContent";
import TheHeader from "./TheHeader";
import TheNavbar from "./TheNavbar";

import io from "socket.io-client";

const TheLayout = () => {
  const role = "OWNER";
  const dispatch = useDispatch();
  let allowedNav, allowedRoute;
  const [userAvatar, setUserAvatar] = useState();
  const [socket, setSocket] = useState(null);
  const user = useSelector((state) => state.auth.data);

  useEffect(() => {
    !socket && setSocket(io("http://localhost:4000"));
  }, [socket]);

  useEffect(() => {
    if (socket) socket.emit("join", user.id);
  }, [socket, user]);

  useEffect(() => {
    if (socket) {
      socket.on("request", (res) => {
        console.log(res);
        message.info(res.message);
      });
      socket.on("notification", (res) => {
        console.log(res);
        message.info(res.content);
      });
    }
  }, [socket]);

  if (user) {
    allowedRoute = getAllowedRoute(routes, role);
    allowedNav = getAllowedNav(nav, role);
    dispatch(getAllRoomType());
    dispatch(getAllHome());
    dispatch(getAllDeviceType());
  } else {
    window.location.href = "/login";
  }

  useEffect(() => {
    getUserInfo((res) => {
      if (res.data.success === true) {
        setUserAvatar(res.data.user.avatar);
      } else {
        message.error("Upload image failed !");
      }
    });
  }, []);

  return (
    <Layout>
      <Layout>
        <TheHeader userAvatar={userAvatar} user={user.data} />
        <TheContent menu={allowedRoute} socket={socket}/>
        <TheNavbar menu={allowedNav} />
      </Layout>
    </Layout>
  );
};

export default TheLayout;
