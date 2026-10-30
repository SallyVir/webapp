import type { Article } from "../types/article";
import { createArticle } from "../types/article";
import type { Channel } from "../types/channel";
import { createChannel, createChannelImage } from "../types/channel"

export interface RssData {
    channel: Channel;
    articles: Article[];
}

export async function fetchData(rssUrl: string): Promise<RssData> {
    const response = await fetch(rssUrl);
    const xmlText  = await response.text();
    return parseRssXml(xmlText);
}

export function parseRssXml(xmlText: string): RssData {
    const parser = new DOMParser();
    const xml = parser.parseFromString(xmlText, "text/xml");

    const channelElement = xml.querySelector("channel");
    const items = xml.querySelectorAll("item");
    const articles: Article[] = [];

    const channelImage = createChannelImage(
        // @ts-ignore
        getValue(channelElement, "url"),
        // @ts-ignore
        getValue(channelElement, "title"),
        // @ts-ignore
        getValue(channelElement, "link")
    );

    const channel = createChannel(
        // @ts-ignore
        getValue(channelElement, "title"),
        // @ts-ignore
        getValue(channelElement, "copyright"),
        // @ts-ignore
        getValue(channelElement, "link"),
        // @ts-ignore
        getValue(channelElement, "lastBuildDate"),
        // @ts-ignore
        getValue(channelElement, "pubDate"),
        // @ts-ignore
        getValue(channelElement, "description"),
        // @ts-ignore
        getValue(channelElement, "language"),
        // @ts-ignore
        getValue(channelElement, "docs"),
        // @ts-ignore
        getValue(channelElement, "managingEditor"),
        // @ts-ignore
        getValue(channelElement, "webMaster"),
        // @ts-ignore
        Number(getValue(channelElement, "ttl")),
        channelImage
    );

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const article = createArticle(
            getValue(item, "title"),
            getValue(item, "description"),
            getValue(item, "pubDate"),
            getValue(item, "updated"),
            getValue(item, "guid"),
            getValue(item, "link"),
            getValue(item, "category"),
            getValue(item, "thumb"),
            getValue(item, "image")
        );
        articles.push(article);

    }
    return {
        channel: channel,
        articles: articles
    };
}
export function getValue(item: Element, tagName: string): string {

    const element = item.querySelector(tagName);
    // @ts-ignore
    const value = element.textContent;
    return value.trim();

}