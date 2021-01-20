import { RootState } from './redux-store'
import { Dispatch } from 'redux'
import {getUsers, getElseUsers, usersAPI} from '../Api/api'
import {updateObjectInArray} from '../utilits/object-helpers'
import { ThunkAction } from 'redux-thunk'

const FOLLOW = 'users/FOLLOW'
const UNFOLLOW = 'users/UNFOLLOW'
const SET_USERS = 'users/SET_USERS'
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT'
const CHANGE_CURRENT_PAGE = 'users/CHANGE_CURRENT_PAGE'
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING'
const FOLLOW_IN_PROCESS = 'users/FOLLOW_IN_PROCESS'

// типы из Api лучше вынести в отдельный файл, т.к. позднее они будут использоваться в разных редюсерах

type InitialStateType = {
    users: Array<any>, //users берём из документации Api 
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

type ActionsTypes = FollowType | 
                    UnfollowType | 
                    SetUserType | 
                    SetTotalUsersCountType | 
                    ChangeCurrentPageType | 
                    ToggleIsFetchingType | 
                    FollowInProcessType


const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch(action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            }
        case SET_USERS: 
            return {
                ...state, users: [...action.users]
            }
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state, totalUsersCount: action.totalCount
            }
        case CHANGE_CURRENT_PAGE: 
            return {
                ...state, currentPage: action.currentPage
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.loading
            }
        case FOLLOW_IN_PROCESS:
            return {
                ...state,
                inProcess: action.inProcess,
                usersFollowing: action.inProcess ? 
                    [...state.usersFollowing, action.userId] :
                    state.usersFollowing.filter(user => user !== action.userId)

            }
        default: 
            return state    
    }  
}

type FollowType = {
    type: typeof FOLLOW
    userId: number
}

export const follow = (userId: number): FollowType => {
    return {
        type: FOLLOW,
        userId
    }
}

type UnfollowType = {
    type: typeof UNFOLLOW
    userId: number
}

export const unfollow = (userId: number): UnfollowType => {
    return {
        type: UNFOLLOW,
        userId
    }
}

type SetUserType = {
    type: typeof SET_USERS
    users: any
}

export const setUsers = (users: any): SetUserType => {
    return {
        type: SET_USERS,
        users
    }
}

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalCount: number
}

export const setTotalUsersCount = (totalCount: number): SetTotalUsersCountType => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    }
}

type ChangeCurrentPageType = {
    type: typeof CHANGE_CURRENT_PAGE
    currentPage: number
}

export const changeCurrentPage = (currentPage: number): ChangeCurrentPageType => {
    return {
        type: CHANGE_CURRENT_PAGE,
        currentPage
    }
}

type ToggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    loading: boolean
}

export const toggleIsFetching = (loading: boolean): ToggleIsFetchingType => {
    return {
        type: TOGGLE_IS_FETCHING,
        loading
    }
}

type FollowInProcessType = {
    type: typeof FOLLOW_IN_PROCESS
    inProcess: boolean
    userId: number
}

export const followInProcess = (inProcess: boolean, userId: number): FollowInProcessType => {
    return {
            type: FOLLOW_IN_PROCESS, 
            inProcess, 
            userId
        }
}

export const createThunkGetUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionsTypes>, getState: () => RootState) => {
    
    dispatch(toggleIsFetching(true))

    let response = await getUsers(currentPage, pageSize)
    
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))                         
}

export const createThunkGetElseUsers = (currentPage: number, pageSize: number): ThunkAction<Promise<void>, RootState, unknown, ActionsTypes> => async (dispatch, getState) => {

    dispatch(toggleIsFetching(true))

    let response = await getElseUsers(currentPage, pageSize)
    
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(response.data.items))
    dispatch(setTotalUsersCount(response.data.totalCount))
    dispatch(changeCurrentPage(currentPage))
            
}

let followUnfollowType = (userId: number, apiMethod: any, actionCreator: any, isFollow: any) => async (dispatch: any) => {

    dispatch(followInProcess(true, userId))

    let response = await apiMethod(userId)

    if(response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(followInProcess(false, userId))
}

export const followThunkCreator = (userId: number) => async (dispatch: any) => {
    
    followUnfollowType(dispatch, userId, usersAPI.followApi.bind(usersAPI), follow)
    
}

export const unfollowThunkCreator = (userId: number) => async (dispatch: any) => {
    
    followUnfollowType(dispatch, userId, usersAPI.unfollowApi.bind(usersAPI), unfollow)
    
}

export default usersReducer