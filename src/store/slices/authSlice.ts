import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state: AuthState, action: PayloadAction<User | null>) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
        },
        setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state: AuthState, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        logout: (state: AuthState) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
});

export const { setUser, setLoading, setError, logout } = authSlice.actions;
export default authSlice.reducer;