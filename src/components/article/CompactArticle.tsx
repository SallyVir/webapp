import React from 'react';
import type {Article} from '../../types/article';

interface Props {
    article: Article;
}

export const CompactArticle: React.FC<Props> = ({ article }) => {
    return (
        <article className="compact-article">
            <a href={article.link.href}>
                <img src={article.thumb.href} alt={article.title} className="thumb" />
                <h3 className="title">{article.title}</h3>
            </a>
        </article>
    );
};