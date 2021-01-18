import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import classes from './Loader.module.css'


export default function CircularIndeterminate() {

  return (
    <div className={classes.main}>
      <CircularProgress />
        &nbsp;
        Загрузка...
    </div>
  );
}