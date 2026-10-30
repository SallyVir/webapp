import { useEffect, useState } from "react";
import { fetchData } from "./rss";
import type { RssData } from "./rss";

interface UseRssDataResult {
    data: RssData | null;
    loading: boolean;
    error: string | null;
}

export function useRssData(rssUrl: string): UseRssDataResult {
    const [data, setData] = useState<RssData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function load() {

            try {
                setLoading(true);
                setError(null);
                const result = await fetchData(rssUrl);

                setData(result);
            } catch (err) {
                if (err instanceof Error) setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        load();
    }, [rssUrl]);

    return { data, loading, error };
}