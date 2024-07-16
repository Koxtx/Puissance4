import { useEffect, useState } from "react";
import { AllUsersContext } from "../context/AllUserContext";
import { getUsers } from "../apis/users";

export default function AllUsersProviders({ children }) {
  const [allUsers, setAllUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const updateAllUsers = async () => {
    const allUsersData = await getUsers();
    setAllUsers(allUsersData);
  };

  useEffect(() => {
    updateAllUsers();
  }, []);

  function selectJoueur(joueur) {
    setSelectedUser(joueur);
  }
  return (
    <AllUsersContext.Provider
      value={{ allUsers, updateAllUsers, selectJoueur, selectedUser }}
    >
      {children}
    </AllUsersContext.Provider>
  );
}
