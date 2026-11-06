import type { Article } from '../../types/article';
import MainArticleCard from './MainArticleCard';
import CompactArticleList from './CompactArticleList';

export default function FeaturedArticleList({ articles }: { articles: Article[] }) {
    const mainArticle = articles[0];
    const sideArticles = articles.slice(1, 5);

    return (
        <div className="row g-4">
            <div className="col-12 col-lg-8">
                {mainArticle && <MainArticleCard article={mainArticle} />}
            </div>
            <div className="col-12 col-lg-4">
                <CompactArticleList articles={sideArticles} />
            </div>
        </div>
    );
}