import React, { useContext, useEffect, useState } from "react";
import Board from "../Board/Board";
import style from "./Homepage.module.scss";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { SocketContext } from "../../context/SocketContext";
import { GameSocketContext } from "../../context/GameSocketContext";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Assurez-vous que l'élément racine est correctement défini

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
  const [playerColor, setPlayerColor] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [players, setPlayers] = useState([]);

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

      socket.on("gameOver", ({ winner }) => {
        console.log("Game over:", winner);
        setWinner(winner);
      });

      socket.on(
        "gameResetForPlayer",
        ({ board, currentPlayer, playerColor }) => {
          setBoard(board);
          setIsRedNext(currentPlayer === "R");
          setPlayerColor(playerColor);
          setModalIsOpen(true);
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
    setBoard(initialBoard);
    setIsRedNext(true);
    setWinner(null);
    socket.emit("resetGameForPlayer", { playerColor });
    window.location.reload(); // Actualiser la page pour mettre à jour les victoires
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <main className={`${style.Homepage} mhFull`}>
      {user ? (
        <div className={`d-flex flex-row flex-fill center ${style.div1}`}>
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
          <div className="d-flex flex-column justify-content-center align-items-center">
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
      ) : (
        <div className={`${style.log}`}>
          <p>
            connectez-vous <Link to="/login">Login</Link> ou inscrivez-vous{" "}
            <Link to="/register">Register</Link>
          </p>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Player Color"
        className={style.Modal}
        overlayClassName={style.Overlay}
      >
        <h2>Vous êtes le joueur {playerColor === "R" ? "Rouge" : "Jaune"}</h2>
        <button onClick={closeModal} className={style.button}>
          OK
        </button>
      </Modal>
    </main>
  );
}
