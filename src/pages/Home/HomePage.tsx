import { useEffect, useState } from 'react';
import type { Article } from '../../types/article';
import FeaturedArticleList from '../../components/articles/FeaturedArticleList';
import ArticleList from '../../components/articles/ArticleList';
import { articleService } from '../../services/articleService';

export default function HomePage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        articleService.getArticleByCategory('Xã hội')
            .then((data: any) => {
                const list = Array.isArray(data) ? data : (data?.articles || []);
                setArticles(list);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Lỗi khi tải bài viết:', err);
                setArticles([]);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="container my-5 text-center">
                <div className="spinner-border text-danger" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Đang tải tin tức từ Tiền Phong...</p>
            </div>
        );
    }

    return (
        <div className="container my-4">
            <h2 className="mb-3 text-danger fw-bold">Tin nổi bật</h2>
            <FeaturedArticleList articles={articles} />

            <h2 className="my-4 text-primary fw-bold">Tin mới nhất</h2>
            <ArticleList articles={articles} />
        </div>
    );
}