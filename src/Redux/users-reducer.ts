import { InferActionsTypes, BaseThunkType } from './redux-store'
import { Dispatch } from 'redux'
import {getUsers, getElseUsers, usersAPI} from '../Api/api'
import {updateObjectInArray} from '../utilits/object-helpers'
import { APIResponseType } from '../Api/api'
import { UserType } from '../Types/types'

type InitialStateType = {
    users: Array<UserType>,  
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    pagesLimit: number,
    isFetching: boolean,
    inProcess: boolean,
    usersFollowing: Array<any>,
}

let initialState: InitialStateType = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    pagesLimit: 10,
    isFetching: true,
    inProcess: false,
    usersFollowing: [],
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {
        case 'users/FOLLOW': 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case 'users/GET_ALL_USERS': 
            return {
                ...state, users: [...action.users]
            }
        case 'users/GET_ALL_USERS_COUNT': 
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case 'users/CHANGE_CURRENT_PAGE': 
            return {
                ...state, currentPage: action.currentPage
            }
        case 'users/IS_USERS_DATA_LOADING':
            return {
                ...state, isFetching: action.loading
            }
        case 'users/HANDLE_USER_FOLLOW':
            return {
                ...state,
                inProcess: action.isFollow,
                usersFollowing: action.isFollow ? 
                    [...state.usersFollowing, action.userId] :
                    state.usersFollowing.filter(user => user !== action.userId)

            }
        default: 
            return state    
    }  
}

export const actions = {
    follow: (userId: number) => ({type:'users/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type:'users/UNFOLLOW', userId} as const),
    getAllUsers: (users: Array<UserType>) => ({type:'users/GET_ALL_USERS', users} as const),
    getAllUsersCount: (totalCount: number) => ({type:'users/GET_ALL_USERS_COUNT', totalCount} as const),
    changeCurrentPage: (currentPage: number) => ({type:'users/CHANGE_CURRENT_PAGE', currentPage} as const),
    isUsersDataLoading: (loading: boolean) => ({type:'users/IS_USERS_DATA_LOADING', loading} as const),
    handleUserFollow: (isFollow: boolean, userId: number) => ({type:'users/HANDLE_USER_FOLLOW', isFollow, userId} as const)
}


export const getUsersData = (currentPage: number, pageSize: number): ThunkType => {

    return async(dispatch, getState) => {
        dispatch(actions.isUsersDataLoading(true))
        let response = await getUsers(currentPage, pageSize)
        
        dispatch(actions.isUsersDataLoading(false))
        dispatch(actions.getAllUsers(response.data.items))
        dispatch(actions.getAllUsersCount(response.data.totalCount)) 
    }                        
}

export const usersPaginationHelper = (currentPage: number, pageSize: number): ThunkType => {

    return async(dispatch, getState) => {
    dispatch(actions.isUsersDataLoading(true))
    let response = await getElseUsers(currentPage, pageSize)
    
    dispatch(actions.isUsersDataLoading(false))
    dispatch(actions.getAllUsers(response.data.items))
    dispatch(actions.getAllUsersCount(response.data.totalCount))
    dispatch(actions.changeCurrentPage(currentPage))
    }
}

let followUnfollowType = async (dispatch: Dispatch<ActionsTypes>, 
                                userId: number, 
                                apiMethod: (userId: number) => Promise<APIResponseType>, 
                                actionCreator: (userId: number) => ActionsTypes
                                ) => {

    dispatch(actions.handleUserFollow(true, userId))
    let response = await apiMethod(userId)

    if(response.resultCode === 0) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.handleUserFollow(false, userId))
}

export const followUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        await followUnfollowType(dispatch, userId, usersAPI.followApi.bind(usersAPI), actions.follow)
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return async(dispatch) => {
        await followUnfollowType(dispatch, userId, usersAPI.unfollowApi.bind(usersAPI), actions.unfollow)
    }
    
}

type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>

export default usersReducer