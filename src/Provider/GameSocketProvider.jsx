import React, { useContext, useEffect } from "react";
import { SocketContext } from "../context/SocketContext";
import { GamesContext } from "../context/GameContext";

export default function GameSocketProvider({ children }) {
  const { socket } = useContext(SocketContext);
  const { makeMove } = useContext(GamesContext);
  useEffect(() => {
    const handleMove = (newMove) => {
      makeMove(newMove);
    };
    if (socket) {
      socket.on("newMove", handleMove);
    }
    return () => {
      if (socket) {
        socket.off("newMove", handleMove);
      }
    };
  }, [socket, makeMove]);
  return (
    <GameSocketProvider.provider value={{}}>
      {children}
    </GameSocketProvider.provider>
  );
}
