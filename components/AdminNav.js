import React, { useState } from "react";
import { FaGrinWink, FaCompass, FaCog, FaCalendarAlt } from "react-icons/fa";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  menuButton: {
    position: "absolute",
    right: "2rem",
    top: "0.5rem",
    border: "none",
    fontSize: "1.2rem"
  },
  nav: {
    animation: `$slide-in 3000ms ${theme.transitions.easing.easeInOut}`
  },
  "@keyframes slide-in": {
    "0%": { width: "0" },
    "100%": {
      width: "15rem"
    }
  }
}));
const AdminNav = ({ changeTap, setUsersToShow }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClick = tap => {
    changeTap(tap);
    setOpen(false);
  };
  const Nav = () => {
    return (
      <div className="admin-nav-container">
        <div className="nav-header" onClick={() => handleClick("main")}>
          <FaGrinWink className="grinwink" />
          <span>لوحة التحكم</span>
        </div>
        <hr />
        <div className="nav-main" onClick={() => handleClick("main")}>
          <FaCompass className="icon" />
          <span>لوحة التحكم</span>
        </div>
        <hr />
        <nav>
          <ul>
            <li
              onClick={() => {
                handleClick("emails");
                setUsersToShow("all");
              }}
            >
              <FaCog className="icon" />
              <span> الحسابات </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li
              className="small-li"
              onClick={() => {
                handleClick("emails");
                setUsersToShow("normal");
              }}
            >
              <span> الحسابات العادية </span>
            </li>
            <li
              className="small-li"
              onClick={() => {
                handleClick("emails");
                setUsersToShow("vip");
              }}
            >
              <span> الحسابات المدفوعة </span>
            </li>
            <li
              className="small-li"
              onClick={() => {
                handleClick("emails");
                setUsersToShow("block");
              }}
            >
              <span> الحسابات المحظورة </span>
            </li>

            <li onClick={() => handleClick("messages")}>
              <FaCog className="icon" />
              <span> الرسائل </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("countries")}>
              <FaCog className="icon" />
              <span> الدول العربية </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("cities")}>
              <FaCog className="icon" />
              <span> المدن </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("ips")}>
              <FaCog className="icon" />
              <span> IPs </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("blogs")}>
              <FaCog className="icon" />
              <span> المدونة </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("tags")}>
              <FaCog className="icon" />
              <span> الروابط النصية </span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("reports")}>
              <FaCog className="icon" />
              <span> البلاغات</span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("ads")}>
              <FaCog className="icon" />
              <span> الإعلانات</span>
              <span className="arrow"> {"<"} </span>
            </li>
            <li onClick={() => handleClick("vip")}>
              <FaCalendarAlt className="icon" />
              <span> اشتراك VIP </span>
            </li>
            <li onClick={() => handleClick("settings")}>
              <FaCog className="icon" />
              <span> ضبط الموقع </span>
              <span className="arrow"> {"<"} </span>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
  return (
    <div>
      <Hidden smUp implementation="css">
        <IconButton
          className={classes.menuButton}
          onClick={() => setOpen(true)}
          style={{
            outline: "none"
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          variant="temporary"
          anchor="right"
          open={open}
          onClose={() => setOpen(!open)}
          ModalProps={{
            keepMounted: true
          }}
          classes={{
            paper: classes.nav
          }}
        >
          <Nav />
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer variant="permanent" open>
          <Nav />
        </Drawer>
      </Hidden>
    </div>
  );
};

export default AdminNav;
