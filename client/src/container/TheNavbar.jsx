import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../scss/navbar.scss";

const TheNavbar = ({ menu }) => {
  const navigate = useNavigate();
  const path = useLocation().pathname;

  return (
    <div className="navbar">
      {menu.map((icon, index) => {
        return (
          <div
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "53px",
              height: "53px",
              borderRadius: "50%",
              border: icon.to === path ? `2px solid ${icon.color}` : "",
            }}
          >
            <div
              key={index}
              style={{
                background: icon.color,
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => navigate(icon.to)}
            >
              <span
                className="material-symbols-rounded"
                style={{
                  color: "var(--white)",
                  fontSize: "37px",
                  fontWeight: "300",
                }}
              >
                {icon.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TheNavbar;
