import {useEffect, useState} from "react";
import {useAppDispatch} from "./store/hooks.ts";
// import {systemService} from "./services/systemService.ts";
import {categoryService} from "./services/categoryService.ts";
import {channelService} from "./services/channelService.ts";
import {setChannels, setCurrentChannel} from "./store/slices/channelSlice.ts";
import {setCategories, setCurrentCategory} from "./store/slices/categorySlice.ts";
import AppRoutes from "./routes/AppRoutes.tsx";
import {articleService} from "./services/articleService.ts";
import {setArticles} from "./store/slices/articleSlice.ts";

export default function App() {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAppData = async () => {
            try {
                // await systemService.syncRssFeed();
                const [categoriesData, channelsData] = await Promise.all([categoryService.getAllCategories(), channelService.getAllChannels()]);
                const firstCategory = categoriesData[0];
                if (categoriesData) {
                    dispatch(setCategories(categoriesData));
                    dispatch(setCurrentCategory(firstCategory));
                }

                if (channelsData) {
                    const matchedChannel = channelsData.find((ch: any) => ch.category_id === firstCategory.id);
                    dispatch(setChannels(channelsData));
                    dispatch(setCurrentChannel(matchedChannel ?? null));
                }

                const articlesData = await articleService.getArticlesByCategory(firstCategory.id);
                if (articlesData) {
                    dispatch(setArticles(articlesData));
                }

            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        initAppData();
    }, [dispatch]);

    if (isLoading) {
        return <div className="loading">Đang khởi tạo dữ liệu</div>;
    }

    return (
        <div className="app-wrapper">
            <AppRoutes />
        </div>
    );
}