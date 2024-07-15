import React from "react";
import style from "./Cell.module.scss";

export default function Cell({ value, onClick, isDropping }) {
  const getColorClass = () => {
    if (value === "R") return style.red;
    if (value === "Y") return style.yellow;
    return "";
  };

  return (
    <div
      className={`${style.cell} ${getColorClass()} ${
        isDropping ? style.dropping : ""
      }`}
      onClick={onClick}
    >
      {value}
    </div>
  );
}
