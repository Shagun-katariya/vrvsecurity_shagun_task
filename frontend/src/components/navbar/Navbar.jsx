import React, {memo} from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Importing the separate CSS file

const Navbar = ({ activeLink, handleClick }) => {
  return (
    <header className="navbar-container">
      <div className="navbar-title">
        <h1>User and Role Management</h1>
      </div>
      <div className="navbar-buttons">
        <Link
          to="/users"
          onClick={() => handleClick("/users")}
          className={activeLink === "/users" ? "active" : ""}
          aria-current={activeLink === "/users" ? "page" : undefined}
        >
          Users
        </Link>
        <Link
          to="/roles"
          onClick={() => handleClick("/roles")}
          className={activeLink === "/roles" ? "active" : ""}
          aria-current={activeLink === "/roles" ? "page" : undefined}
        >
          Roles
        </Link>
      </div>
    </header>
  );
};

export default memo(Navbar);
