import type {Comment} from "../types/comment.ts";
import axiosClient from "./axiosClient.ts";

export const commentService = {
    async addComment(comment: Comment) {
        const response = await axiosClient.post(`/api/comments`, comment);
        return response.data;
    },

    async getCommentsByArticle(articleId: number): Promise<Comment[]> {
        const response = await axiosClient.get(`/api/articles/${articleId}/comments`);
        return response.data.comments;
    },

    async getCommentsByUser(userId: number): Promise<Comment[]> {
        const response = await axiosClient.get(`/api/users/${userId}/comments`);
        return response.data.comments;
    },
};