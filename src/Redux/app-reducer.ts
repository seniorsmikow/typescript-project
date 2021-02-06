import { AppStateType } from './redux-store';
import { ThunkAction } from 'redux-thunk'
import { login } from './auth-reducer'

const START_APP = 'app/START_APP'

let initialState = {
    initialised: false
}

type InitialStateType = typeof initialState

type ActionsTypes = AppLoad

type ThunkCreationType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

const appReducer = (state = initialState, action: ActionsTypes) : InitialStateType => {
    switch(action.type) {
        case START_APP: {
            return {
                ...state,
                initialised: true,
            };
        }
        default:
            return state
    }
    
}

type AppLoad = {
    type: typeof START_APP
}

export const appLoad = (): AppLoad => ({type: START_APP})


export const initialApp = (): ThunkCreationType => async dispatch => {
        
    let promise = await login(null, null, false)

    Promise.all([promise]).then( () => {
        dispatch(appLoad());
    })
}


export default appReducer
