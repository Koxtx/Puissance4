const BASE_URL = "http://localhost:5000/api/games";

export async function getGameStatus(gameId) {
  try {
    const response = await fetch(`${BASE_URL}/status/${gameId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const game = await response.json();
    return game;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
}

export async function joinGame(playerId) {
  try {
    const response = await fetch(`${BASE_URL}/join`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ playerId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const game = await response.json();
    return game;
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
}

export async function makeMove(gameId, row, col, playerId) {
  try {
    const response = await fetch(`${BASE_URL}/move`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameId, row, col, playerId }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const game = await response.json();
    return game;
  } catch (error) {
    console.error("Error making move:", error);
    throw error;
  }
}
