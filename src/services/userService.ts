import axiosClient from "./axiosClient.ts";
import type {User} from "../types/user.ts";

export const userService = {
    async register(name: string, password: string) {
        const response = await axiosClient.post('/api/register', { name, password });
        return response.data;
    },

    async login(name: string, password: string) {
        const response = await axiosClient.post('/api/login', { name, password });
        return response.data;
    },

    async getUserById(user_id: number): Promise<User> {
        const response = await axiosClient.get(`/api/users/${user_id}`);
        return response.data.user;
    },

    async changeInfo(user_id: number, name: string, avatar: string) {
        const response = await axiosClient.post('/api/change-info', { user_id, name, avatar });
        return response.data;
    },

    async changePassword(user_id: number, password: string) {
        const response = await axiosClient.post('/api/change-password', { user_id, password });
        return response.data;
    },

    async reLogin(name: string, re_login_code: string) {
        const response = await axiosClient.post('/api/re-login', { name, re_login_code });
        return response.data;
    },

    async logout(name: string) {
        const response = await axiosClient.post('/api/logout', { name });
        return response.data;
    },

    async getAllUsers(): Promise<User[]> {
        const response = await axiosClient.get('/api/users');
        return response.data.users;
    }
}