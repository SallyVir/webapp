import axiosClient from "./axiosClient.ts";
import type {Article} from "../types/article.ts";
import type {Category} from "../types/category.ts";

export const articleService = {
    async getAllArticles() :Promise<Category[]>{
        const response = await axiosClient.get('/api/categories');
        return response.data.categories;
    },

    async getArticleByCategory(categoryName: string): Promise<Article[]> {
        const response = await axiosClient.get(`/api/categories/${encodeURIComponent(categoryName)}/articles`);
        return response.data.articles;
    },

    async getArticlesDetail(articleId: number): Promise<Article>{
        const response = await axiosClient.get(`/api/articles/${articleId}`);
        return response.data.articles;
    },

    async searchArticles(keyword: string): Promise<Article[]>{
        const response = await axiosClient.get('/api/articles/search', {params: keyword});
        return response.data.articles;
    }
}