import Header from "../components/layout/Header.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/layout/Footer.tsx";
import {useEffect} from "react";
import {categoryService} from "../services/categoryService.ts";
import {channelService} from "../services/channelService.ts";
import {setCategories, setCurrentCategory} from "../store/slices/categorySlice.ts";
import {setChannels, setCurrentChannel} from "../store/slices/channelSlice.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {articleService} from "../services/articleService.ts";
import {setArticles} from "../store/slices/articleSlice.ts";

export default function MainLayout() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const fetchInitialData  = async () => {
            const [categoriesData, channelsData, articlesData] = await Promise.all([categoryService.getAllCategories(), channelService.getAllChannels(), articleService.getArticlesByCategory(1)]);

            if (categoriesData) {
                dispatch(setCategories(categoriesData));
                const homeCategory  = categoriesData.find((cat: any) => cat.id === 1);
                if (homeCategory ) {dispatch(setCurrentCategory(homeCategory ));}
            }

            if (channelsData) {
                dispatch(setChannels(channelsData));
                const homeChannel = channelsData.find((ch: any) => ch.category_id === 1);
                if (homeChannel) {dispatch(setCurrentChannel(homeChannel));}
            }

            if (articlesData) {
                dispatch(setArticles(articlesData));
            }

        };
        fetchInitialData();
    }, [dispatch]);

    return (
        <div className="main-layout">

            <Header />
            <main className="main-content">
                <Outlet/>
            </main>
            <Footer />
        </div>
    )
}