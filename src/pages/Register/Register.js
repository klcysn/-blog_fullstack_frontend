import React from 'react';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {useStyles} from "./Register.style"


export function Register() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Link to="/" className={classes.closeIcon}>
            <CloseIcon />
        </Link>
        <LockIcon color="primary" className={classes.icon} />
        <form className={classes.form} autoComplete="off">
        <TextField
            id="outlined-secondary"
            label="User Name"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="text"
        />
        <TextField
            id="outlined-secondary"
            label="Email"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="email"
        />
        <TextField
            id="outlined-secondary"
            label="Password"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
        />
        <TextField
            id="outlined-secondary"
            label="Confirm Password"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
        />
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>lock_open</Icon>}
        >
        Register
        </Button>
        <Typography className={classes.link}>
        Already have an account? <Link to="/login">Log In</Link>
        </Typography>
        </form>
    </div>
  );
}
