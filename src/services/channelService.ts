import axiosClient from './axiosClient';
import type {Channel} from '../types/channel';

export const channelService = {
    async getAllChannels(): Promise<Channel[]> {
        const response = await axiosClient.get('/api/channels');
        return response.data.channels;
    },

    async getChannelById(id: number): Promise<Channel> {
        const response = await axiosClient.get(`/api/channels/${id}`);
        return response.data.channel;
    },
};