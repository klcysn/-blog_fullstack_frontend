import React, {useContext} from 'react';
import clsx from 'clsx';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useStyles} from "./Drawer.style"
import LockOpenIcon from '@material-ui/icons/LockOpen';
import CreateIcon from '@material-ui/icons/Create';
import HomeIcon from '@material-ui/icons/Home';
import Looks5Icon from '@material-ui/icons/Looks5';
import {AuthContext} from "../../App"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useHistory} from "react-router-dom"


export function Drawer() {
  const history = useHistory()
  const {Authorization, setSelectedCategory} = useContext(AuthContext)
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleLogout = async () =>{
    localStorage.setItem("Authorization", "")
    localStorage.setItem("currentUser", "")
    document.location.reload()
    history.push("/login")
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {Authorization
        ?
        <ListItem button key={"Logout"}>
          <ListItemIcon onClick={handleLogout}><ExitToAppIcon /></ListItemIcon>
          <ListItemText onClick={handleLogout} primary={"Logout"} />
        </ListItem>
        :  
        ['Sign Up', 'Login'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon
            onClick={()=>history.push(index === 0 ? "/register" : "/login")}
            >{index % 2 === 0 ? <CreateIcon key={index} /> : <LockOpenIcon key={index} />}</ListItemIcon>
            <ListItemText primary={text}
            onClick={()=>history.push(index === 0 ? "/register" : "/login")}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['Home', 'Last 5 Posts', 'Send a Post'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon
            onClick={()=>{
              setSelectedCategory("")
              history.push(index === 0 ? "/" : index === 1 ? "/" : "/post-send/")
            }}
            >{index === 0 ? <HomeIcon key={index} /> : index === 1 ? <Looks5Icon key={index} /> : <MailIcon key={index} />}</ListItemIcon>
            <ListItemText
            onClick={()=>{
              setSelectedCategory(false)
              history.push(index === 0 ? "/" : index === 1 ? "/" : "/post-send/")
            }}
            primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
        <React.Fragment key={"left"}>
            <Button onClick={toggleDrawer("left", true)}>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
            </Button>
            <SwipeableDrawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
                onOpen={toggleDrawer("left", true)}
            >
                {list("left")}
            </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
