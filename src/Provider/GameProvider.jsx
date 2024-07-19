import { useState } from "react";
import { GameContext } from "../context/GameContext";
import { joinGame, makeMove, getGameStatus } from "../apis/games";

export default function GameProvider({ children }) {
  const [currentGame, setCurrentGame] = useState(null);

  async function startGame(playerId) {
    const newGame = await joinGame(playerId);
    setCurrentGame(newGame);
  }

  async function makeMove(gameId, row, col, playerId) {
    const updatedGame = await makeMove(gameId, row, col, playerId);
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
