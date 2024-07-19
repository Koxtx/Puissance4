const BASE_URL = "http://localhost:5000/api/games";

export async function getGameStatus(gameId) {
  console.log(`Fetching game status for gameId: ${gameId}`);
  try {
    const response = await fetch(`${BASE_URL}/status/${gameId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const game = await response.json();
    console.log("Game status fetched:", game);
    return game;
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
}

export async function joinGame(playerId) {
  console.log(`Joining game with playerId: ${playerId}`);
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
    console.log("Game joined:", game);
    return game;
  } catch (error) {
    console.error("Error joining game:", error);
    throw error;
  }
}

export async function makeMove(gameId, row, col, playerId) {
  console.log(
    `Making move in gameId: ${gameId}, row: ${row}, col: ${col}, playerId: ${playerId}`
  );
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
    console.log("Move made:", game);
    return game;
  } catch (error) {
    console.error("Error making move:", error);
    throw error;
  }
}

export async function getGameHistory(user) {
  console.log(`Fetching game history for user: ${user}`);
  try {
    const response = await fetch(`${BASE_URL}/history/${user}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log("Game history fetched:", data);
    return data;
  } catch (error) {
    console.error("Error fetching game history:", error);
    throw error;
  }
}
