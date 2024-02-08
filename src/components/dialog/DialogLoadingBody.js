// #region Imports
// #region Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { CircularProgress } from '@mui/material';
// #endregion Library imports

// #region utilities imports
import { messages } from '../../utils/constants';
// #endregion utilities imports
// #endregion Imports

// #region Styling
const useStyles = createUseStyles((theme) => ({
  body: {
    boxSizing: 'content-box',
    minWidth: '486px',
    padding: '48px 84px',
    textAlign: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    rowGap: '12px',
    marginBottom: '33px',
    fontSize: '24px',
  },
  loading: {
    marginBottom: '12px',
  },
}));
// #endregion Styling

/**
 * @component - Common dialog loading body component.
 */
const DialogLoadingBody = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <CircularProgress className={classes.loading} />
        <p>{messages.ACTION_IN_PROGRESS}</p>
      </div>
    </div>
  );
};

export default DialogLoadingBody;
