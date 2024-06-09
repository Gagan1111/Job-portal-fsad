import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
} from "@material-ui/core";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import logo from "./logo.webp"; // Make sure the path to your logo is correct

import isAuth, { userType } from "../lib/isAuth";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    backgroundColor: "#ADD8E6",
    color: "#000",
  },
  title: {
    flexGrow: 1,
    color: "#000",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  logo: {
    marginRight: theme.spacing(2),
    height: 40,
  },
  button: {
    color: "#000",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
      contrastText: "#fff",
    },
  },
});

const Navbar = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  let history = useHistory();

  const handleClick = (location) => {
    history.push(location);
    setOpenDrawer(false);
  };

  const handleTitleClick = () => {
    history.push("/");
    setOpenDrawer(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    history.push(`/home?search=${searchQuery}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="Logo" className={classes.logo} />
          <Typography variant="h6" className={classes.title} onClick={handleTitleClick}>
            Job Portal
          </Typography>
          {/* <form onSubmit={handleSearchSubmit} className={classes.search}>
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
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form> */}
            {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                
                <Button className={classes.button} onClick={() => handleClick("/")}>Home</Button>
          <Button className={classes.button} onClick={() => handleClick("/addjob")}>Add Jobs</Button>
          <Button className={classes.button} onClick={() => handleClick("/myjobs")}>My Jobs</Button>
          <Button className={classes.button} onClick={() => handleClick("/employees")}>Employees</Button>
          <Button className={classes.button} onClick={() => handleClick("/profile")}>Profile</Button>
          <Button className={classes.button} onClick={() => handleClick("/logout")}>Logout</Button>
              </>
            ) : (
              <>
                <Button className={classes.button} onClick={() => handleClick("/")}>Home</Button>
          <Button className={classes.button} onClick={() => handleClick("/home")}>Jobs</Button>
          <Button className={classes.button} onClick={() => handleClick("/applications")}>Applications</Button>
          <Button className={classes.button} onClick={() => handleClick("/profile")}>Profile</Button>
          <Button className={classes.button} onClick={() => handleClick("/logout")}>Logout</Button>
              </>
            )
            ):<></>}
          {/* <Button className={classes.button} onClick={() => handleClick("/")}>Home</Button>
          <Button className={classes.button} onClick={() => handleClick("/home")}>Jobs</Button>
          <Button className={classes.button} onClick={() => handleClick("/applications")}>Applications</Button>
          <Button className={classes.button} onClick={() => handleClick("/profile")}>Profile</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        anchor="left"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <List>
          {isAuth() ? (
            userType() === "recruiter" ? (
              <>
                <ListItem button onClick={() => handleClick("/home")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/addjob")}>
                  <ListItemText primary="Add Jobs" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/myjobs")}>
                  <ListItemText primary="My Jobs" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/employees")}>
                  <ListItemText primary="Employees" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/profile")}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/logout")}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            ) : (
              <>
                <ListItem button onClick={() => handleClick("/home")}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/applications")}>
                  <ListItemText primary="Applications" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/profile")}>
                  <ListItemText primary="Profile" />
                </ListItem>
                <ListItem button onClick={() => handleClick("/logout")}>
                  <ListItemText primary="Logout" />
                </ListItem>
              </>
            )
          ) : (
            <>
              <ListItem button onClick={() => handleClick("/login")}>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem button onClick={() => handleClick("/signup")}>
                <ListItemText primary="Signup" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </ThemeProvider>
  );
};

export default Navbar;
