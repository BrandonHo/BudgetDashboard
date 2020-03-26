import React from 'react';
import '../../node_modules/bulma/css/bulma.css';
import '../App.css';
import IconButton from '../../node_modules/@material-ui/core/IconButton';
import GithubIcon from '../../node_modules/@material-ui/icons/GitHub';
import LinkedinIcon from '../../node_modules/@material-ui/icons/LinkedIn';
import { makeStyles } from '../../node_modules/@material-ui/core/styles';

const customIconButtonStyle = makeStyles(() => ({
  customHoverFocus: {
    '&:hover, &.Mui-focusVisible': { backgroundColor: 'white' },
  },
}));

const NavBar = (props) => {
  const iconButtonStyle = customIconButtonStyle();

  return (
    <nav
      className="navbar is-spaced has-background-black-ter has-text-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div className="navbar-item is-size-5 has-text-weight-semibold has-text-light">
          Budget Dashboard
        </div>
        <div className="navbar-item is-size-5 has-text-grey is-left-paddingless">
          by Brandon Ho
        </div>
      </div>

      <div className="navbar-end" aria-label="selector" aria-expanded="false">
        {/* eslint-disable */}
        <a
          id="btn-income"
          className="navbar-item has-text-grey"
          href="#"
          onClick={() => props.onClickEvent("yrdy")}
        >
          Incomes
        </a>
        <a id="btn-expenses" className="navbar-item has-text-grey" href="#">
          Expenses
        </a>
        <a id="btn-gross" className="navbar-item has-text-grey" href="#">
          Gross
        </a>
        {/* eslint-enable */}
      </div>

      <div className="navbar-end" aria-label="menu" aria-expanded="false">
        <IconButton
          className={iconButtonStyle.customHoverFocus}
          href="https://github.com/BrandonHo"
          size="medium"
          color="inherit"
        >
          <GithubIcon />
        </IconButton>
        <IconButton
          className={iconButtonStyle.customHoverFocus}
          href="https://www.linkedin.com/in/brandon-ho-za/"
          size="medium"
          color="inherit"
        >
          <LinkedinIcon />
        </IconButton>
      </div>
    </nav>
  );
};

export default NavBar;
