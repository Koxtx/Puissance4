import React, { useContext } from "react";
import { AllUsersContext } from "../../context/AllUserContext";
import { SocketContext } from "../../context/SocketContext";
import styles from "./Joueur.module.scss";

export default function Joueurs({ user }) {
  const { selectJoueur } = useContext(AllUsersContext);
  const { onlineUsers } = useContext(SocketContext);
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div onClick={() => selectJoueur(user)} className={`${styles.div}`}>
      <div className={`${styles.pseudoContainer}`}>
        <p className={`${styles.pseudo}`}>{user.username}</p>
        {isOnline && "✅"}
      </div>
    </div>
  );
}
