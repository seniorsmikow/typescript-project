import React from 'react';
import classes from './Textarea.module.css';

const Textarea = ({input, meta, ...props}) => {

    const hasError = meta.touched && meta.error;

    return (
        <div className={classes.main + " " + (hasError ? classes.error : " ")}>
            <div>
                <textarea {...input} {...props} />
            </div>
            <div>
                {hasError && <span>{meta.error}</span>}
            </div>
        </div>
    )
};

export default Textarea;