import React, {useState} from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {NavLink} from "react-router-dom"
import PersonIcon from '@material-ui/icons/Person'
import MenuToggle from '../Menu/Menu'
import Hidden from '@material-ui/core/Hidden'
import Grid from '@material-ui/core/Grid'
import { useStyles } from './styles'


type PropsType = {
  isAuth: boolean
  login: string | null
  logout: () => void
}
type HeaderProps = PropsType 


const Header: React.FC<HeaderProps> = ({isAuth, login, logout}) => {

  const classes = useStyles();

  let [editMode, setEditMode] = useState(false);

  let toggleMenuHandler = () => {
    setEditMode(!editMode);
  };

  return (

    //component will be changed! Grid and styles.

    <div>
      <AppBar className={classes.root}>
        <Toolbar>
          <MenuToggle isOpen={editMode} onToggle={toggleMenuHandler} />
          <Grid item xs={2}>
            <Hidden only="xs">
              <Typography variant="h6">
                React Project
              </Typography>
            </Hidden>    
          </Grid>
          { isAuth
                ? <>
                    <Grid item xs={8}>
                      <Hidden only="xs">
                        <PersonIcon />
                        {login}
                      </Hidden>
                    </Grid>
                    <Grid item xs={1}>
                      <Button  variant="contained" color="secondary" onClick={logout} >
                        logout
                      </Button>
                    </Grid>
                  </>
                : <Grid item xs={10}>
                    <NavLink  to={'/login'}>Login</NavLink>
                  </Grid>
          }
        </Toolbar> 
      </AppBar>
    </div>
  );
}

export default Header