import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { uploadAvatar } from "../service/user";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const UploadImage = ({ imageUrl, setImageUrl }) => {
  useEffect(() => {}, [imageUrl]);

  const [loading, setLoading] = useState(false);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        imageUrl = url;
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const uploadImage = (options) => {
    const { onSuccess, onError, file, onProgress } = options;

    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData, (res) => {
      if (res.data.success === true) {
        setLoading(false);
        setImageUrl(res.data.avatar);
        message.success("Upload avatar successful !");
      } else {
        message.error("Upload avatar failed !");
      }
    });
  };
  return (
    <Upload
      accept="image/*"
      customRequest={uploadImage}
      onChange={handleChange}
      listType="picture-card"
      className="avatar-uploader"
      name="avatar"
      showUploadList={false}
      beforeUpload={beforeUpload}
    >
      {imageUrl ? (
        <img
          src={`${process.env.REACT_APP_IMAGE}/${imageUrl}`}
          alt="avatar"
          style={{
            width: "100%",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
