import React, { useEffect, useState } from "react";
import "../scss/notification.scss";
import { notifications, notiType, requests } from "../config/notifications";
import { Menu, message, Tag } from "antd";
import {
  getAllNotifications,
  getAllRequest,
  readNoti,
  responseRequest,
} from "../service/notification";

const Notification = () => {
  const items = [
    {
      label: "Notification",
      key: "notification",
    },
    {
      label: "Request",
      key: "request",
    },
  ];

  const [current, setCurrent] = useState("notification");
  const [isLoad, setIsLoad] = useState(true);
  const [notiList, setNotiList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  useEffect(() => {
    if (current === "notification") {
      getAllNotifications((res) => {
        if (res.data.success === true) {
          setNotiList(res.data.notifications);
        } else {
          message.error(res.data.message);
        }
      });
    } else {
      getAllRequest((res) => {
        if (res.data.success === true) {
          setRequestList(res.data.requests);
        } else {
          message.error(res.data.message);
        }
      });
    }
  }, [current, isLoad]);
  const onClick = (e) => {
    setCurrent(e.key);
  };

  const handleResponseRequest = (id, data) => {
    responseRequest(id, data, (res) => {
      if (res.data.success === true) {
        message("Send response successfully !");
      } else {
        message.error(res.data.message);
      }
    });
  };

  const handleReadNoti = (id) => {
    readNoti(id, (res) => {
      if (res.data.success === true) {
        message.success("Mark the notification as read !");
      } else {
        message.error(res.data.message);
      }
    });
  };

  return (
    <div className="notifications">
      <div className="container">
        <div className="menu">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
          />
        </div>

        {current === "notification" &&
          notiList.length !== 0 &&
          notiList.map((noti, index) => {
            return (
              <div
                className="noti"
                key={index}
                style={{
                  background: `${noti.isRead ? "transparent" : "white"}`,
                  color: `${noti.isRead ? "white" : "var(--blue)"}`,
                }}
              >
                <span
                  className="type"
                  style={{
                    background: `${
                      noti.type === notiType.WARNING
                        ? "red"
                        : noti.type === notiType.INFO
                        ? "var(--green)"
                        : "green"
                    }`,
                  }}
                >
                  {noti.type}{" "}
                </span>
                {noti.content}
                <p></p>
                {!noti.isRead && (
                  <div className="button">
                    <button
                      onClick={() => handleReadNoti(noti._id)}
                      style={{
                        border: "1px solid var(--blue)",
                        color: "var(--blue)",
                      }}
                    >
                      Read
                    </button>
                  </div>
                )}
              </div>
            );
          })}

        {current === "request" &&
          requestList.length !== 0 &&
          requestList.map((noti, index) => {
            return (
              <div
                className="noti"
                key={index}
                style={{
                  background: `${noti.isRead ? "transparent" : "white"}`,
                  color: `${noti.isRead ? "white" : "var(--blue)"}`,
                }}
              >
                <p>
                  {noti.from.name} invited you to become a member of{" "}
                  {noti.home.name}{" "}
                  <Tag
                    color={
                      noti.status === "Pending"
                        ? "var(--yellow)"
                        : noti.status === "Accepted"
                        ? "#1677ff"
                        : "var(--pink)"
                    }
                  >
                    {noti.status}
                  </Tag>
                </p>
                {noti.status === "Pending" && (
                  <div className="action">
                    <div
                      className="button"
                      onClick={() => {
                        handleResponseRequest(noti._id, { status: "Rejected" });
                      }}
                    >
                      <button
                        style={{
                          border: "1px solid var(--blue)",
                          color: "var(--blue)",
                        }}
                      >
                        Reject
                      </button>
                    </div>
                    <div
                      className="button"
                      onClick={() => {
                        handleResponseRequest(noti._id, { status: "Accepted" });
                      }}
                    >
                      <button
                        style={{ background: "var(--pink)", border: "none" }}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Notification;
