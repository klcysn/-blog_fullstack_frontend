import React, {useState} from 'react';
import TextField from '@material-ui/core/TextField';
import LockIcon from '@material-ui/icons/Lock';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import {useStyles} from "./Login.style"
import {useHistory} from "react-router-dom"
import axios from "axios"



export function Login() {
  const classes = useStyles();
  const history = useHistory()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [err, setErr] = useState()
  
  const handleSubmit = async () =>{
    axios.post("https://blog-fullstack-backend.herokuapp.com/auth/login/",{ password, email})
    .then((response)=>{
      localStorage.setItem("Authorization", response.data.key)
      history.push("/")
      document.location.reload()
    }).catch(({response:{data}}) => setErr({data}))
  }

  console.log({err})
  return (
    <div className={classes.root}>
        <Link to="/" className={classes.closeIcon}>
            <CloseIcon />
        </Link>
        <LockIcon color="primary" className={classes.icon} />
        <form className={classes.form} autoComplete="off">
        {err &&
        <Alert className={classes.textField} variant="filled" severity="error">
        Email or Password isn't correct.
        </Alert>}
        <TextField
            id="outlined-secondary"
            label="Email"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="text"
            onChange={(e)=>setEmail(e.target.value)}
        />
        <TextField
            id="outlined-secondary"
            label="Password"
            variant="outlined"
            color="primary"
            className={classes.textField}
            type="password"
            onChange={(e)=>setPassword(e.target.value)}
        />
        <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        onClick={handleSubmit}
        >
        Sign In
        </Button>
        <Typography className={classes.link}>
        Don't you have an account? <Link to="/register">Register</Link>
        </Typography>
        </form>
    </div>
  );
}
