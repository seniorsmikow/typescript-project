import {UserType} from './types'

export interface UsersState {
    users: Array<UserType>,  
    pageSize: number,
    totalUsersCount: number,
    currentPage: number,
    pagesLimit: number,
    isFetching: boolean,
    inProcess: boolean,
    usersFollowing: Array<UserType>,
}

export enum UsersActionTypes {
    FOLLOW = 'users/FOLLOW',
    UNFOLLOW = 'users/UNFOLLOW',
    GET_ALL_USERS = 'users/GET_ALL_USERS',
    ALL_USERS_COUNT = 'users/ALL_USERS_COUNT',
    CHANGE_CURRENT_PAGE = 'users/CHANGE_CURRENT_PAGE',
    IS_USERS_DATA_LOADING = 'users/IS_USERS_DATA_LOADING',
    HANDLE_USER_FOLLOW = 'users/HANDLE_USER_FOLLOW'
}

interface FollowUsersAction {
    type: UsersActionTypes.FOLLOW
    payload: number
}

interface UnfollowUsersAction {
    type: UsersActionTypes.UNFOLLOW
    payload: number
}

interface GetAllUsersAction {
    type: UsersActionTypes.GET_ALL_USERS
    payload: Array<UserType>
}

interface AllUsersCountAction {
    type: UsersActionTypes.ALL_USERS_COUNT
    payload: number
}

interface ChangeCurrentPageAction {
    type: UsersActionTypes.CHANGE_CURRENT_PAGE
    payload: number
}

interface IsDataLoadingAction {
    type: UsersActionTypes.IS_USERS_DATA_LOADING
    payload: boolean
}

interface HandleUserFollowAction {
    type: UsersActionTypes.HANDLE_USER_FOLLOW
    payload: boolean & number
}

export type UsersAction =
    FollowUsersAction |
    UnfollowUsersAction |
    GetAllUsersAction |
    AllUsersCountAction |
    ChangeCurrentPageAction |
    IsDataLoadingAction |
    HandleUserFollowAction 