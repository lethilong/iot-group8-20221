import React from "react";
import "../scss/room.scss";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteRoom } from "../service/room.js";
import { message, Modal } from "antd";

const Room = ({
  room,
  showDevice,
  setShowDevice,
  id,
  role,
  reload,
  setReload,
}) => {
  const onFinishDeleteRoom = () => {
    deleteRoom(room._id, (res) => {
      if (res.data.success === true) {
        message.success("Delete room successful !");
        setReload(!reload);
      } else {
        message.error(res.data.message);
      }
    });
  };
  const handleDeleteRoom = () => {
    Modal.confirm({
      title: `Are you sure to delete this room ?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onFinishDeleteRoom();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div className="rooms">
      <div className="left">
        <div className="name">{room.name}</div>
        <div className="deviceNum">
          <span>{room?.devicesNum}</span> Devices
        </div>
      </div>
      <div className="right">
        {role && (
          <span className="material-symbols-rounded" onClick={handleDeleteRoom}>
            delete
          </span>
        )}
        <button
          onClick={() => {
            setShowDevice(id);
          }}
        >
          Detail
        </button>
      </div>
    </div>
  );
};

export default Room;
