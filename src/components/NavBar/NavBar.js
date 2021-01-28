import React, {useEffect, useState, useContext} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import MoreIcon from '@material-ui/icons/MoreVert';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {useStyles} from "./NavBar.style"
import {Drawer} from "../Drawer/Drawer"
import {Link, useHistory} from "react-router-dom"
import {FetchData} from "../../helper/FetchData"
import SendIcon from '@material-ui/icons/Send';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {AuthContext} from "../../App"
import axios from 'axios';

export function NavBar() {
  const classes = useStyles();
  const history = useHistory()
  const {Authorization, setAuthorization, setCurrentUser} = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [category, setCategory] = useState([])

  useEffect(()=>{
    FetchData("https://blog-fullstack-backend.herokuapp.com/category-list/").then((data)=>setCategory(data))
  },[])

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = async () =>{
    localStorage.setItem("Authorization", "")
    localStorage.setItem("currentUser", "")
    history.push("/login")
    document.location.reload()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {Authorization
      ?
        <MenuItem onClick={handleLogout} className={classes.lockIconMobil}>
          <IconButton aria-haspopup="true" color="inherit">
            <ExitToAppIcon />
          </IconButton>
            <p>Logout</p>
        </MenuItem>
      :
      <Link to="/register" className={classes.lockIconMobil}>
        <MenuItem>
          <IconButton color="inherit">
            <LockIcon />
          </IconButton>
          <p>Login</p>
        </MenuItem>
      </Link>}
      {Authorization
      ?
        <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      :
      null}
      <Link to={Authorization ? "/post-send" : "/register"} className={classes.lockIconMobil}>
        <MenuItem>
          <IconButton aria-label="show 4 new mails" color="inherit">
            <SendIcon />
          </IconButton>
          <p>Send a Post</p>
        </MenuItem>
      </Link>
    </Menu>
  );
  console.log({Authorization})
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Drawer />
          <Link to="/" className={classes.title}>
            <Typography  variant="h6" noWrap>
              Blog
            </Typography>
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="grouped-select" className={classes.select}>Categories</InputLabel>
              <Select defaultValue="" id="grouped-select">
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {category?.map((item) => <MenuItem value={item.name}>{item.name}</MenuItem>)}
              </Select>
            </FormControl>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <Link to={Authorization ? "/post-send" : "/register"} className={classes.postLink}>
              <Typography variant="h6" noWrap>
                Send a Post
              </Typography>
            </Link>
            {Authorization
            ?
            <Link onClick={handleLogout} className={classes.lockIcon}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <ExitToAppIcon />
              </IconButton>
            </Link>
            :
            <Link to="/register" className={classes.lockIcon}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <LockIcon />
              </IconButton>
            </Link>
            }

           {Authorization
           ?
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            :
            null
            }
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}