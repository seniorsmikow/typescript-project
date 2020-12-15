import {  getProfileApi, getStatus, updateStatus, usersAPI } from '../Api/api';

const GET_PROFILE = 'profile/GET_PROFILE';
const GET_USER_STATUS = 'profile/GET_USER_STATUS';
const LOAD_USER_PHOTO = 'profile/LOAD_USER_PHOTO';

const initialState = {
    profile: null,
    status: "",
};

export const profileReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return {
                ...state, profile: action.profile
            };
        case GET_USER_STATUS:
            return {
                ...state, status: action.status
            };
        case LOAD_USER_PHOTO: 
            return {
                ...state, profile: {...state.profile, photos: action.photos}
            };
        default:
            return state;
    }
};

export const getProfile = profile => ({type: GET_PROFILE, profile});

export const getUserStatus = status => ({type: GET_USER_STATUS, status});
    
export const savePhoto = photos => ({type: LOAD_USER_PHOTO, photos});



export const thunkCreatorGetProfile = (userId) => {

    debugger;

    
    return (dispatch) => {
        getProfileApi(userId)
        .then(response => {
            dispatch(getProfile(response.data));
        });
    };
};

export const getUStatus = (userId) => {
    return (dispatch) => {
        getStatus(userId)
        .then(response => {
            dispatch(getUserStatus(response.data));
        });
    };
};

export const updateUStatus = (status) => {
    return (dispatch) => {
        updateStatus(status)
        .then(response => {
            if(response.data.resultCode === 0) {
                dispatch(getUserStatus(status));
            }
        });
    };
};

export const loadProfilePhoto = photoFile => async dispatch => {
    let data = await usersAPI.savePhoto(photoFile);
    dispatch(savePhoto(data.data.photos));
};

export default profileReducer;