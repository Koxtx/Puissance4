import React, { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";
import style from "./Homepage.module.scss";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { AllUsersContext } from "../../context/AllUserContext";
import Joueurs from "../Joueurs/Joueurs";
import { SocketContext } from "../../context/SocketContext";
import { GameSocketContext } from "../../context/GameSocketContext";

export default function Homepage() {
  const { socket } = useContext(SocketContext);
  const { currentGame } = useContext(GameSocketContext);
  const { user } = useContext(UserContext);
  const { allUsers } = useContext(AllUsersContext);
  const initialBoard = Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [droppingColumn, setDroppingColumn] = useState(null);
  const [droppingRow, setDroppingRow] = useState(null);

  useEffect(() => {
    if (socket) {
      console.log("Joining game...");
      socket.emit("joinGame", { playerId: user._id });

      socket.on("updateBoard", ({ board, currentPlayer }) => {
        console.log("Board updated:", board);
        setBoard(board);
        setIsRedNext(currentPlayer === "R");
      });

      socket.on("gameOver", ({ winner }) => {
        console.log("Game over:", winner);
        setWinner(winner);
      });

      return () => {
        socket.off("updateBoard");
        socket.off("gameOver");
      };
    }
  }, [socket, user._id]);

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
      console.log(`Making move: row ${rowIndex}, col ${colIndex}`);
      setDroppingColumn(colIndex);
      setDroppingRow(rowIndex);
      setTimeout(() => {
        socket.emit("makeMove", {
          row: rowIndex,
          col: colIndex,
          playerId: user._id,
        });
        setDroppingColumn(null);
        setDroppingRow(null);
      }, 600); // Durée de l'animation
    }
  };

  const handleReset = () => {
    socket.emit("resetGame");
    setWinner(null);
  };
  return (
    <main className={`${style.Homepage} mhFull `}>
      {user ? (
        <div className={`d-flex flex-row flex-fill center ${style.div1} `}>
          <div className="d-flex flex-column-reverse flex-fill center m-5">
            <div className={`${style.board}`}>
              <Board
                board={board}
                onClick={handleClick}
                droppingColumn={droppingColumn}
                droppingRow={droppingRow}
              />
            </div>
            <div className={`${style.tour}`}>
              {winner ? (
                <>
                  {`Le gagnant est: ${winner}`}
                  <button onClick={handleReset} className={`${style.button}`}>
                    Réinitialiser le jeu
                  </button>
                </>
              ) : (
                `Tour du joueur: ${isRedNext ? "Rouge" : "Jaune"}`
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className={`${style.log}`}>
          <p>
            connectez-vous <Link to="/login">Login</Link> ou inscrivez-vous
            <Link to="/register">Register</Link>
          </p>
        </div>
      )}
    </main>
  );
}
