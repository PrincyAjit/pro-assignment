// #region Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
// #endregion Library imports

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

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <img src="/logo.png" alt="logo" className={classes.logo} />
    </div>
  );
};

Navbar.propTypes = {};

export default Navbar;
