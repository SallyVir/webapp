import type {Comment} from "../types/comment.ts";
import axiosClient from "./axiosClient.ts";

export const commentService = {
    async addComment(data: { user_id: number; article_id: number; content: string, article_link?: string }): Promise<Comment> {
        const response = await axiosClient.post(`/api/comments`, data);
        return response.data;
    },

    async getCommentsByArticle(article_id: number): Promise<Comment[]> {
        const response = await axiosClient.get(`/api/comments`, {params: {id: article_id, is_article: true}});
        return response.data.comments;
    },

    async getCommentsByUser(user_id: number): Promise<Comment[]> {
        const response = await axiosClient.get(`/api/comments`, {params: {id: user_id, is_article: false}});
        return response.data.comments;
    },

    async updateComment(comment_id: number, content: string) {
        const response = await axiosClient.put(`/api/comments/${comment_id}`, {content});
        return response.data;
    },

    async deleteComment(comment_id: number) {
        const response = await axiosClient.delete(`/api/comments/${comment_id}`);
        return response.data;
    }
};