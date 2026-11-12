import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {Channel} from "../../types/channel.ts";

interface ChannelState {
    channels: Channel[];
    currentChannel: Channel | null;
    loading: boolean;
    error: string | null;
}

const initialState: ChannelState = {
    channels: [],
    currentChannel: null,
    loading: false,
    error: null,
};

export const channelSlice = createSlice({
    name: "channel",
    initialState,
    reducers: {
        setChannels: (state: ChannelState, action: PayloadAction<Channel[]>) => {
            state.channels = action.payload;
        },
        setCurrentChannel: (state: ChannelState, action: PayloadAction<Channel | null>) => {
            state.currentChannel = action.payload;
        },
        setLoading: (state: ChannelState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state: ChannelState, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    },
});

export const { setChannels, setCurrentChannel, setLoading, setError } = channelSlice.actions;
export default channelSlice.reducer;