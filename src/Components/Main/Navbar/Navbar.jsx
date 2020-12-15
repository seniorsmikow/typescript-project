import React from 'react';
import classes from './Navbar.module.css';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

const Navbar = () => {
    return (
        <Hidden smDown >
            <Grid item xl={2} lg={3} md={4} sm={12} >
                <div className={classes.Navbar}>
                    <div className={classes.Main}>
                        <ul className={classes.Ul}>
                            <li><NavLink to="/News">Новости</NavLink></li>
                            <li><NavLink to="/Users">Пользователи</NavLink></li>
                            <li><NavLink to="/Profile">Профиль</NavLink></li>
                        </ul>
                    </div>
                </div>
            </Grid>
        </Hidden>
    )
};

export default Navbar;