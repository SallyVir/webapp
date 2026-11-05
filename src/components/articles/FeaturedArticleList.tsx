import React from 'react';
import type {Article} from '../../types/article';

interface Props {
    article: Article;
}

export const FeaturedArticleList: React.FC<Props> = ({ article }) => {
    return (
        <article className="featured-article">
            <a href={article.link.href}>
                <div className="img-wrapper">
                    <img src={article.image.href} alt={article.title} />
                </div>
                <h2 className="title">{article.title}</h2>
                {article.description && <p className="summary">{article.description}</p>}
            </a>
        </article>
    );
};