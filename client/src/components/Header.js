import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { Link } from "react-router-dom";

import "./Header.css";

const Header = () => {
  return (
    <AppBar className="header">
      <Toolbar>
        <div className="header-logo">
          <Link to="/home">
            <Typography variant="h4">Caracall®</Typography>
          </Link>
          <Link to="/friends">
            <Typography className="friendLogo" variant="h9">
              Friends
            </Typography>
          </Link>
        </div>
        <div className="header-icons">
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={17} color="white">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Link to="/messanger">
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="white">
                <MailIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/account">
            <IconButton
              style={{ color: "white" }}
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Link>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
