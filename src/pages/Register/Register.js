import React from 'react';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import {useStyles} from "./Register.style"
import {useHistory} from "react-router-dom"
import axios from "axios"
import { useState } from 'react';
import { CasinoOutlined } from '@material-ui/icons';


export function Register() {
  const classes = useStyles();
  const history = useHistory()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [email, setEmail] = useState("")
  
  const handleSubmit = () =>{
    axios.post("https://blog-fullstack-backend.herokuapp.com/user/register/",{username, password, password2, email})
    history.push("/login")
  }

  return (
    <div className={classes.root}>
        <Link to="/" className={classes.closeIcon}>
            <CloseIcon />
        </Link>
        <LockIcon color="primary" className={classes.icon} />
        <form onSubmit={handleSubmit} className={classes.form} autoComplete="off">
        <TextField
            id="outlined-secondary"
            name="username"
            label="User Name"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="text"
            onChange={(e)=>setUsername(e.target.value)}
        />
        <TextField
            id="outlined-secondary"
            label="Email"
            name="email"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
            id="outlined-secondary"
            label="Password"
            name="password"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
        />
        <TextField
            id="outlined-secondary"
            label="Confirm Password"
            name="password2"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
            onChange={(e)=>setPassword2(e.target.value)}
        />
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>lock_open</Icon>}
        type="submit"
        >Register</Button>
        <Typography className={classes.link}>
        Already have an account? <Link to="/login">Log In</Link>
        </Typography>
        </form>
    </div>
  );
}
