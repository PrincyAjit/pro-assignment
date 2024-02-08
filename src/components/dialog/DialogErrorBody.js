// #region Library imports
import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
// #endregion Library imports

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
    marginBottom: '33px',
  },
  errorIcon: {
    color: '#9b0000',
  },
  errorIconDiv: {
    width: '55px',
    height: '55px',
    padding: '8px',
    borderRadius: '100px',
    backgroundColor: '#ffa1a1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '8px',
  },
  contentTitle: {
    fontSize: '22px !important',
  },
  contentDesc: {
    fontSize: '14px !important',
  },
}));
// #endregion Styling

/**
 * @component - Common dialog error body component.
 * @param {object} content Object denoting body's structure
 * structure -
 * {
 * title:"",
 * desc:""
 * }
 */
const DialogErrorBody = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <div className={classes.errorIconDiv}>
          <ErrorIcon className={classes.errorIcon} />
        </div>
        <Typography className={classes.contentTitle}>
          {content?.title}
        </Typography>
        {content?.desc && (
          <Typography className={classes.contentDesc}>
            <span className="font-bold">Error encountered :</span>{' '}
            {content?.desc}.
          </Typography>
        )}
      </div>
    </div>
  );
};

DialogErrorBody.propTypes = {};

export default DialogErrorBody;
