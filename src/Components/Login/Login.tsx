import React from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { login, logout } from '../../Redux/auth-reducer';
import {Redirect} from "react-router-dom";
import { Field, InjectedFormProps } from 'redux-form';
import Input from '../Main/Textarea/Input';
import { compose } from 'redux';
import classes from '../Main/Textarea/Textarea.module.css';
import styles from './Login.module.css';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { AppStateType } from '../../Redux/redux-store'
import {useDispatch, useSelector} from 'react-redux'
import Button from '@material-ui/core/Button'


type LoginFormOwnProps = {
    
}

type Other = {
    isAuth: boolean
    login: () => void
}

type LoginFormValuesType = {
    rememberMe: boolean
    password: string
    email: string
}


const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
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
            <Button  type="submit" variant="contained" style={{marginTop: '20px'}}>login</Button>
        </form>
    )
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

const LoginPage: React.FC = (props) => { 

    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
    const dispatch = useDispatch()

    const onSubmit = (formData: any) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe))
    };

    if (isAuth) {
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

type MapStatePropsType = {
    isAuth: boolean
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
    return {isAuth: state.auth.isAuth}
};

const Login = compose(connect(mapStateToProps, {login, logout}))(LoginPage);
export default Login