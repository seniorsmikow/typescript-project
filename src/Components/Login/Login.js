import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, logout } from '../../Redux/auth-reducer';
import {Redirect} from "react-router-dom";
import { Field } from 'redux-form';
import Input from '../Textarea/Input';
import { compose } from 'redux';
import {withRouter} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import classes from '../Textarea/Input.module.css';
import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} className={styles.formWrapper}>
            <div className={styles.formInput}>
                <Field placeholder={'email'} name={"email"} component={Input} className={styles.in}/>
            </div>
            <br />
            <div className={styles.formInput}>
                <Field placeholder={'password'} name={"password"} type={"password"} component={Input} className={styles.in}/>
            </div>
            <div className={styles.fromCheck}>
                <Field 
                    name={"rememberMe"} type={"checkbox"} component={Input} 
                />
                запомнить
            </div>
        {props.error && <div className={classes.error}>{props.error}</div>}
            <Button label="Submit" type="submit" variant="contained" color="primary" style={{marginTop: '20px'}}>login</Button>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => { 
    const onSubmit = (formData) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    };

    if (props.isAuth) {
        return <Redirect to={"/profile"}/>
    } 

    return <div className={styles.mainLogin}>
                <div className={styles.l}>
                    <h1>Login</h1>
                    <Avatar style={{backgroundColor: '#303952'}}>
                        <LockOutlinedIcon style={{backgroundColor: '#303952'}}/>
                    </Avatar>
                </div>
                <LoginReduxForm onSubmit={onSubmit} />
            </div>
        
    
};

const mapStateToProps = (state) => {
    return {isAuth: state.auth.isAuth}
};

const LoginCompose = compose(
    connect(mapStateToProps, {login, logout}),
     withRouter,
    //withRedirect
)(Login);


export default LoginCompose;

