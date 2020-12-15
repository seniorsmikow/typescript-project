import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import MenuToggle from '../Menu/Menu';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    width: '100%',
    backgroundColor: '#25323a',
    zIndex: 2,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  nav: {
    color: '#fff',
    fontSize: 20
  },
  login: {
      display: 'flex',
      minWidth: 250,
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: 20
  },
}));

export default function ButtonAppBar(props) {
  const classes = useStyles();

  let [editMode, setEditMode] = useState(false);

  let toggleMenuHandler = () => {
    setEditMode(!editMode);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <MenuToggle isOpen={editMode} onToggle={toggleMenuHandler} />
          <Hidden only="xs">
            <Typography variant="h6"  className={classes.title}>
              React Project
            </Typography>
          </Hidden>
          { props.isAuth
                ? <div className={classes.login}>
                    <Hidden only="xs">
                      <PersonIcon />
                      {props.login}
                    </Hidden>
                    <Button  variant="contained" color="secondary" onClick={props.logout} >
                      logout
                    </Button>
                  </div>
                : <NavLink className={classes.nav} to={'/login'}>Login</NavLink> }
        </Toolbar> 
      </AppBar>
    </div>
  );
}