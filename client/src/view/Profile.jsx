import React, { useEffect, useState } from "react";
import "../scss/profile.scss";
import setting from "../assets/setting.png";
import { account } from "../config/account";
import { useNavigate } from "react-router-dom";
import pathname from "../config/pathname";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slice/auth";
import { getUserInfo } from "../service/user";
import { message } from "antd";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  useEffect(() => {
    getUserInfo((res) => {
      if (res.data.success === true) {
        setUser(res.data.user);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  const handleEditProfile = () => {
    navigate(pathname.editProfile);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <div className="profile">
      <div className="container">
        <div className="image">
          <img src={setting} alt="setting" />
        </div>
        <div className="profile-user">
          <div className="user-detail">
            <div className="name">{user.name}</div>
            <p>{user.phone}</p>
            <p>{user.email}</p>
          </div>
          <div className="edit" onClick={handleEditProfile}>
            <span class="material-symbols-rounded">edit_note</span>
          </div>
        </div>
        <div className="actions">
          <p style={{ marginBottom: "10px" }}>Your account</p>
          <div className="account-action-list">
            {account.map((acc, index) => {
              return (
                <div
                  className="action"
                  onClick={() => {
                    if (acc.name === "Logout") {
                      handleLogout();
                    } else {
                      navigate(acc.to);
                    }
                  }}
                >
                  <div className="icon">
                    <span
                      className="material-icons"
                      style={{
                        color: "var(--white)",
                        fontSize: "25px",
                      }}
                    >
                      {acc.icon}
                    </span>
                    <p>{acc.name}</p>
                  </div>

                  <span class="material-symbols-rounded">chevron_right</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
