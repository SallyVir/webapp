import axiosClient from "./axiosClient.ts";
import type {SaveArticle} from "../types/saveArticle.ts";

export const saveArticleService = {
    async saveArticle(user_id: number, article_id: number, article_link?: string) {
        const response = await axiosClient.post('/api/save-articles', {user_id, article_id, article_link});
        return response.data;
    },

    async getSavedArticles(user_id: number): Promise<SaveArticle[]> {
        const response = await axiosClient.get(`/api/save-articles`, {params: {id: user_id, is_article: false}});
        return response.data.save_articles;
    },

    async removeSavedArticle(save_id: number) {
        const response = await axiosClient.delete(`/api/save-articles/${save_id}`);
        return response.data;
    }
}
