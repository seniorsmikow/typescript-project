import React from 'react';
import classes from './Drawer.module.css';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { NavLink } from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';

const links = [
    {to: '/profile', label: 'Профиль', icon: <PersonIcon />},
    {to: '/users', label: 'Пользователи', icon: <GroupIcon />},
    {to: '/news', label: 'Новости', icon: <MenuBookIcon />},
];


class Drawer extends React.Component {

    renderLinks() {

        return links.map((elem, index) => {
            return (
                <NavLink to={elem.to} key={index} onClick={this.props.onToggle} >
                    <ListItem button  className={classes.DrawerWrapper} >
                        <ListItemIcon>{elem.icon}</ListItemIcon>
                        <ListItemText primary={elem.label} className={classes.text}/>
                    </ListItem>
                </NavLink>
            )
        });
    }

    render() {

        const cls = [classes.Drawer];

        if(!this.props.isOpen) {
            cls.push(classes.close);
        }

        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop /> : null}
            </React.Fragment>
            
        )
    }
}

export default Drawer;