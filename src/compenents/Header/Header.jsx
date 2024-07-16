import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink } from "react-router-dom";

export default function Header() {
  const { user } = useContext(UserContext);
  return (
    <header className={`d-flex flex-row flex-fill center  `}>
      <h1 className="mr-15" to="/">
        Puissance4
      </h1>

      {user ? (
        <NavLink to="/logout">Logout</NavLink>
      ) : (
        <>
          <NavLink to="/register" className="mr-15">
            Register
          </NavLink>
          <NavLink to="/login">Login</NavLink>{" "}
        </>
      )}
    </header>
  );
}
