import {Action, createStore, combineReducers, applyMiddleware, compose} from 'redux'
import postsReducer from './posts-reducer'
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';
import authReducer from './auth-reducer'
import appReducer from './app-reducer'
import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'

let rootReducer = combineReducers({
    postsPage: postsReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

type RootState = typeof rootReducer
export type AppStateType = ReturnType<RootState>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

//@ts-ignore
window.__store__ = store

export default store