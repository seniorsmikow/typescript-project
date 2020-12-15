export const getUsers = (state) => {
    return state.usersPage.users;
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getPagesLimit = (state) => {
    return state.usersPage.pagesLimit;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getInProcess = (state) => {
    return state.usersPage.inProcess;
};

export const getUsersFollowing = (state) => {
    return state.usersPage.usersFollowing;
};