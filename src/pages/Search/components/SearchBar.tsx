import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setCurrentArticle } from '../../store/slices/articleSlice';
import type { Article } from '../../types/article';
import type { Category } from '../../types/category';
import CommentSection from '../../components/comments/CommentSection';
import ArticleActions from './components/ArticleActions';
import ArticleBody from './components/ArticleBody';
import AuthorInfo from './components/AuthorInfo';
import RelatedArticles from './components/RelatedArticles';

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const articleId = Number(id);
    const dispatch = useAppDispatch();

    const storeArticles = useAppSelector((state: any) => state.article.articles) as Article[];
    const currentArticle = useAppSelector((state: any) => state.article.currentArticle) as Article | null;
    const categories = useAppSelector((state: any) => state.category.categories) as Category[];

    const [article, setArticle] = useState<Article | null>(null);
    const [related, setRelated] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    //Lấy bài viết
    useEffect(() => {
        window.scrollTo({ top: 0 });

        if (!Number.isFinite(articleId)) {
            setError(true);
            setLoading(false);
            return;
        }

        let cancelled = false;
        const cached =
            currentArticle?.id === articleId
                ? currentArticle
                : storeArticles.find((a) => a.id === articleId) ?? null;

        setError(false);
        setArticle(cached);

        if (cached?.content) {
            setLoading(false);
            return;
        }

        setLoading(true);
        articleService
            .getArticlesDetail(articleId)
            .then((data) => {
                if (cancelled) return;
                const raw = data as unknown as Article | Article[] | null;
                const detail = Array.isArray(raw) ? raw[0] : raw;
                if (detail) {
                    setArticle({ ...(cached ?? {}), ...detail } as Article);
                } else if (!cached) {
                    setError(true);
                }
            })
            .catch(() => {
                if (!cancelled && !cached) setError(true);
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };

    }, [articleId]);

    //đồng bộ bài đang đọc
    useEffect(() => {
        if (!article) return;
        dispatch(setCurrentArticle(article));
        document.title = article.title;
    }, [article, dispatch]);

    //cùng chuyên mục
    const categoryId = article?.category_id;
    useEffect(() => {
        if (categoryId === undefined) return;
        let cancelled = false;

        const local = storeArticles.filter((a) => a.category_id === categoryId);
        setRelated(local);
        if (local.length > 5) return;

        articleService
            .getArticlesByCategory(categoryId)
            .then((list) => {
                if (!cancelled && Array.isArray(list)) setRelated(list);
            })
            .catch(() => {});

        return () => {
            cancelled = true;
        };

    }, [categoryId]);

    if (loading && !article) {
        return (
            <div className="container article-detail">
                <div className="article-detail-state">Đang tải bài viết...</div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="container article-detail">
                <div className="article-detail-state">
                    <p>Không tìm thấy bài viết này.</p>
                    <Link to="/" className="btn btn-danger btn-sm">
                        Về trang chủ
                    </Link>
                </div>
            </div>
        );
    }

    const category = categories.find((c) => c.id === article.category_id);

    return (
        <div className="container article-detail">
            <nav className="article-breadcrumb" aria-label="Điều hướng">
                <Link to="/">Trang chủ</Link>
                {category && (
                    <>
                        <span className="article-breadcrumb-sep">/</span>
                        <Link to={`/categories/${encodeURIComponent(category.categoryName)}`}>
                            {category.categoryName}
                        </Link>
                    </>
                )}
            </nav>

            <h1 className="article-detail-title">{article.title}</h1>

            <AuthorInfo author={article.author} pubDate={article.pubDate} updated={article.updated} />

            <ArticleBody article={article} />

            <ArticleActions key={`actions-${article.id}`} article={article} />

            <RelatedArticles articles={related} currentId={article.id} />

            <CommentSection
                key={`comments-${article.id}`}
                articleId={article.id}
                articleLink={article.link}
            />
        </div>
    );
}