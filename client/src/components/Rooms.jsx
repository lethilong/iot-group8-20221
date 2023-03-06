import { ExclamationCircleOutlined } from "@ant-design/icons";
import React from "react";
import { Row, Col, Modal, Form, Input, Select, message } from "antd";
import Room from "./Room";
import { rooms, roomTypeList } from "../config/rooms";
import { createRoom } from "../service/room";

const Rooms = ({
  types,
  houseId,
  house,
  nav,
  showDevice,
  setShowDevice,
  reload,
  setReload,
  role,
}) => {
  const [form] = Form.useForm();
  const room_list = house?.rooms?.map((room, index) => {
    return (
      <Col key={index} span={12}>
        <Room
          reload={reload}
          setReload={setReload}
          role={role}
          room={room}
          key={index}
          id={index}
          showDevice={showDevice}
          setShowDevice={setShowDevice}
        />
      </Col>
    );
  });

  const onFinishAddRooms = () => {
    const newRoom = {
      ...form.getFieldValue(),
      home: houseId,
    };
    console.log(newRoom);
    createRoom(newRoom, (res) => {
      if (res.data.success === true) {
        message.success("Create room successful !");
        setReload(!reload);
      } else {
        message.error(res.data.message);
      }
    });
  };

  const handleAddRooms = () => {
    Modal.confirm({
      width: "1000px",
      title: `Create new room ?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form form={form} onFinish={onFinishAddRooms} layout="vertical">
            <Form.Item label="Room type" name={"type"}>
              <Select placeholder={"Choose room type"} options={types} />
            </Form.Item>
            <Form.Item label="Room name" name={"name"}>
              <Input placeholder="Room name" />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishAddRooms();
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div>
      <Row>
        {room_list}
        {role && (
          <Col span={12}>
            <div className="device add" onClick={handleAddRooms}>
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "50px" }}
              >
                add
              </span>
            </div>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default Rooms;
