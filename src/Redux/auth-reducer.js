import { authAPI } from '../Api/api';
import {stopSubmit} from 'redux-form';

const SET_AUTH_DATA = 'auth/SET_AUTH_DATA';

let initialState = {
    email: null,
    id: null,
    login: null,
    isAuth: false,
};

const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_AUTH_DATA:
        {
            return {
                ...state,
                ...action.data,
            };
        }
        default: 
            return state;
    }
};

export const setAuth = (email, id, login, isAuth) => {
    return {
        type: SET_AUTH_DATA,
        data: {
            email,
            id,
            login,
            isAuth
        }
    };
};

export const getMyApiThunk = () => (dispatch) => {
    authAPI.me()
        .then(response => {
        if(response.data.resultCode === 0) {
            let {email, id, login} = response.data.data;
            dispatch(setAuth(email, id, login, true));
        }
    });
};

export const login = (email, password, rememberMe) => async (dispatch) => {

    let response = await authAPI.login(email, password, rememberMe);

    if(response.data.resultCode === 0) {
        dispatch(getMyApiThunk());
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
        dispatch(stopSubmit("login", {_error: message}));
    }
};

export const logout = () => {
    return (dispatch) => {
        authAPI.logout()
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setAuth(null, null, null, false));
            }
        });
    };
};

export default authReducer;