import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Icon from '@material-ui/core/Icon';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function DeleteAlert(props) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(()=>{
    setOpen(props.openAlert)
  },[props])

  const handleClose = () => {
    setOpen(false);
    props.permission(false)
  };

  const handleDelete = () =>{
    setOpen(false);
    props.permission(true)
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Would You Like to Delete?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your post will be deleted permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleDelete} endIcon={<Icon>delete</Icon>} color="secondary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}