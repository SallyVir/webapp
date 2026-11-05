import React from 'react';
import type {Article} from '../../types/article';

interface Props {
    article: Article;
}

export const ArticleList: React.FC<Props> = ({ article }) => {
    return (
        <article className="article-list-item">
            <a href={article.link.href} className="item-container">
                <img src={article.thumb.href} alt={article.title} className="thumb" />
                <div className="content">
                    <h3 className="title">{article.title}</h3>
                    {article.description && <p className="summary">{article.description}</p>}
                    <span className="time">{article.pubDate.toLocaleDateString('vi-VN')}</span>
                </div>
            </a>
        </article>
    );
};