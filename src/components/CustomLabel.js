// #region Library imports
import React from 'react';
import PropTypes from 'prop-types';
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

const CustomLabel = (props) => {
  const classes = useStyles();
  const { label } = props;
  return <div className={classes.labelRoot}>{label}</div>;
};

CustomLabel.propTypes = {};

export default CustomLabel;
