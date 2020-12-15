import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import postsReducer from './posts-reducer';
import usersReducer from './users-reducer';
import profileReducer from './profile-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

let reducersBuild = combineReducers({
    postsPage: postsReducer,
    usersPage: usersReducer,
    profilePage: profileReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(reducersBuild, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;

//applyMiddleware(thunkMiddleware)