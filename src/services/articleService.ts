import axiosClient from "./axiosClient.ts";
import type {Article} from "../types/article.ts";

export const articleService = {

    async getArticlesByCategory(category_id: number): Promise<Article[]> {
        const response = await axiosClient.get(`/api/categories/${category_id}/articles`);
        return response.data.articles;
    },

    async getArticlesDetail(article_id: number): Promise<Article> {
        const response = await axiosClient.get(`/api/articles/${article_id}`);
        return response.data.article;
    },

    async searchArticles(keyword: string): Promise<Article[]>{
        const response = await axiosClient.get('/api/articles/search', {
            params: { keyword, q: keyword }
        });
        return response.data.articles || [];
    }
}