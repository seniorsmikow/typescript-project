import React from 'react';
import classes from './LoginForm.module.css';
import { Field } from 'redux-form';
import Input from '../../Textarea/Input';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={classes.main}>
            <div >
                <Field placeholder={'email'} name={"email"} component={Input} className={classes.email}/>
            </div>
            <div>
                <Field placeholder={'password'} name={"password"} type={"password"} component={Input} className={classes.password}/>
            </div>
            <div className={classes.checkbox}>
                <Field
                    name={"rememberMe"}
                    component={Input}
                    type="checkbox"
                />
                запомнить
            </div>
            <button className={classes.button}>Login</button>
        </form>
    )
};

export default LoginForm;