import { useState } from "react";
import { GameContext } from "../context/GameContext";
import { createGame, updateGame, getGame } from "../apis/games";

export default function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(null);

  async function startGame(player1Id, player2Id) {
    const newGame = await createGame(player1Id, player2Id);
    setCurrentGame(newGame);
  }

  async function makeMove(gameId, column) {
    const updatedGame = await updateGame(gameId, column);
    setCurrentGame(updatedGame);
  }

  async function fetchGame(gameId) {
    const game = await getGame(gameId);
    setCurrentGame(game);
  }

  return (
    <GameContext.Provider
      value={{
        currentGame,
        startGame,
        makeMove,
        fetchGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
