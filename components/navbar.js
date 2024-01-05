import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const { toggle, logoutHandler } = props;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid ps-0">
        <button
          type="button"
          id="sidebarCollapse"
          className="btn btn-default"
          onClick={toggle}
        >
          <FaBars className="text-danger" />
        </button>
        <a className="text-danger pointer" onClick={logoutHandler}>
          Logout
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
