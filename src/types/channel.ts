
export interface Channel {
    title: string;
    copyright: string;
    link: URL;
    lastBuildDate: Date;
    pubDate: Date;
    description: string;
    language: string;
    docs: URL;
    managingEditor: string;
    webMaster: string;
    ttl: number;
    image: ChannelImage;
}

export interface ChannelImage {
    url: URL;
    title: string;
    link: URL;
}

export function createChannel(
    title: string,
    copyright: string,
    link: string,
    lastBuildDate: string,
    pubDate: string,
    description: string,
    language: string,
    docs: string,
    managingEditor: string,
    webMaster: string,
    ttl: number,
    image: ChannelImage): Channel {
    return {
        title: title.trim(),
        copyright: copyright.trim(),
        link: new URL(link),
        lastBuildDate: new Date(lastBuildDate),
        pubDate: new Date(pubDate),
        description: description.trim(),
        language: language.trim(),
        docs: new URL(docs),
        managingEditor: managingEditor.trim(),
        webMaster: webMaster.trim(),
        ttl: ttl,
        image: image
    };
}

export function createChannelImage(
    url: string,
    title: string,
    link: string): ChannelImage {
    return {
        url: new URL(url),
        title: title.trim(),
        link: new URL(link)
    };
}
