import { authAPI } from '../Api/api'
import {stopSubmit} from 'redux-form'

const SET_AUTH_DATA = 'auth/SET_AUTH_DATA'

let InitialState = {
    email: null as string | null,
    id: null as number | null,
    login: null as string | null,
    isAuth: false,
}

export type InitialStateType = typeof InitialState

const authReducer = (state = InitialState, action: any): InitialStateType => {
    switch(action.type) {
        case SET_AUTH_DATA:
        {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: 
            return state;
    }
};

type SetAuthPayloadType = {
    email: string | null
    id: number | null 
    login: string | null
    isAuth: boolean | null
}

type SetAuthType = {
    type: typeof SET_AUTH_DATA
    payload: SetAuthPayloadType
}

export const setAuth = (email: string | null, id: number | null, login: string | null, isAuth: boolean): SetAuthType => {
    return {
        type: SET_AUTH_DATA,
        payload: {
            email,
            id,
            login,
            isAuth
        }
    };
};

export const getProfileData = () => async (dispatch: any) => {

    let response = await authAPI.me()
    
    if(response.data.resultCode === 0) {
        let {email, id, login} = response.data.data
        dispatch(setAuth(email, id, login, true))
    }
}

export const login = (email: string | null, password: string | null, rememberMe: any) => async (dispatch: any) => {

    let response = await authAPI.login(email, password, rememberMe)

    if(response.data.resultCode === 0) {
        dispatch(getProfileData())
    } else {
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error"
        dispatch(stopSubmit("login", {_error: message}))
    }
};

export const logout = () => async (dispatch: any) => {

    let response = await authAPI.logout()
    
    if(response.data.resultCode === 0) {
        dispatch(setAuth(null, null, null, false))
    }
        
}

export default authReducer