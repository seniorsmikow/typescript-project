import React from 'react';
import classes from './PostForm.module.css';
import { Field } from 'redux-form';
import { requiredField, maxLength } from '../../../utilits/validators/validators';
import Textarea from '../../Textarea/Textarea';

const maxLengthValue10 = maxLength(5);

const PostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.main}>
            <div>
                <Field 
                    name={"postText"} 
                    placeholder={"add text"} 
                    component={Textarea} 
                    className={classes.input}
                    validate={[ requiredField, maxLengthValue10]}
                />
            </div>
            <div>
                <button className={classes.button}>Добавить</button>
            </div>
        </form>
    )
};

export default PostForm;