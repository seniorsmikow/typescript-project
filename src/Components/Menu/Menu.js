import React from 'react';
import classes from './Menu.module.css';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from './Drawer/Drawer';

const MenuToggle = props => {

    const cls = [
        classes.MenuToggle,
    ];
 
    if(props.isOpen) {
        cls.push(classes.open);
    }

    return (
        <div>
            <Drawer isOpen={props.isOpen} onToggle={props.onToggle}/>
            <IconButton edge="start" className={cls.join(' ')} onClick={props.onToggle} color="inherit" aria-label="menu">
                {props.isOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
        </div>
    )
};

export default MenuToggle;