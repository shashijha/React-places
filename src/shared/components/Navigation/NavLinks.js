import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";

import "./NavLinks.css";

const NavLinks = () => {
  const auth = useContext(AuthContext);
  const { isLoggedIn, logout, userId } = auth;
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">All USERS</NavLink>
      </li>
      {isLoggedIn && (
        <React.Fragment>
          <li>
            <NavLink to={`/${userId}/places`}>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">ADD PLACE</NavLink>
          </li>
        </React.Fragment>
      )}
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">ATHENTICATE</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
