import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {NavLink} from "react-router-dom";
import PersonIcon from '@material-ui/icons/Person';
import MenuToggle from '../Menu/Menu';
import Hidden from '@material-ui/core/Hidden';
import classes from './Header.module.css';
//import withHoc from './HeaderHoc';


type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}

// type StylePropsType = {
//   classes: any
// }

type HeaderProps = PropsType 


const Header: React.FC<HeaderProps> = ({isAuth, login, logout}) => {

  //const { classes  } = props;

  debugger;

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
          { isAuth
                ? <div className={classes.login}>
                    <Hidden only="xs">
                      <PersonIcon />
                      {login}
                    </Hidden>
                    <Button  variant="contained" color="secondary" onClick={logout} >
                      logout
                    </Button>
                  </div>
                : <NavLink className={classes.nav} to={'/login'}>Login</NavLink> }
        </Toolbar> 
      </AppBar>
    </div>
  );
}

export default Header