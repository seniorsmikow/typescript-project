import React from 'react';
import icon from '../../../img/img_568657.png';
import classes from './Users.module.css';
import {NavLink}  from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
    info: {
        position: 'fixed',
        top: 90,
        right: 20,
        backgroundColor: '#25323a',
        zIndex: 1,
        "&:hover": {
            backgroundColor: "#25323a"
        },
    },
    'MuiPagination-ul': {
        backgroundColor: 'red'
    }
}));

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const Users = (props) => {   
    
    const styles = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);

    let pages = [];

    for(let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    return (
        <div className={classes.mainUsers}>
            <div className={classes.tip}>
                <Fab  color="primary" aria-label="add" onClick={handleClick} className={styles.info} size="medium" disableFocusRipple={true}>
                    <PriorityHighIcon />
                </Fab>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}} >
                    <Alert onClose={handleClose} severity="info">
                    Всего зарегистрировано {props.totalUsersCount} человек
                    </Alert>
                </Snackbar>
            </div>
            <div>
                <div className={classes.paginationMain}>
                    <Pagination color="secondary" 
                                count={pagesCount} 
                                shape="rounded" 
                                page={props.currentPage}
                                showFirstButton={true} 
                                showLastButton={true} 
                                className={classes.paginationMain}
                                onChange = {(event, pages) => {props.onPageChanged(pages)}} 
                    />
                </div>
                <div className={classes.paginationSecond}>
                    <Pagination count={pagesCount} 
                                defaultPage={6} 
                                siblingCount={0} 
                                onChange = {(event, pages) => {props.onPageChanged(pages)}} 
                    />
                </div>
            </div>
            
            <br />
            <div className={classes.usersWrapper}>
                {props.users.map((users, index) => {
                        return <div className={classes.usersInfo} key={index}>
                                    <div className={classes.usersIcon}>    
                                        <NavLink to={'/profile/' + users.id} >
                                            <img alt="user icon" src={users.photos.small ? users.photos.small : icon}/>
                                        </NavLink>   
                                    </div>
                                            <div className={classes.usersStatus}>
                                                {users.status ? users.status : "user's status"}
                                            </div>
                                            <div className={classes.usersName}>
                                                {users.name}
                                            </div>
                                            <div>
                                                {
                                                    (users.followed ? <Button  variant="contained" style={{backgroundColor: '#f44336'}}
                                                        disabled={props.usersFollowing.some(id => id === users.id)} onClick={
                                                        
                                                        () => {
                                                            props.unfollowThunkCreator(users.id);
                                                        }

                                                    }> unfollow </Button > : 

                                                                        <Button   variant="contained" style={{backgroundColor: '#f44336'}}
                                                                        disabled={props.usersFollowing.some(id => id === users.id)} onClick={
                                                                            () => {
                                                                                debugger;
                                                                                props.followThunkCreator(users.id);
                                                                            }
                                                                        }> follow </Button >)
                                                }
                                            </div>
                                </div>})
                }
            </div>
        </div>
    )
};

export default Users;


