// GameSocketProvider.js
import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { GameSocketContext } from "../context/GameSocketContext";

export default function GameSocketProvider({ children }) {
  const { socket } = useContext(SocketContext);
  // const { fetchGame, currentGame } = useContext(GameContext);
  const [currentGame, setCurrentGame] = useState("null");

  useEffect(() => {
    const handleGameUpdate = (game) => {
      fetchGame(game._id); // Mettez à jour le jeu avec les nouvelles données
    };

    if (socket) {
      socket.on("gameUpdate", setCurrentGame);
    }

    return () => {
      if (socket) {
        socket.off("gameUpdate", setCurrentGame);
      }
    };
  }, [socket]);

  return (
    <GameSocketContext.Provider value={{ currentGame }}>
      {children}
    </GameSocketContext.Provider>
  );
}
