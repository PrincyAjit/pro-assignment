// #region Library imports
import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// #endregion Library imports

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    width: 'fit-content',
  },
  '& .MuiDialogContent-root': {
    padding: 0,
    width: 'fit-content',
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, noCloseAction, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {!noCloseAction && onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomDialog({
  open,
  setOpen,
  noCloseAction = false, // to hide close icon and prevent close action.-> Useful in loading based dialogs where we keep the dialog open unless action is complete,once its complete pass open prop as false to this component.
  title,
  content,
  onDialogClose,
}) {
  const handleClose = () => {
    !noCloseAction && onDialogClose();
  };

  return (
    <BootstrapDialog
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth={false}
    >
      <BootstrapDialogTitle
        id="customized-dialog-title"
        onClose={handleClose}
        noCloseAction={noCloseAction}
      >
        {title}
      </BootstrapDialogTitle>
      <DialogContent dividers>{content}</DialogContent>
    </BootstrapDialog>
  );
}
