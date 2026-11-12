import type {Category} from "../types/category.ts";
import axiosClient from "./axiosClient.ts";
import type {Channel} from "../types/channel.ts";

export const categoryService = {

    async getAllCategories(): Promise<Category[]> {
        const response = await axiosClient.get('/api/categories');
        return response.data.categories;
    },

    async getCategoryById(categories_id: number): Promise<Channel> {
        const response = await axiosClient.get(`/api/categories/${categories_id}`);
        return response.data.channel;
    },
}