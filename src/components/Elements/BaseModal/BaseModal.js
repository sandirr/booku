import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import PropTypes from 'prop-types';
import { CloseRounded } from '@mui/icons-material';
import { IconButton } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function BaseModal({classes, open, title, desc, handleClose, handleSubmit, noCancel, noSubmit, submitText, closeText, children, actionFull, bgColor, overlayColor}) {

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      className={classes.root}
      fullWidth={true}
      maxWidth="sm"
      sx={{backgroundColor:overlayColor}}
    >
      <DialogTitle sx={{backgroundColor:bgColor, position:'relative'}}>
        <IconButton sx={{position:'absolute', right:2, top:0}} onClick={handleClose} >
          <CloseRounded/>
        </IconButton>
        {title}
      </DialogTitle>
      <DialogContent sx={{backgroundColor:bgColor}}>
        {desc &&
          <DialogContentText sx={{fontSize:14}}>
            {desc}
          </DialogContentText>
        }
        {children}
      </DialogContent>
      <DialogActions sx={{backgroundColor:bgColor}}>
        {!noCancel &&
            <Button style={{textTransform:'none'}} onClick={handleClose}>{closeText}</Button>
        }
        {!noSubmit &&
          <Button fullWidth={actionFull} style={{ textTransform:'none'}} onClick={handleSubmit}>{submitText}</Button>
        }
      </DialogActions>
    </Dialog>
  );
}

BaseModal.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  desc: PropTypes.string,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  noCancel: PropTypes.bool,
  noSubmit: PropTypes.bool,
  submitText: PropTypes.string,
  closeText: PropTypes.string,
  actionFull: PropTypes.bool,
  bgColor: PropTypes.string,
  overlayColor: PropTypes.string,
};

BaseModal.defaultProps = {
  children: null,
  classes: {},
  open: false,
  title: '',
  desc: '',
  handleClose: null,
  handleSubmit: null,
  noCancel: false,
  noSubmit: false,
  submitText: 'Submit',
  closeText: 'Cancel',
  actionFull:false,
  bgColor: '#fff',
  overlayColor: 'rgba(220, 220, 220, 0.5)',
};