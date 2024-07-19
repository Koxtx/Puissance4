import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className={` ${styles.header}  `}>
      <div className={`d-flex flex-row flex-fill aic p-10  `}>
        <div className={`${styles.title}`}>
          <NavLink to="/">
            <h1 className="mr-15" to="/">
              Puissance4
            </h1>
          </NavLink>
        </div>
        <nav className={`d-flex flex-row  aic p-10 ${styles.nav} `}>
          {user ? (
            <>
              <NavLink to="/logout" className={`mr-5`}>
                Logout
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/register" className="mr-15">
                Register
              </NavLink>
              <NavLink to="/login">Login</NavLink>{" "}
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
