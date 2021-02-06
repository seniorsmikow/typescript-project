import { AppStateType } from './redux-store'

export const getUsers = (state: AppStateType) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize
}

export const getPagesLimit = (state: AppStateType) => {
    return state.usersPage.pagesLimit
}

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching
}

export const getInProcess = (state: AppStateType) => {
    return state.usersPage.inProcess
}

export const getUsersFollowing = (state: AppStateType) => {
    return state.usersPage.usersFollowing
}