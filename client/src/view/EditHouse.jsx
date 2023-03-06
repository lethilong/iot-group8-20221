import { Form, Select, Button, Space, message, Tag, Modal, Input } from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import "../scss/editHouse.scss";
import { permissionList } from "../config/permission";
import houses from "../config/houses";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getHouseInformation,
  inviteMember,
  removeMember,
} from "../service/house";

const EditHouse = () => {
  const houseId = useLocation().pathname.split("/")[2];
  const [form] = Form.useForm();
  const [formAddMember] = Form.useForm();
  const [house, setHouse] = useState({});
  //const house = houses[0];
  useEffect(() => {
    getHouseInformation(houseId, (res) => {
      if (res.data.success === true) {
        setHouse(res.data.home);
        form.setFieldsValue(res.data.home);
      } else {
        message.error(res.data.message);
      }
    });
  }, []);
  console.log(house);
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishAddMembers = () => {
    console.log(formAddMember.getFieldValue());
    inviteMember(houseId, formAddMember.getFieldValue(), (res) => {
      if (res.data.success === true) {
        message.success("Invite successful !");
      } else {
        message.error(res.data.message);
      }
    });
  };
  const handleAddMember = () => {
    Modal.confirm({
      width: "1000px",
      title: `Add new member ?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form
            form={formAddMember}
            onFinish={onFinishAddMembers}
            layout="vertical"
          >
            <Form.Item label="User phone" name={"phone"}>
              <Input placeholder="User phone" />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishAddMembers();
      },
      onCancel() {},
      centered: true,
    });
  };

  const onFinishRemoveMembers = (remove, name, member) => {
    removeMember(house._id, { id: member._id }, (res) => {
      if (res.data.success === true) {
        message.success("Remove member successful !");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    });
  };
  const handleRemoveMember = (remove, name) => {
    Modal.confirm({
      width: "1000px",
      title: `Are you sure to remove this member ?`,
      icon: <ExclamationCircleOutlined />,

      onOk() {
        onFinishRemoveMembers(remove, name, house.members[name]);
      },
      onCancel() {},
      centered: true,
    });
  };
  return (
    <div className="edit-house">
      <div className="container">
        <div
          className="permission"
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "90%",
          }}
        >
          <Tag color={house.isHost ? "green" : "red"}>
            {house.isHost ? "OWNER" : "MEMBER"}
          </Tag>
        </div>

        <div className="form-edit">
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              label="House name"
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
              label="House address"
              rules={[
                {
                  required: true,
                },
              ]}
              name="address"
            >
              <input placeholder="House address" />
            </Form.Item>

            <div className="site">Members</div>
            <Form.List name="members">
              {(fields, { remove }) => (
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
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
                          <input placeholder="Member phone" disabled={true} />
                        </Form.Item>
                        <span
                          className="material-icons"
                          style={{
                            color: "var(--white)",
                            fontSize: "30px",
                            fontWeight: "300",
                            cursor: "pointer",
                          }}
                          onClick={() => handleRemoveMember(remove, name)}
                        >
                          delete
                        </span>
                      </div>
                    </Space>
                  ))}
                </>
              )}
            </Form.List>
            <div className="site">Requested members</div>
            {house.requests?.map((request) => {
              return (
                <div style={{ width: "100%", color: "white" }}>
                  {request.to.name} - {request.to.phone}
                </div>
              );
            })}
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Form.Item>
                <button
                  htmltype="submit"
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "var(--blue)",
                    border: "none",
                    color: "var(--white)",
                  }}
                >
                  Update
                </button>
              </Form.Item>
              <Form.Item>
                <button
                  onClick={handleAddMember}
                  style={{
                    width: "100px",
                    height: "30px",
                    borderRadius: "5px",
                    background: "var(--yellow)",
                    border: "none",
                    color: "var(--white)",
                  }}
                >
                  Add member
                </button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditHouse;
