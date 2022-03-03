import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmationModal({classes, open, title, desc, handleClose, handleAgree, noCancel, agreeText, disagreeText}) {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      className={classes.root}
      fullWidth={true}
      maxWidth="xs"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {!noCancel &&
            <Button style={{textTransform:'none'}} onClick={handleClose}>{disagreeText}</Button>
        }
        <Button style={{textTransform:'none'}} onClick={handleAgree}>{agreeText}</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.string,
  handleClose: PropTypes.func,
  handleAgree: PropTypes.func,
  noCancel: PropTypes.bool,
  agreeText: PropTypes.string,
  disagreeText: PropTypes.string,
};

ConfirmationModal.defaultProps = {
  classes: {},
  open: false,
  title: '',
  desc: 'Are you sure?',
  handleClose: null,
  handleAgree: null,
  noCancel: false,
  agreeText: 'Yes',
  disagreeText: 'Cancel',
};