import { AppStateType } from './redux-store'
import { ThunkAction } from 'redux-thunk'
import {  getProfileApi, getStatus, updateStatus, usersAPI } from '../Api/api'
import { ProfileType, PhotosType } from '../Types/types'

const GET_PROFILE = 'profile/GET_PROFILE'
const GET_USER_STATUS = 'profile/GET_USER_STATUS'
const LOAD_USER_PHOTO = 'profile/LOAD_USER_PHOTO'


const initialState = {
    profile: null as ProfileType | null,
    status: "",
    photos: null as PhotosType | null
}

export type InitialStateType = typeof initialState

type ActionsTypes = GetProfileType |
                    GetUserStatusType |
                    SavePhotoType
                    
type ThunkCreationType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>


export const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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
                ...state, photos: action.photos
            };
        default:
            return state;
    }
};

type GetProfileType = {
    type: typeof GET_PROFILE
    profile: ProfileType
}

type GetUserStatusType = {
    type: typeof GET_USER_STATUS
    status: string
}

type SavePhotoType = {
    type: typeof LOAD_USER_PHOTO
    photos: PhotosType
}

export const getProfile = (profile: ProfileType): GetProfileType => ({type: GET_PROFILE, profile});

export const getUserStatus = (status: string): GetUserStatusType => ({type: GET_USER_STATUS, status});
    
export const savePhoto = (photos: PhotosType): SavePhotoType => ({type: LOAD_USER_PHOTO, photos});


export const thunkCreatorGetProfile = (userId: number): ThunkCreationType => async (dispatch) => {

    let response = await getProfileApi(userId)

    dispatch(getProfile(response.data))
}

export const getUStatus = (userId: number): ThunkCreationType => async (dispatch) => {

    let response = await getStatus(userId)
        
    dispatch(getUserStatus(response.data));
}

export const updateUStatus = (status: string): ThunkCreationType => async (dispatch) => {

    let response = await updateStatus(status)
        
    if(response.data.resultCode === 0) {
        dispatch(getUserStatus(status))
    }
}

export const loadProfilePhoto = (photoFile: any): ThunkCreationType => async (dispatch) => {
    let data = await usersAPI.savePhoto(photoFile)
    dispatch(savePhoto(data.data.photos))
}

export default profileReducer