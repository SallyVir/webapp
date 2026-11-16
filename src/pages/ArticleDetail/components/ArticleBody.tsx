import { useMemo } from 'react';
import type { Article } from '../../../types/article';

const HTML_TAG_REGEX = /<\/?[a-z][\s\S]*>/i;
const BLOCKED_TAGS = 'script, style, iframe, object, embed, link, meta, form, base';

function sanitizeHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');

    doc.querySelectorAll(BLOCKED_TAGS).forEach((el) => el.remove());

    doc.body.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
            const name = attr.name.toLowerCase();
            const value = attr.value.trim().toLowerCase();
            if (name.startsWith('on') || name === 'srcdoc') {
                el.removeAttribute(attr.name);
            } else if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
                el.removeAttribute(attr.name);
            }
        });

        if (el.tagName === 'A') {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        }
        if (el.tagName === 'IMG') {
            el.setAttribute('loading', 'lazy');
        }
    });

    return doc.body.innerHTML;
}

function stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}

export default function ArticleBody({ article }: { article: Article }) {
    const raw = article.content?.trim() ?? '';
    const isHtml = HTML_TAG_REGEX.test(raw);

    const sapo = useMemo(() => stripHtml(article.description ?? ''), [article.description]);
    const safeHtml = useMemo(() => (isHtml ? sanitizeHtml(raw) : ''), [isHtml, raw]);

    const paragraphs = isHtml
        ? []
        : raw
            .split(/\n+/)
            .map((p) => p.trim())
            .filter((p) => p && p !== sapo);

    const showHeroImage = !!article.image && !raw.includes(article.image);

    return (
        <div className="article-body">
            {sapo && <p className="article-sapo">{sapo}</p>}

            {showHeroImage && (
                <figure className="article-figure">
                    <img src={article.image} alt={article.title} />
                </figure>
            )}

            {isHtml ? (
                <div className="article-content" dangerouslySetInnerHTML={{ __html: safeHtml }} />
            ) : (
                paragraphs.map((p, index) => <p key={index}>{p}</p>)
            )}

            {article.link && (
                <p className="article-source">
                    Nguồn:{' '}
                    <a href={article.link} target="_blank" rel="noopener noreferrer">
                        Tiền Phong
                    </a>
                </p>
            )}
        </div>
    );
}