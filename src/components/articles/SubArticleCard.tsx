import type { Article } from '../../types/article';

export default function SubArticleCard({ article }: { article: Article }) {
    return (
        <div className="card mb-3 shadow-sm">
            <div className="row g-0 align-items-center">
                <div className="col-4">
                    <img
                        src={article.thumb}
                        className="img-fluid rounded-start"
                        alt={article.title}
                    />
                </div>
                <div className="col-8">
                    <div className="card-body py-2">
                        <h6 className="card-title mb-1">
                            <a href={article.link} className="text-decoration-none text-dark">
                                {article.title}
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
        </div>
    );
}