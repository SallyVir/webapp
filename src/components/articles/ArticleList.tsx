import type { Article } from '../../types/article';
import ArticleCard from './ArticleCard';

export default function ArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="row g-4">
            {articles.map((article: Article) => (<ArticleCard article={article} />))}
        </div>
    );
}