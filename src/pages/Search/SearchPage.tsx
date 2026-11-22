import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { articleService } from '../../services/articleService';
import type { Article } from '../../types/article';
import SearchBar from './components/SearchBar';
import SearchFilterSidebar from './components/SearchFilterSidebar';

export default function SearchPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryParam = searchParams.get('q') || '';

    const [keyword, setKeyword] = useState(queryParam);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedTime, setSelectedTime] = useState('all');
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setKeyword(queryParam);
        if (!queryParam.trim()) {
            setArticles([]);
            return;
        }

        setLoading(true);
        articleService
            .searchArticles(queryParam)
            .then((data) => {
                const list = Array.isArray(data) ? data : [];
                const now = Date.now();

                const filtered = list.filter((item) => {
                    const matchCat =
                        !selectedCategory ||
                        String((item as any).category_id) === selectedCategory;

                    let matchTime = true;
                    if (selectedTime !== 'all' && item.pubDate) {
                        const diffDays = (now - new Date(item.pubDate).getTime()) / (1000 * 3600 * 24);
                        if (selectedTime === 'today') matchTime = diffDays <= 1;
                        if (selectedTime === 'week') matchTime = diffDays <= 7;
                        if (selectedTime === 'month') matchTime = diffDays <= 30;
                    }

                    return matchCat && matchTime;
                });

                setArticles(filtered);
            })
            .catch(() => setArticles([]))
            .finally(() => setLoading(false));
    }, [queryParam, selectedCategory, selectedTime]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchParams(keyword.trim() ? { q: keyword.trim() } : {});
    };

    return (
        <div className="container my-4">
            <div className="bg-white border p-4">
                <h4 className="text-uppercase fw-normal text-dark mb-4" style={{ letterSpacing: '0.5px' }}>
                    TÌM KIẾM
                </h4>

                <div className="row g-4">
                    <div className="col-12 col-lg-9">
                        <SearchBar
                            keyword={keyword}
                            onChangeKeyword={setKeyword}
                            onSubmit={handleSubmit}
                            onQuickSearch={(kw) => setSearchParams({ q: kw })}
                        />

                        {!loading && queryParam && (
                            <div className="border-bottom pb-2 mb-3 text-muted" style={{ fontSize: '14px' }}>
                                Có <strong className="text-dark">{articles.length}</strong> kết quả phù hợp với từ khóa{' '}
                                <strong className="text-danger">"{queryParam}"</strong>
                            </div>
                        )}

                        {loading ? (
                            <div className="text-center py-5 text-muted">Đang tải kết quả tìm kiếm...</div>
                        ) : !queryParam ? (
                            <div className="text-center py-5 text-muted">
                                Vui lòng nhập từ khóa để tìm kiếm bài viết.
                            </div>
                        ) : articles.length === 0 ? (
                            <div className="text-center py-5 text-muted">
                                Không tìm thấy bài viết nào phù hợp.
                            </div>
                        ) : (
                            <div>
                                {articles.map((article, idx) => {
                                    const imageUrl =
                                        article.thumb ||
                                        article.image ||
                                        'https://via.placeholder.com/240x150?text=Tien+Phong';
                                    const cleanDesc = article.description
                                        ? article.description.replace(/<[^>]*>?/gm, '').trim()
                                        : '';

                                    return (
                                        <div
                                            key={article.id || idx}
                                            className="row g-3 py-3 border-bottom align-items-start"
                                        >
                                            <div className="col-12 col-sm-4">
                                                <a href={article.link} target="_blank" rel="noreferrer">
                                                    <img
                                                        src={imageUrl}
                                                        alt={article.title}
                                                        className="img-fluid rounded-1 w-100"
                                                        style={{ height: '135px', objectFit: 'cover' }}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src =
                                                                'https://via.placeholder.com/240x150?text=Tien+Phong';
                                                        }}
                                                    />
                                                </a>
                                            </div>
                                            <div className="col-12 col-sm-8">
                                                <h5 className="fw-bold mb-2">
                                                    <a
                                                        href={article.link}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="text-decoration-none text-dark"
                                                        style={{ lineHeight: '1.4' }}
                                                    >
                                                        {article.title}
                                                    </a>
                                                </h5>
                                                <p className="text-muted mb-1" style={{ fontSize: '14px' }}>
                                                    {cleanDesc}
                                                </p>
                                                {article.pubDate && (
                                                    <small className="text-secondary" style={{ fontSize: '12px' }}>
                                                        {new Date(article.pubDate).toLocaleString('vi-VN')}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    <div className="col-12 col-lg-3">
                        <SearchFilterSidebar
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                            selectedTime={selectedTime}
                            onSelectTime={setSelectedTime}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}