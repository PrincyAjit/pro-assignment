// #region Library imports
import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';
// #endregion Library imports

import successIcon from '../../images/success-check.svg';

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
  successIconDiv: {
    width: '76px',
    height: '76px',
    padding: '14.1px',
    borderRadius: '100px',
    backgroundColor: '#EBFFF0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
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
 * @component - Common dialog success body component.
 * @param {object} content Object denoting body's structure
 * structure -
 * {
 * title:"",
 * desc:""
 * }

 */
const DialogSuccessBody = ({ content }) => {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <div className={classes.successIconDiv}>
          <img src={successIcon} alt="check-icon" />
        </div>
        <Typography className={classes.contentTitle}>
          {content?.title}
        </Typography>
        {content?.desc && (
          <Typography className={classes.contentDesc}>
            {content?.desc}
          </Typography>
        )}
      </div>
    </div>
  );
};

DialogSuccessBody.propTypes = {};

export default DialogSuccessBody;
