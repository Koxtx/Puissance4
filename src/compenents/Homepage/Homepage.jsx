import React, { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";
import style from "./Homepage.module.scss";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { GameSocketContext } from "../../context/GameSocketContext";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function Homepage() {
  const { socket } = useContext(SocketContext);
  const { currentGame } = useContext(GameSocketContext);
  const { user } = useContext(UserContext);

  const initialBoard = Array(6)
    .fill(null)
    .map(() => Array(7).fill(null));
  const [board, setBoard] = useState(initialBoard);
  const [isRedNext, setIsRedNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [droppingColumn, setDroppingColumn] = useState(null);
  const [droppingRow, setDroppingRow] = useState(null);
  const [droppingColor, setDroppingColor] = useState(null);
  const [playerColor, setPlayerColor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [players, setPlayers] = useState([]);
  const [winningCells, setWinningCells] = useState([]);

  useEffect(() => {
    if (socket) {
      console.log("Joining game...");
      socket.emit("joinGame", { playerId: user._id, username: user.username });

      socket.on("updateBoard", ({ board, currentPlayer }) => {
        console.log("Board updated:", board);
        setBoard(board);
        setIsRedNext(currentPlayer === "R");
      });

      socket.on("playerAssignment", (color) => {
        setPlayerColor(color);
        setModalIsOpen(true);
      });

      socket.on("gameOver", ({ winner, winningCells }) => {
        console.log("Game over:", winner);
        setWinner(winner);
        setWinningCells(winningCells);
      });

      socket.on(
        "gameResetForPlayer",
        ({ board, currentPlayer, playerColor }) => {
          setBoard(board);
          setIsRedNext(currentPlayer === "R");
          setPlayerColor(playerColor);
          setModalIsOpen(true);
          setWinningCells([]);
        }
      );

      socket.on("updatePlayers", (players) => {
        setPlayers(players);
      });

      return () => {
        socket.off("updateBoard");
        socket.off("playerAssignment");
        socket.off("gameOver");
        socket.off("gameResetForPlayer");
        socket.off("updatePlayers");
      };
    }
  }, [socket, user._id]);

  const handleClick = (colIndex) => {
    if (winner) return;

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
      setDroppingColor(isRedNext ? "R" : "Y");

      setTimeout(() => {
        socket.emit("makeMove", {
          row: rowIndex,
          col: colIndex,
          playerId: user._id,
        });
        setDroppingColumn(null);
        setDroppingRow(null);
        setDroppingColor(null);
      }, 600); // Correspond à la durée de l'animation
    }
  };

  const handleReset = () => {
    setBoard(initialBoard);
    setIsRedNext(true);
    setWinner(null);
    setWinningCells([]);
    socket.emit("resetGameForPlayer", { playerColor });
    window.location.reload();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <main className={`${style.Homepage} `}>
      <div className={`d-flex flex-row-reverse center ${style.div1}`}>
        <div className={`d-flex flex-column-reverse flex-fill center  `}>
          <div className={style.board}>
            <Board
              board={board}
              onClick={handleClick}
              droppingColumn={droppingColumn}
              droppingRow={droppingRow}
              droppingColor={droppingColor}
              winningCells={winningCells}
            />
          </div>
          <div className={style.tour}>
            {winner ? (
              <>{`Le gagnant est: ${winner}`}</>
            ) : (
              `Tour du joueur: ${isRedNext ? "Rouge" : "Jaune"}`
            )}
          </div>
        </div>
        <div
          className={`d-flex flex-column justify-content-center align-items-center ${style.vs}`}
        >
          {players.length === 2 && (
            <>
              <h2>
                {players[0].username} {players[0].wins} vs {players[1].wins}{" "}
                {players[1].username}
              </h2>
            </>
          )}
        </div>
      </div>
      {winner ? (
        <div>
          <button onClick={handleReset} className={`${style.button} btn`}>
            Réinitialiser le jeu
          </button>
        </div>
      ) : null}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Player Color"
        className={style.Modal}
        overlayClassName={style.Overlay}
      >
        <h2>Vous êtes le joueur {playerColor === "R" ? "Rouge" : "Jaune"}</h2>
        <button onClick={closeModal} className={`btn ${style.buttonModal}`}>
          OK
        </button>
      </Modal>
    </main>
  );
}
