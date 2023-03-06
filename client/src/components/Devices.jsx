import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Devices } from "../config/devices";
import { Col, Form, Input, message, Modal, Row, Select } from "antd";
import "../scss/devices.scss";
import {
  addDevice,
  controlDevice,
  deleteDevice,
  getAllDeviceType,
} from "../service/device";

const Device = ({
  roomDetail,
  setRoomDetail,
  setShowDevice,
  roomName,
  setReload,
  reload,
  role,
  socket
}) => {
  const [form] = Form.useForm();
  const [deviceList, setDeviceList] = useState([]);
  useEffect(() => {
    getAllDeviceType((res) => {
      if (res.data.success === true) {
        const list = res.data.deviceTypes.map((type) => {
          return {
            label: type.name,
            value: type._id,
          };
        });
        setDeviceList(list);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  useEffect(() => {
    if (socket) {
      socket.on("control", (res) => {
        console.log(res);
        setReload(!reload);
      });
    }
  }, [socket]);
  const handleToggleOnOff = (device) => {
    controlDevice(
      device._id,
      { status: device.control.status === "ON" ? "OFF" : "ON" },
      (res) => {
        setReload(!reload);
      }
    );
  };
  const handleDeleteDevice = (device) => {
    deleteDevice(device._id, (res) => {
      if (res.data.success === true) {
        setReload(!reload);
      } else {
        message.error(res.data.message);
      }
    });
  };

  const newRoom = roomDetail?.devices?.map((device, index) => {
    return (
      <Col key={index} span={12}>
        <div className="device">
          <div className="left">
            {device.type.name === Devices.LIGHTING && (
              <div className="funiture">
                <span className="material-symbols-rounded">lightbulb</span>
              </div>
            )}
            {device.type.name === Devices.TV && (
              <div className="funiture">
                <span className="material-symbols-rounded">tv</span>
              </div>
            )}
            {device.type.name === Devices.AIR_CONDITIONER && (
              <div className="funiture">
                <span className="material-symbols-rounded">air</span>
              </div>
            )}
            {device.type.name === Devices.SPEAKER && (
              <div className="funiture">
                <span className="material-symbols-rounded">speaker</span>
              </div>
            )}
            {device.type.name === Devices.HEATER && (
              <div className="funiture">
                <span className="material-symbols-rounded">
                  local_fire_department
                </span>
              </div>
            )}
            {device.type.name === Devices.DOOR && (
              <div className="funiture">
                <span className="material-symbols-rounded">lock</span>
              </div>
            )}
            {device.type.name === Devices.CCTV && (
              <div className="funiture">
                <span className="material-symbols-rounded">videocam</span>
              </div>
            )}

            <p>{device.name}</p>
            <div className="name">{device.brand}</div>
            <div
              style={{
                color: `${
                  device.control.status === "ON" ? "var(--green)" : "var(--red)"
                }`,
                fontWeight: 500,
              }}
            >
              {device.control.status}
            </div>
          </div>
          <div className="right">
            <div className="toogle" onClick={() => handleToggleOnOff(device)}>
              {device.control.status === "ON" ? (
                <span className="material-icons" style={{ fontSize: "35px" }}>
                  toggle_on
                </span>
              ) : (
                <span
                  className="material-symbols-rounded"
                  style={{ fontSize: "35px" }}
                >
                  toggle_off
                </span>
              )}
            </div>
            {role && (
              <span
                className="material-symbols-rounded"
                onClick={() => handleDeleteDevice(device)}
              >
                delete
              </span>
            )}
          </div>
        </div>
      </Col>
    );
  });

  const onFinishAddDevices = () => {
    const newDevice = {
      ...form.getFieldValue(),
      room: roomDetail.id,
    };
    addDevice(newDevice, (res) => {
      if (res.data.success === true) {
        setReload(!reload);
      } else {
        message.error(res.data.message);
      }
    });
  };
  const handleAddDevices = () => {
    Modal.confirm({
      width: "1000px",
      title: `Create new device ?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form form={form} onFinish={onFinishAddDevices} layout="vertical">
            <Form.Item label="Device type" name={"type"}>
              <Select placeholder={"Choose device type"} options={deviceList} />
            </Form.Item>
            <Form.Item label="Device ID" name={"_id"}>
              <Input placeholder="Device ID" />
            </Form.Item>
            <Form.Item label="Device name" name={"name"}>
              <Input placeholder="Device name" />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishAddDevices();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div className="devices">
      <div className="navi" onClick={() => setShowDevice(-1)}>
        <span
          className="material-symbols-rounded"
          style={{ color: "var(--white)" }}
        >
          close
        </span>
        <span className="roomName">{roomName}</span>
      </div>
      <Row>
        {newRoom}
        <Col span={12}>
          <div className="device add" onClick={handleAddDevices}>
            <span
              className="material-symbols-rounded"
              style={{ fontSize: "50px" }}
            >
              add
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Device;
