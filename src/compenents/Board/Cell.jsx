import React from "react";
import style from "./Cell.module.scss";

export default function Cell({
  value,
  onClick,
  isDropping,
  isWinning,
  droppingColor,
}) {
  const getColorClass = () => {
    if (value === "R") return style.red;
    if (value === "Y") return style.yellow;
    return "";
  };

  const getDroppingClass = () => {
    if (isDropping) {
      if (droppingColor === "R") return style["red-dropping"];
      if (droppingColor === "Y") return style["yellow-dropping"];
      return style.dropping;
    }
    return "";
  };

  return (
    <div
      className={`${style.cell} ${getColorClass()} ${
        isWinning ? style.winning : ""
      }`}
      onClick={onClick}
    >
      {isDropping && (
        <div className={`${style["piece-dropping"]} ${getDroppingClass()}`} />
      )}
      {value && !isDropping && <div className={style.piece} />}
    </div>
  );
}
