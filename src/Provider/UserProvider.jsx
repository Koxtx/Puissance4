import { useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userStorage = JSON.parse(localStorage.getItem("user"));
    if (userStorage) {
      const { token, user } = userStorage;
      if (isTokenValid(token)) {
        setUser(user);
      } else {
        logoutConnectedUser();
      }
    }
  }, []);

  function logoutConnectedUser() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function setConnectedUser(userConnected) {
    setUser(userConnected);
  }

  function isTokenValid(token) {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    return decodedToken.exp * 1000 > new Date().getTime();
  }

  return (
    <UserContext.Provider
      value={{ user, setConnectedUser, logoutConnectedUser }}
    >
      {children}
    </UserContext.Provider>
  );
}
