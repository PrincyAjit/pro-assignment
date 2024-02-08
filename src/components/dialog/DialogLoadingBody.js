import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

import { CircularProgress } from '@mui/material';

import { messages } from '../../utils/constants';

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
  },
  loading: {
    marginBottom: '12px',
  },
}));

/**
 * @component - Common dialog loading body component.
 */
const DialogLoadingBody = () => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <CircularProgress className={classes.loading} />
        <div>{messages.ACTION_IN_PROGRESS}</div>
      </div>
    </div>
  );
};

export default DialogLoadingBody;
