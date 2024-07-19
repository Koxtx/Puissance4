// GameSocketProvider.js
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { GameSocketContext } from "../context/GameSocketContext";

export default function GameSocketProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const [currentGame, setCurrentGame] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on("updateBoard", (game) => {
        setCurrentGame(game);
      });

      socket.on("gameOver", (game) => {
        setCurrentGame(game);
      });

      return () => {
        socket.off("updateBoard");
        socket.off("gameOver");
      };
    }
  }, [socket]);

  return (
    <GameSocketContext.Provider value={{ currentGame }}>
      {children}
    </GameSocketContext.Provider>
  );
}
