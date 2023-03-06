import React from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { message, Modal, Tag } from "antd";
import Roles from "../config/roles";
import { useNavigate } from "react-router-dom";
import pathname from "../config/pathname";
import { deleteHouse } from "../service/house";

const House = ({ house }) => {
  const navigate = useNavigate();
  const handleEditHouse = () => {
    navigate(`${pathname.homeList}/${house._id}`);
  };
  const onFinishDeleteHouse = () => {
    deleteHouse(house._id, (res) => {
      if (res.data.success === true) {
        message.success("Delete house successful");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    });
  };
  const handleDeleteHouse = () => {
    Modal.confirm({
      title: `Are you sure to delete this house ?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onFinishDeleteHouse();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div className="house">
      <div className="name">{house.name}</div>
      <p>{house.address}</p>
      <div className="members">
        <div>
          Members: {house.members.length}
          {`(
          ${house.members.map((member, index) => {
            if (index > 3) {
              if (index === house.members.length - 1) {
                return "...";
              }
              return "";
            }
            if (index === house.members.length - 1) {
              return `${member.name}`;
            }
            return ` ${member.name}`;
          })}
          )`}
        </div>
        <div className="action">
          <div className="role">
            {house.isHost === true && <Tag color="var(--purple)">Owner</Tag>}
            {house.isHost === false && <Tag color="var(--black)">Member</Tag>}
          </div>
          {house.isHost === true && (
            <>
              <div className="edit" onClick={handleEditHouse}>
                <button>Edit</button>
              </div>
              <div className="delete">
                <span
                  className="material-icons"
                  style={{
                    color: "var(--blue)",
                    fontSize: "30px",
                    fontWeight: "300",
                    cursor: "pointer",
                  }}
                  onClick={handleDeleteHouse}
                >
                  delete
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default House;
