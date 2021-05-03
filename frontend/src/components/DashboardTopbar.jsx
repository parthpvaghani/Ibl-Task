/* eslint-disable */


import React, { useState,useEffect } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Menu,
  MenuItem,
} from "@material-ui/core";

import MuiAlert from '@material-ui/lab/Alert';
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import PersonIcon from "@material-ui/icons/Person";

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DashboardTopbar = ({
  className,
  onMobileNavOpen,
  sideOptionSelected,
  userId,
  ...rest
}) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  
  useEffect(() => {
   
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  
 

  return (
    <React.Fragment>
 
      <AppBar className={clsx(classes.root, className)} elevation={0} {...rest} style={{zIndex:'1300'}}>
        <Toolbar>
          <Box flexGrow={1} />
          <div className="centertitleadmin">
            <Hidden lgUp>
              <IconButton color="inherit" onClick={onMobileNavOpen}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <h1 className="mobilesize">Music Player App</h1>
          </div>
        
       <div>
            
            <IconButton color="inherit" onClick={handleClick} title="My Account" >
              <PersonIcon
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                Open Menu
              </PersonIcon>
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              style={{ top: "60px" }}
            >
              <MenuItem onClick={() => onLogout()} title="Sign out from Platform">
                <IconButton color="inherit">
                  <InputIcon />
                </IconButton>
                Logout
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      </React.Fragment>
  );

  function onLogout() {
    localStorage.clear();
    window.location.href = "/";
  }
};

DashboardTopbar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default DashboardTopbar;
