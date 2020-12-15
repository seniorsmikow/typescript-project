import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classes from './newPosts.module.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '70ch',
      },
    },
    btn: {
        width: '35ch',
        display: 'flex',
        justifyContent: 'space-around'
    },
    loadBtn: {
        backgroundColor: '#607d8b',
        '&:hover': {
            backgroundColor: '#455a64',
            color: 'white'
        }
    }
}));
  
export default function BasicTextFields() {
    const styles = useStyles();

    return (
        <div className={classes.mainPosts}>
            <form className={styles.root} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Новый пост" variant="outlined" />
            </form>
            <div className={styles.btn}>
                <Button variant="contained">Добавить</Button>
                <Button variant="contained" className={styles.loadBtn}>
                    Загрузить
                </Button>
            </div>
        </div>
    );
}