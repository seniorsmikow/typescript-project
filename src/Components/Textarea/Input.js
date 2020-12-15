import React from 'react';
import classes from './Input.module.css';

const Input = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.main + " " + (hasError ? classes.error : " ")}>
            <div className={classes.a}>
                <input {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
};

export default Input;