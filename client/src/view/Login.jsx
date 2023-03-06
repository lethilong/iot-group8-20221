import { Form, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import searchGuy from "../assets/search-guy.png";
import { formItemLayout } from "../config/form";
import "../scss/login.scss";
import pathname from "../config/pathname";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/action/auth";
import { useEffect } from "react";
import { storeUserData } from "../service/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [form] = Form.useForm();
  const onFinish = (values) => {
    dispatch(userLogin(values));
  };
  useEffect(() => {
    if (user.status === false)
      user.message !== "" && message.error(user.message);
    else user.message !== "" && message.success(user.message);
    if (user.data) {
      storeUserData(user.data);
      navigate(pathname.home);
    }
  }, [user]);
  return (
    <div className="login">
      <div className="logo">
        <p>Smart</p>
        <p>Life</p>
        <div className="image">
          <span>Sunflow</span>
          <img src={searchGuy} alt="search-guy" />
        </div>
      </div>
      <div className="form-login">
        <Form form={form} {...formItemLayout} onFinish={onFinish}>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
            name="phone"
          >
            <input placeholder="Enter your phone number" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            labelAlign="left"
            name="password"
          >
            <input placeholder="Enter your password" type="password" />
          </Form.Item>
          <Form.Item>
            <button type="submit" onClick={onFinish}>
              Login
            </button>
          </Form.Item>
        </Form>
      </div>
      <div className="register-nav">
        <p>
          Haven't had an account?{" "}
          <span onClick={() => navigate(pathname.register)}>Register here</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
