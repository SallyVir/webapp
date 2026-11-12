export interface Category {
    id: number;
    parent_id?: number | null;
    categoryName: string;
    categoryPath: string;
}
