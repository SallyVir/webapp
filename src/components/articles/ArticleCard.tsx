import type { Article } from '../../types/article';

export default function ArticleCard({ article }: { article: Article }) {
    return (
        <div className="col-12 col-sm-6 col-lg-4">
            <div className="card h-100 shadow-sm">
                <img
                    src={article.thumb}
                    className="card-img-top"
                    alt={article.title}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{article.title}</h5>
                    <p className="card-text text-muted">{article.description}</p>
                    <a href={article.link} className="btn btn-primary mt-auto">
                        Đọc tiếp
                    </a>
                </div>
            </div>
        </div>
    );
}