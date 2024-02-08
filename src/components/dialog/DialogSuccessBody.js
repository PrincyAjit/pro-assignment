import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';
import { Typography } from '@mui/material';

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
          <img src="/success-check.svg" />
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
