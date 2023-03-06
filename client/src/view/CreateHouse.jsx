import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, Space, Select, message } from "antd";
import { deviceList } from "../config/devices";
import { permissionList } from "../config/permission";
import React from "react";
import "../scss/createHouse.scss";
import { useSelector } from "react-redux";
import { createHouse, inviteMember } from "../service/house";
import pathname from "../config/pathname";
import { useNavigate } from "react-router-dom";
import { createRoom } from "../service/room";

const CreateHouse = () => {
  const roomType = useSelector((state) => state.roomType.data);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const home = {
      name: values.name,
      address: values.address,
    };
    const rooms = values.rooms;
    const members = values.members;
    console.log(home, rooms, members);
    createHouse(home, (res) => {
      if (res.data.success === true) {
        rooms.length !== 0 &&
          rooms.map((room) => {
            createRoom({ ...room, home: res.data.home._id }, (res) => {
              if (res.data.success !== true) {
                message.error(res.data.message);
              }
            });
          });
        members.length !== 0 &&
          members.map((member) => {
            inviteMember(res.data.home._id, member, (res) => {
              if (res.data.success !== true) {
                message.error(res.data.message);
              }
            });
          });
        message.success("Create house successful !");
        navigate(pathname.home);
      } else {
        message.error(res.data.message);
      }
    });
  };
  return (
    <div className="createHouse">
      <div className="container">
        <div className="form-create">
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
            >
              <input placeholder="House name" />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                },
              ]}
              name="address"
            >
              <input placeholder="House address" />
            </Form.Item>
            <div className="site">Rooms</div>
            <Form.List name="rooms">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <p style={{ color: "red" }}>Room number {key + 1}</p>
                      <Form.Item
                        {...restField}
                        name={[name, "type"]}
                        rules={[
                          {
                            required: true,
                            message: "This field is required !",
                          },
                        ]}
                      >
                        <Select
                          placeholder={"Choose room type"}
                          options={roomType}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "This field is required !",
                          },
                        ]}
                      >
                        <input placeholder="Room name" />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      style={{
                        background: "var(--white)",
                        border: "none",
                        color: "var(--dark-yellow)",
                      }}
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add room
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <div className="site">Members</div>
            <Form.List name="members">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginBottom: 8,
                      }}
                      align="baseline"
                    >
                      <p style={{ color: "red" }}>Member number {key + 1}</p>

                      <Form.Item
                        {...restField}
                        name={[name, "phone"]}
                        rules={[
                          {
                            required: true,
                            message: "This field is required !",
                          },
                        ]}
                      >
                        <input placeholder="Member's phone" />
                      </Form.Item>

                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      block
                      style={{
                        background: "var(--white)",
                        border: "none",
                        color: "var(--dark-yellow)",
                        right: 0,
                      }}
                      icon={<PlusOutlined />}
                    >
                      Add member
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <button
                htmltype="submit"
                style={{
                  width: "100px",
                  height: "30px",
                  borderRadius: "5px",
                  background: "var(--black)",
                  border: "none",
                  color: "var(--white)",
                }}
              >
                Create
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateHouse;
