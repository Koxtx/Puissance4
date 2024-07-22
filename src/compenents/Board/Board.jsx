import React from "react";
import style from "./Board.module.scss";
import Cell from "./Cell";

export default function Board({
  board,
  onClick,
  droppingColumn,
  droppingRow,
  droppingColor,
  winningCells = [],
}) {
  return (
    <div className={style.board}>
      {board &&
        board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => onClick(colIndex)}
              isDropping={
                droppingColumn === colIndex && droppingRow === rowIndex
              }
              droppingColor={droppingColor}
              isWinning={winningCells.some(
                ([winRow, winCol]) => winRow === rowIndex && winCol === colIndex
              )}
            />
          ))
        )}
    </div>
  );
}
