export interface Article {
    title: string;
    description: string;
    pubDate: Date;
    updated: Date;
    guid: URL;
    link: URL;
    category: string;
    thumb: URL;
    image: URL;
}

export function createArticle(
    title: string,
    description: string,
    pubDate: string,
    updated: string,
    guid: string,
    link: string,
    category: string,
    thumb: string,
    image: string): Article{
    return {
        title: title.trim(),
        description: description.trim(),
        pubDate: new Date(pubDate),
        updated: new Date(updated),
        guid: new URL(guid),
        link: new URL(link),
        category: category.trim(),
        thumb: new URL(thumb),
        image: new URL(image)
    }
}