// api.js
const BASE_URL = "http://localhost:5000/api/games";

export async function getGame(gameId) {
  try {
    const response = await fetch(`${BASE_URL}/${gameId}`);
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

export async function createGame(player1Id, player2Id) {
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ player1Id, player2Id }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const newGame = await response.json();
    return newGame;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function updateGame(gameId, column) {
  try {
    const response = await fetch(`${BASE_URL}/${gameId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ column }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const updatedGame = await response.json();
    return updatedGame;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
}
