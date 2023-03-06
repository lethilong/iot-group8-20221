import React from "react";
import "../scss/register.scss";
import { Form, message } from "antd";
import { useNavigate } from "react-router-dom";
import pathname from "../config/pathname";
import { register } from "../service/user";

const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    register(values, (res) => {
      if (res.data.success === true) {
        message.success("Register successful !");
        navigate(pathname.login);
      } else {
        message.error(res.data.message);
      }
    });
  };
  return (
    <div className="register">
      <div className="logo">
        <p>Smart</p>
        <p>Life</p>
        <span>Sunflow</span>
      </div>
      <div className="form-register">
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
            name="name"
          >
            <input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
            name="phone"
          >
            <input placeholder="Enter your phone" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="password"
          >
            <input placeholder="Enter your password" type="password" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="rePassword"
          >
            <input placeholder="Confirm your password" type="password" />
          </Form.Item>
          <Form.Item>
            <button>Register</button>
          </Form.Item>
        </Form>
      </div>
      <div className="login-nav">
        <p>
          Already have an account?{" "}
          <span onClick={() => navigate(pathname.login)}>Login now</span>
        </p>
      </div>
    </div>
  );
};

export default Register;
