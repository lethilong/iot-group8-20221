import { message } from "antd";
import React, { useEffect, useState } from "react";
import working from "../assets/idea.png";
import House from "../components/House";
import "../scss/homeList.scss";
import { getAllHouses } from "../service/house";

const HomeList = () => {
  const [houses, setHouses] = useState([]);
  useEffect(() => {
    getAllHouses((res) => {
      if (res.data.success === true) {
        const houses = res.data.homes.map((home) => {
          return {
            ...home,
            value: home._id,
            label: home.name,
          };
        });
        setHouses(res.data.homes);
      } else {
        message.error("No home existed !");
      }
    });
  }, []);
  return (
    <div className="homeList">
      <div className="computer">
        <img src={working} alt="working" />
      </div>
      <div className="houses">
        {houses.map((house, index) => {
          return <House house={house} key={index} />;
        })}
      </div>
    </div>
  );
};

export default HomeList;
