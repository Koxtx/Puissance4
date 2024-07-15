import React, { useState } from "react";
import Board from "../Board/Board";
import style from "./Homepage.module.scss";

export default function Homepage() {
  const initialBoard = Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [droppingColumn, setDroppingColumn] = useState(null);
  const [droppingRow, setDroppingRow] = useState(null);

  const handleClick = (colIndex) => {
    if (winner) return; // Empêcher les clics après qu'un gagnant soit déclaré

    const newBoard = board.map((row) => row.slice());
    let rowIndex = null;
    for (let row = 5; row >= 0; row--) {
      if (!newBoard[row][colIndex]) {
        newBoard[row][colIndex] = isRedNext ? "R" : "Y";
        rowIndex = row;
        break;
      }
    }

    if (rowIndex !== null) {
      setDroppingColumn(colIndex);
      setDroppingRow(rowIndex);
      setTimeout(() => {
        setBoard(newBoard);
        setIsRedNext(!isRedNext);
        setDroppingColumn(null);
        setDroppingRow(null);

        const newWinner = checkWinner(newBoard);
        if (newWinner) {
          setWinner(newWinner);
        }
      }, 600); // Durée de l'animation
    }
  };

  const checkWinner = (board) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    const checkDirection = (row, col, dir) => {
      const player = board[row][col];
      if (!player) return null;

      for (let i = 1; i < 4; i++) {
        const newRow = row + dir[0] * i;
        const newCol = col + dir[1] * i;
        if (
          newRow < 0 ||
          newRow >= 6 ||
          newCol < 0 ||
          newCol >= 7 ||
          board[newRow][newCol] !== player
        ) {
          return null;
        }
      }
      return player;
    };

    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        for (let dir of directions) {
          const winner = checkDirection(row, col, dir);
          if (winner) return winner;
        }
      }
    }

    return null;
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsRedNext(true);
    setWinner(null);
  };

  return (
    <main className={`${style.Homepage} mhFull`}>
      <Board
        board={board}
        onClick={handleClick}
        droppingColumn={droppingColumn}
        droppingRow={droppingRow}
      />
      <div>
        {winner
          ? `Le gagnant est: ${winner}`
          : `Tour du joueur: ${isRedNext ? "Rouge" : "Jaune"}`}
      </div>
      {winner && (
        <button onClick={handleReset} className={`${style.button}`}>
          Réinitialiser le jeu
        </button>
      )}
    </main>
  );
}
