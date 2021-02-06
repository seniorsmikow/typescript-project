import axios from 'axios'
import { UserType, PhotosType } from '../Types/types'

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {"API-KEY": "141828eb-3df1-4887-9f23-4db2de9814c8"}, 
})


export const getUsers = (currentPage: number, pageSize: number) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`);
}

export const getElseUsers = (currentPage: number, pageSize: number) => {
    return instance.get(`users?page=${currentPage}&count=${pageSize}`)
}

export const getProfileApi = (userId: number) => {
    return instance.get(`profile/` + userId)
}

export const getStatus = (userId: number) => {
    return instance.get(`profile/status/` + userId)
}

export const updateStatus = (status: string) => {
    return instance.put(`profile/status`, {status})
}

type AuthType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: number
    messages: Array<string>
}

export enum ResultCode {
    Success = 0,
    Error = 1
}

export const authAPI = {
    me() {
        return instance.get<AuthType>(`auth/me`).then(res => res.data)
    },
    login(email: string | null, password: string | null, rememberMe: null | boolean = false) {
        return instance.post(`auth/login`, {email, password, rememberMe})
    },
    logout() {
        return instance.delete(`auth/login`)
    },

}

type GetItemsType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCode> = {
    data: D
    messages: Array<string>
    resultCode: RC
}

type SavePhotoResponseDataType = {
    photos: PhotosType
}

export const usersAPI = {
    followApi(userId: number) {
        return instance.post<APIResponseType>(`follow/` + userId).then(res => res.data) as Promise<APIResponseType>
    },
    unfollowApi(userId: number) {
        return instance.delete(`follow/` + userId).then(res => res.data) as Promise<APIResponseType>
    },
    savePhoto(photoFile: any) {
        let formData = new FormData()
        formData.append("image", photoFile)
        return instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(res => res.data)
    }
}