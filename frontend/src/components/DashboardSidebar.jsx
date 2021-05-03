/* eslint-disable */

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import AlbumIcon from '@material-ui/icons/Album';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles,
  Button,
  ListItem
} from "@material-ui/core";

import Logo from "../images/musiclogo.jpg";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)"
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64
  },

  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  button: {
    color: "#000",
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%"
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: "auto"
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium
    },
    "& $icon": {
      color: theme.palette.primary.main
    }
  }
}));

const DashboardSidebar = ({
  className,
  onMobileClose,
  openMobile,
  sideOptionSelected
}) => {
  const classes = useStyles();

  useEffect(
    () => {
      if (openMobile && onMobileClose) {
        onMobileClose();
      }
    },
    []
  );
  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box alignItems="center" display="flex" flexDirection="column" style={{ padding: '50px' }}>
        <img src={Logo} alt="music logo" style={{ width: '100px' }} />
      </Box>
      <Divider />
      <Box p={2}>
        <List className="blackcolor">

          <ListItem className={clsx(classes.item, className)} disableGutters>
            <Button
              activeclassname={classes.active}
              className={classes.button}
              onClick={() => onClickDashboard("Music Panel")}
            >
              <AlbumIcon className={classes.icon} size="20" />
              <span className={classes.title}>Music Panel</span>
            </Button>
          </ListItem>


        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  function onClickDashboard(value) {

    sideOptionSelected(value);
    onMobileClose();
  }

  return (
    <div>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </div>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
