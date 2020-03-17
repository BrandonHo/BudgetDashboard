import React from "react";
import "../../node_modules/bulma/css/bulma.css";

const NavBar = () => {
  return (
    <nav
      className="navbar has-shadow is-spaced has-background-dark"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item is-size-4 has-text-weight-semibold has-text-light">
          Data Dashboard
        </div>
      </div>

      {/* <div className="navbar-end" aria-label="menu" aria-expanded="false">
        <a
          id="btn-Sheet1"
          className="navbar-item is-active has-text-link"
          href="#"
          onClick={this.updateDashboard}
        >
          Sheet1
        </a>
      </div> */}
    </nav>
  );
};

export default NavBar;
