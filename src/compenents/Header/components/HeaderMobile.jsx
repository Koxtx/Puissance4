import React, { useContext } from "react";
import styles from "./HeaderMobile.module.scss";
import { UserContext } from "../../../context/UserContext";
import { NavLink } from "react-router-dom";

export default function HeaderMobile({ setShowMenu }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {user ? (
        <>
          <ul className={`p-20 d-flex flex-column ${styles.container}`}>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              className={`mr-5 `}
              to="/regledujeu"
            >
              Règle du jeu
            </NavLink>
            <NavLink
              to="/"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              Pussance 4
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/logout"
              className={`mr-15`}
            >
              Logout
            </NavLink>
          </ul>
        </>
      ) : (
        <>
          <ul className={`p-20 d-flex flex-column ${styles.container}`}>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/register"
              className="mr-15"
            >
              Register
            </NavLink>
            <NavLink
              onClick={() => {
                setShowMenu(false);
              }}
              to="/login"
            >
              Login
            </NavLink>
          </ul>
        </>
      )}
    </div>
  );
}
