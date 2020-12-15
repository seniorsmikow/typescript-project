import {login} from './auth-reducer';

const START_APP = 'app/START_APP';

let initialState = {
    initialised: false
};

const appReducer = (state = initialState, action) => {
    switch(action.type) {
        case START_APP: {
            return {
                ...state,
                initialised: true,
            };
        }
        default:
            return state;
    }
    
};

export const letStart = () => {
    return {
        type: START_APP,
    };
};

export const initialApp = () => {
    return (dispatch) => {
        let promise = dispatch(login());
        Promise.all([promise]).then( () => {
            dispatch(letStart());
        });
    };
};

export default appReducer;
