import React, { useContext } from "react";
import AllUsersProviders from "../../Provider/AllUserProvider";
import { SocketContext } from "../../context/SocketContext";

export default function Joueurs({ user }) {
  const { selectJoueur } = useContext(AllUsersProviders);
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div onClick={() => selectJoueur(user)} className="d-flex flex-column">
      <div>
        <p>{user.username}</p>
        {isOnline && "✅"}
      </div>
    </div>
  );
}
