import { Form, message } from "antd";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UploadImage from "../components/UploadImage";
import "../scss/editProfile.scss";
import { getUserInfo, updateUser } from "../service/user";

const EditProfile = () => {
  const [form] = Form.useForm();
  const [user, setUser] = useState({});
  const [imageUrl, setImageUrl] = useState("");

  const onFinish = (values) => {
    const data = {
      name: values.name,
    };
    updateUser(data, (res) => {
      if (res.data.success === true) {
        message.success("Update user successful !");
      } else {
        message.error("Upload image failed !");
      }
    });
  };

  useEffect(() => {
    getUserInfo((res) => {
      if (res.data.success === true) {
        setUser(res.data.user);
        setImageUrl(res.data.user.avatar);
        form.setFieldsValue(res.data.user);
      } else {
        message.error("Get user failed !");
      }
    });
  }, []);
  return (
    <div className="edit-profile">
      <div className="container">
        <div className="form-edit">
          <UploadImage imageUrl={imageUrl} setImageUrl={setImageUrl} />
          <Form onFinish={onFinish} form={form}>
            <Form.Item
              label={"User name"}
              rules={[
                {
                  required: true,
                },
              ]}
              name="name"
            >
              <input placeholder="User name" />
            </Form.Item>
            <Form.Item
              label={"Phone number"}
              rules={[
                {
                  required: true,
                },
              ]}
              name="phone"
            >
              <input disabled={true} placeholder="Phone number" />
            </Form.Item>
            <Form.Item
              label={"Email"}
              rules={[
                {
                  required: true,
                },
              ]}
              name="email"
            >
              <input disabled={true} placeholder="Email" />
            </Form.Item>
            <Form.Item>
              <button
                htmltype="submit"
                style={{
                  width: "100px",
                  height: "30px",
                  borderRadius: "5px",
                  background: "var(--yellow)",
                  border: "none",
                  color: "var(--white)",
                  marginTop: "15px",
                }}
              >
                Update
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
