import {getUsers, getElseUsers, usersAPI} from '../Api/api';
import {updateObjectInArray} from '../utilits/object-helpers';

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET_USERS';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const CHANGE_CURRENT_PAGE = 'users/CHANGE_CURRENT_PAGE';
const TOGGLE_IS_FETCHING = 'users/TOGGLE_IS_FETCHING';
const FOLLOW_IN_PROCESS = 'users/FOLLOW_IN_PROCESS';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    pagesLimit: 10,
    isFetching: true,
    inProcess: false,
    usersFollowing: [],
};


const usersReducer = (state = initialState, action) => {

    switch(action.type) {
        case FOLLOW: 
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
            };
        case SET_USERS: 
            return {
                ...state, users: [...action.users]
            };
        case SET_TOTAL_USERS_COUNT: 
            return {
                ...state, totalUsersCount: action.totalCount
            };
        case CHANGE_CURRENT_PAGE: 
            return {
                ...state, currentPage: action.currentPage
            };
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

            };
        default: 
            return state;    
    }  
};

export const follow = (userId) => {
    return {
        type: FOLLOW,
        userId
    };
};
export const unfollow = (userId) => {
    return {
        type: UNFOLLOW,
        userId
    };
};

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        users
    };
};

export const setTotalUsersCount = (totalCount) => {
    return {
        type: SET_TOTAL_USERS_COUNT,
        totalCount
    };
};

export const changeCurrentPage = (currentPage) => {
    return {
        type: CHANGE_CURRENT_PAGE,
        currentPage
    };
};

export const toggleIsFetching = (loading) => {
    return {
        type: TOGGLE_IS_FETCHING,
        loading
    }
};

export const followInProcess = (inProcess, userId) => {
    return {
            type: FOLLOW_IN_PROCESS, 
            inProcess, 
            userId
        };
};

export const createThunkGetUsers = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let response = await getUsers(currentPage, pageSize);
        
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));                           
            
    }
};

export const createThunkGetElseUsers = (currentPage, pageSize) => {

    return async (dispatch) => {
        dispatch(toggleIsFetching(true));

        let response = await getElseUsers(currentPage, pageSize);
        
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(response.data.items));
        dispatch(setTotalUsersCount(response.data.totalCount));
        dispatch(changeCurrentPage(currentPage));
            
    }
};

let followUnfollowType = async (dispatch, userId, apiMethod, actionCreator) => {

    dispatch(followInProcess(true, userId));

    let response = await apiMethod(userId);

    if(response.data.resultCode === 0) {
        dispatch(actionCreator(userId))
    }

    dispatch(followInProcess(false, userId));
};

export const followThunkCreator = (userId) => {
    return async (dispatch) => {
        followUnfollowType(dispatch, userId, usersAPI.followApi.bind(usersAPI), follow);
    }
};

export const unfollowThunkCreator = (userId) => {
    return async (dispatch) => {
        followUnfollowType(dispatch, userId, usersAPI.unfollowApi.bind(usersAPI), unfollow);
    };
};


export default usersReducer;
