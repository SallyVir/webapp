import axiosClient from './axiosClient';

export const systemService = {
    async pingServer() {
        const response = await axiosClient.get('/ping');
        return response.data;
    },

    async syncRssFeed() {
        const response = await axiosClient.post('/api/sync-rss');
        return response.data;
    },
};