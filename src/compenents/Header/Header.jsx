import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import HeaderMobile from "./components/HeaderMobile";

export default function Header() {
  const { user } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
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
              <div className={`${styles.burgerMenu}`}>
                <NavLink className={`mr-20 `} to="/regledujeu">
                  Règle du jeu
                </NavLink>
                <NavLink to="/logout" className={`mr-5`}>
                  Logout
                </NavLink>
              </div>
              <i
                onClick={() => setShowMenu(true)}
                className={`fas fa-bars mr-10 ${styles.mobileHeader}`}
              ></i>
            </>
          ) : (
            <>
              <div className={`${styles.burgerMenu}`}>
                <NavLink to="/register" className="mr-15">
                  Register
                </NavLink>
                <NavLink to="/login">Login</NavLink>
              </div>
              <i
                onClick={() => setShowMenu(true)}
                className={`fas fa-bars mr-10 ${styles.mobileHeader}`}
              ></i>
            </>
          )}
          {showMenu && (
            <>
              <div onClick={() => setShowMenu(false)} className="calc"></div>
              <HeaderMobile setShowMenu={setShowMenu} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
