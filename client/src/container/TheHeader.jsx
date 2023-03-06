import { Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pathname from "../config/pathname";
import "../scss/header.scss";

const TheHeader = ({ userAvatar, user, socket }) => {
  const [noti, setNoti] = useState([""]);
  const navigate = useNavigate();

  const handleCheckNotification = () => {
    console.log("check");
  };
  return (
    <div className="header">
      <div className="avatar" onClick={() => navigate(pathname.profile)}>
        <img
          src={`${process.env.REACT_APP_IMAGE}/${userAvatar}`}
          alt="avatar"
        />
      </div>

      <div className="icon" onClick={() => navigate(pathname.notification)}>
        <Badge count={9} offset={[-3, 5]} size="small">
          <span
            className="material-icons"
            style={{
              color: "var(--white)",
              fontSize: "30px",
              fontWeight: "300",
            }}
            onClick={handleCheckNotification}
          >
            notifications
          </span>
        </Badge>
      </div>
    </div>
  );
};

export default TheHeader;
