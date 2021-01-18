import { RootState } from './redux-store'

export const getUsers = (state: RootState) => {
    return state.usersPage.users
}

export const getTotalUsersCount = (state: RootState) => {
    return state.usersPage.totalUsersCount
}

export const getCurrentPage = (state: RootState) => {
    return state.usersPage.currentPage
}

export const getPageSize = (state: RootState) => {
    return state.usersPage.pageSize
}

export const getPagesLimit = (state: RootState) => {
    return state.usersPage.pagesLimit
}

export const getIsFetching = (state: RootState) => {
    return state.usersPage.isFetching
}

export const getInProcess = (state: RootState) => {
    return state.usersPage.inProcess
}

export const getUsersFollowing = (state: RootState) => {
    return state.usersPage.usersFollowing
}