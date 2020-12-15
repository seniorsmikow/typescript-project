import * as axios from 'axios';

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "141828eb-3df1-4887-9f23-4db2de9814c8"}, 
});


export const getUsers = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
};

export const getElseUsers = (currentPage, pageSize) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
};

export const getProfileApi = (userId) => {
    return instance.get(`profile/` + userId);
};

export const getStatus = (userId) => {
    return instance.get(`profile/status/` + userId);
};

export const updateStatus = (status) => {
    return instance.put(`profile/status`, {status});
};

export const authAPI = {
    me() {
        return instance.get(`auth/me`);
    },
    login(email, password, rememberMe = false) {
        return instance.post(`auth/login`, {email, password, rememberMe});
    },
    logout() {
        return instance.delete(`auth/login`);
    },

};

export const usersAPI = {
    followApi(userId) {
        return instance.post(`follow/` + userId);
    },
    unfollowApi(userId) {
        return instance.delete(`follow/` + userId);
    },
    savePhoto(photoFile) {
        let formData = new FormData();
        formData.append("image", photoFile);
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data);
    }
};
