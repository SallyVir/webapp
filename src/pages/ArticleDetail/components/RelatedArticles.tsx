import { Link } from 'react-router-dom';
import type { Article } from '../../../types/article';

export default function RelatedArticles({
                                            articles,
                                            currentId,
                                            limit = 5
                                        }: {
    articles: Article[];
    currentId: number;
    limit?: number;
}) {
    const related = articles.filter((a) => a.id !== currentId).slice(0, limit);

    if (related.length === 0) return null;

    return (
        <section className="my-4">
            <h4
                className="text-uppercase fw-bold text-dark mb-3 ps-2"
                style={{ borderLeft: '4px solid var(--primary-color)', fontSize: '18px' }}
            >
                Tin liên quan
            </h4>

            <div className="d-flex flex-column">
                {related.map((item) => (
                    <div key={item.id} className="d-flex gap-3 py-3 border-bottom">
                        <Link to={`/articles/${item.id}`} className="flex-shrink-0">
                            <img
                                src={item.thumb}
                                alt={item.title}
                                style={{ width: '120px', height: '80px', objectFit: 'cover' }}
                            />
                        </Link>
                        <h6 className="mb-0 align-self-center">
                            <Link to={`/articles/${item.id}`} className="text-decoration-none text-dark">
                                {item.title}
                            </Link>
                        </h6>
                    </div>
                ))}
            </div>
        </section>
    );
}