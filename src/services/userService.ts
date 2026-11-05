import axiosClient from "./axiosClient.ts";
import type {Article} from '../types/article';
import type {User} from "../types/user.ts";

export const userService = {
    async register(name: string, password: string) {
        const response = await axiosClient.post('/api/register', {name, password});
        return response.data;
    },

    async login(name: string, password: string) {
        const response = await axiosClient.post('/api/login', {name, password});
        return response.data;
    },

    async getUserById(userId: number): Promise<User> {
        const response = await axiosClient.get(`/api/users/${userId}`);
        return response.data.user;
    },

    async changeInfo(id: number, name: string, avatar: string) {
        const response = await axiosClient.post('/api/change-password', {id, name, avatar});
        return response.data;
    },

    async changePassword(id: number, password: string) {
        const response = await axiosClient.post('/api/change-password', {id, password});
        return response.data;
    },

    async saveArticle(user_id: number, article_id: number, save_at: Date) {
        const response = await axiosClient.post('/api/save-article', { user_id, article_id, save_at });
        return response.data;
    },

    async getSavedArticles(userId: number): Promise<Article[]> {
        const response = await axiosClient.get(`/api/users/${userId}/saved-articles`);
        return response.data.saved_articles;
    },

}