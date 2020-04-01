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

const NavBar = () => {
  const iconButtonStyle = customIconButtonStyle();

  return (
    <nav
      className="navbar is-spaced is-fixed-top has-background-black-ter has-text-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand" aria-label="menu" aria-expanded="false">
        <div className="navbar-item is-size-5 has-text-weight-semibold has-text-light">
          Budget Dashboard
        </div>
        <div className="navbar-align-end">
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
      </div>


    </nav>
  );
};

export default NavBar;
