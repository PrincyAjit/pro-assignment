import React from 'react';
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

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
    width: '48px',
    height: '48px',
    color: '#9b0000',
  },
  errorIconDiv: {
    width: '76px',
    height: '76px',
    padding: '14.1px',
    borderRadius: '100px',
    backgroundColor: '#ffa1a1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  contentTitle: {
    fontSize: '24px',
    fontWeight: 600,
    marginBottom: '12px',
  },
  contentDesc: {
    fontSize: '14px',
    fontWeight: 400,
  },
}));

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
