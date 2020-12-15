import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import classes from './Loader.module.css';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    color: 'red'
  },
}));

export default function CircularIndeterminate() {
  const styles = useStyles();

  return (
    <div className={classes.main}>
      <CircularProgress classes={styles.root} />
      &nbsp;
      Загрузка...
    </div>
  );
}