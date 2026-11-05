import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Article } from '../../types/article.ts';
import type {Category} from "../../types/category.ts";

interface ArticleState {
    categories: Category[];
    articles: Article[];
    currentArticle: Article | null;
    loading: boolean;
    error: string | null;
}

const initialState: ArticleState = {
    categories: [],
    articles: [],
    currentArticle: null,
    loading: false,
    error: null,
};

export const articleSlice = createSlice({
    name: "article",
    initialState,
    reducers: {
        setCategories: (state: ArticleState, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
        },
        setArticles: (state: ArticleState, action: PayloadAction<Article[]>) => {
            state.articles = action.payload;
        },
        setCurrentArticle: (state: ArticleState, action: PayloadAction<Article | null>) => {
            state.currentArticle = action.payload;
        },
        setLoading: (state: ArticleState, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state: ArticleState, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setCategories, setArticles, setCurrentArticle, setLoading, setError } = articleSlice.actions;
export default articleSlice.reducer;