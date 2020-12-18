import {login} from './auth-reducer';

const START_APP = 'app/START_APP';

let initialState = {
    initialised: false
};

const appReducer = (state = initialState, action: any) : any => {
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

export const initialApp = (): any => {
    return (dispatch: any) => {
        //let promise = dispatch(login());
        let promise = dispatch(login(null, null, null));
        Promise.all([promise]).then( () => {
            dispatch(letStart());
        });
    };
};

export default appReducer;
