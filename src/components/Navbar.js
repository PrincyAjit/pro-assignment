// #region Library imports
import React from 'react';
import { createUseStyles } from 'react-jss';
// #endregion Library imports

import logo from '../images/logo.png';

// #region Styling
const useStyles = createUseStyles((theme) => ({
  container: {
    display: 'flex',
    minHeight: '56px',
    padding: '8px',
    borderBottom: `1px solid ${theme.palette.border.main}`,
  },
  logo: {
    width: '56px',
    height: '56px',
  },
}));
// #endregion Styling

const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src={logo} alt="logo" className={classes.logo} />
    </div>
  );
};

export default Navbar;
