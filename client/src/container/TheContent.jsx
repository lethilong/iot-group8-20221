import React from "react";
import { Route, Routes } from "react-router-dom";
import "../scss/content.scss";

const TheContent = ({ menu, socket }) => {
  return (
    <div className="content">
      <Routes>
        {menu.map((route, index) => {
          return (
            <Route
              path={route.path}
              exact
              element={<route.component socket={socket}/>}
              key={index}
            />
          );
        })}
      </Routes>
    </div>
  );
};

export default TheContent;
