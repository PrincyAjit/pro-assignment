// #region Library imports
import PropTypes from 'prop-types';
import React from 'react';

import { createUseStyles } from 'react-jss';
// #endregion Library imports

// #region Styling
const useStyles = createUseStyles((theme) => ({
  labelRoot: {
    fontFamily: 'Montserrat',
    fontSize: '12px',
    fontWeight: 600,
    textTransform: 'uppercase',
    marginBottom: '12px',
  },
}));
// #endregion Styling

const CustomLabel = ({ label }) => {
  const classes = useStyles();

  return <div className={classes.labelRoot}>{label}</div>;
};

CustomLabel.propTypes = {
  label: PropTypes.any,
};

export default CustomLabel;
