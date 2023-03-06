import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Form, Input, message, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import light from "../assets/light.png";
import Device from "../components/Devices";
import Rooms from "../components/Rooms";
import home1, { home } from "../config/data";
import pathname from "../config/pathname";
import "../scss/home.scss";
import { getAllHouses, getHouseInformation } from "../service/house";
import { getRoomDetail } from "../service/room";
import { createRoomType, getAllRoomTypes } from "../service/roomType";

const Home = ({ socket }) => {
  const [houses, setHouses] = useState([]);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);
  const [nav, setNav] = useState(0);
  const [houseId, setHouseId] = useState();
  const [house, setHouse] = useState({});
  const [showDevice, setShowDevice] = useState(-1);
  const [roomNum, setRoomNum] = useState();
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [roomDetail, setRoomDetail] = useState([]);
  const [reload, setReload] = useState(true);
  useEffect(() => {
    getAllRoomTypes((res) => {
      if (res.data.success === true) {
        const types = res.data.roomTypes.map((type) => {
          return {
            label: type.name,
            value: type._id,
          };
        });
        setRoomTypes(types);
      } else {
        message.error("Cannot get room types !");
      }
    });
    getAllHouses((res) => {
      if (res.data.success === true) {
        const houses = res.data.homes.map((home) => {
          return {
            ...home,
            value: home._id,
            label: home.name,
          };
        });
        setHouseId(houses[0]._id);
        setHouses(houses);
      } else {
        message.error("No home existed !");
      }
    });
  }, []);

  useEffect(() => {
    houseId &&
      getHouseInformation(houseId, (res) => {
        if (res.data.success === true) {
          const rooms = [];
          let roomNum = 0;
          res.data.home.roomTypes.map((room) => {
            roomNum += room.rooms.length;
            rooms.push(room);
          });
          setRoomNum(roomNum);
          setRooms(rooms);
          setRoom(rooms[nav]);
          setHouse(res.data.home);
        } else {
        }
      });
  }, [houseId, reload]);

  useEffect(() => {
    rooms && setRoom(rooms[nav]);
  }, [nav]);

  useEffect(() => {
    showDevice !== -1 &&
      getRoomDetail(room.rooms[showDevice]._id, (res) => {
        if (res.data.success === true) {
          setRoomDetail(res.data.room);
        } else {
          message.error("No room existed !");
        }
      });
  }, [showDevice, reload]);

  const onChange = (key) => {
    console.log(key);
  };

  const changeNav = (index) => {
    setNav(index);
    setShowDevice(-1);
  };

  const handleChangeHouse = (value) => {
    setHouseId(value);
  };

  const handleEditHouse = () => {
    navigate(`${pathname.homeList}/${houseId}`);
  };

  const onFinishCreateRoomType = () => {
    console.log(form.getFieldValue());
    createRoomType(form.getFieldValue(), (res) => {
      if (res.data.success === true) {
        message.success("Create room type successful !");
        window.location.reload();
      } else {
        message.error(res.data.message);
      }
    });
  };

  console.log(house);

  const handleCreateNewRoomType = () => {
    Modal.confirm({
      width: "1000px",
      title: `Create new room type ?`,
      icon: <ExclamationCircleOutlined />,
      content: (
        <>
          <Form form={form} onFinish={onFinishCreateRoomType} layout="vertical">
            <Form.Item label="Room type name" name={"name"}>
              <Input placeholder={"Room type"} />
            </Form.Item>
          </Form>
        </>
      ),
      onOk() {
        onFinishCreateRoomType();
      },
      onCancel() {},
      centered: true,
    });
  };

  return (
    <div className="home">
      <div className="container">
        <div className="select-home">
          <Select
            defaultValue={houses[0]}
            placeholder={"Choose house"}
            options={houses ? houses : []}
            style={{ marginBottom: "10px" }}
            onChange={handleChangeHouse}
          />
        </div>
        <div className="upper-board">
          <div className="script">
            <div className="name">{house?.name}</div>
            <div className="address">{house?.address}</div>
            <div className="members">
              <p style={{ fontWeight: "bold" }}>Members:&nbsp;</p>
              {house?.members &&
                house.members.map((member, index) => {
                  if (index === house?.members.length - 1) {
                    return <span key={index}>{member.name}</span>;
                  } else {
                    return <span key={index}> {member.name},</span>;
                  }
                })}
            </div>
            <div className="room">
              {roomNum} <span>Rooms</span>
            </div>
          </div>
          <div className="image">
            <img src={light} alt="light" />
            {house.isHost === true && (
              <button onClick={handleEditHouse}>Edit</button>
            )}
          </div>
        </div>
        <div className="down-board">
          <div className="rooms-manager">
            <div className="navigate">
              {rooms.map((room, index) => {
                return (
                  <div
                    className="nav"
                    onClick={() => changeNav(index)}
                    key={index}
                  >
                    <p>{room.name}</p>
                    {nav === index && (
                      <div className="dot">
                        <p></p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="add-room" onClick={handleCreateNewRoomType}>
              <span
                className="material-symbols-rounded"
                style={{ fontSize: "25px", color: "white" }}
              >
                add
              </span>
            </div>
          </div>

          <div className="devices">
            {showDevice !== -1 ? (
              <Device
                socket={socket}
                role={house.isHost}
                reload={reload}
                setReload={setReload}
                setRoomDetail={setRoomDetail}
                roomDetail={roomDetail}
                setShowDevice={setShowDevice}
                roomName={roomDetail.name}
              />
            ) : (
              <Rooms
                role={house.isHost}
                reload={reload}
                setReload={setReload}
                houseId={houseId}
                types={roomTypes}
                nav={nav}
                house={room}
                showDevice={showDevice}
                setShowDevice={setShowDevice}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

//return <Device room={room.devices} key={index} />;
