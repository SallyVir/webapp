import type { Article } from '../../types/article';

export default function MainArticleCard({ article }: { article: Article }) {
    return (
        <div className="card h-100 shadow-sm">
            <img
                src={article.image}
                className="card-img-top"
                alt={article.title}
            />
            <div className="card-body d-flex flex-column">
                <h3 className="card-title text-danger">{article.title}</h3>
                <p className="card-text text-muted">{article.description}</p>
                <a href={article.link} className="btn btn-danger mt-auto">
                    Xem chi tiết
                </a>
            </div>
        </div>
    );
}