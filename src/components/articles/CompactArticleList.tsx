import type { Article } from '../../types/article';
import SubArticleCard from './SubArticleCard';

export default function CompactArticleList({ articles }: { articles: Article[] }) {
    return (
        <div className="compact-article-list">
            {articles.map((article: Article) => (<SubArticleCard article={article} />))}
        </div>
    );
}