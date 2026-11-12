import type {Category} from "../../types/category.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

interface CategoryState {
    categories: Category[];
    currentCategory: Category | null;
    loading: boolean;
    error: string | null
}

const initialState: CategoryState = {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setCurrentCategory: (state, action: PayloadAction<Category | null>) => {
            state.currentCategory = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    }
});
export const {setCategories, setCurrentCategory, setLoading, setError} = categorySlice.actions;
export default categorySlice.reducer;