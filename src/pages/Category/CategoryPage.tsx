import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import ArticleList from "../../components/articles/ArticleList.tsx";
import {useNavigate} from "react-router-dom";
import React from "react";
import {setCurrentCategory} from "../../store/slices/categorySlice.ts";
import {setCurrentChannel} from "../../store/slices/channelSlice.ts";
import {articleService} from "../../services/articleService.ts";
import {setArticles} from "../../store/slices/articleSlice.ts";

export default function CategoryPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const articles = useAppSelector((state: any) => state.article.articles);
    const currentCategory = useAppSelector((state: any) => state.category.currentCategory);
    const currentChannel = useAppSelector((state: any) => state.channel.currentChannel);
    const categories = useAppSelector((state: any) => state.category.categories);
    const channels = useAppSelector((state: any) => state.channel.channels);

    const rootCategory = currentCategory?.parent_id
        ? categories.find((cat: any) => cat.id === currentCategory.parent_id)
        : currentCategory;

    const childCategories = rootCategory
        ? categories.filter((cat: any) => cat.parent_id === rootCategory.id)
        : [];

    const handleSetCurrent = async (e: React.MouseEvent, cat: any) => {
        e.preventDefault();
        dispatch(setCurrentCategory(cat));
        const matchedChannel = channels.find((ch: any) => ch.category_id === cat.id);
        dispatch(setCurrentChannel(matchedChannel));
        const articlesData = await articleService.getArticlesByCategory(cat.id);
        dispatch(setArticles(articlesData));

        if (cat.id === 1) {
            navigate('/');
        } else {
            navigate(`/categories/${encodeURIComponent(cat.categoryName)}`);
        }

    };
    const getActiveClass = (cat: any) => (cat?.id === currentCategory?.id ? "active" : "");
    return (
        <div className="container">
            <div className="section-top">
                <h1 className="main-category">
                    <a className={getActiveClass(rootCategory)} onClick={(e) => handleSetCurrent(e, rootCategory)}>
                        {rootCategory.categoryName}
                    </a>
                </h1>

                {childCategories.length > 0 && (
                    <div className="sub-categories">
                        {childCategories.map((child: any) => {
                            return (
                                <a className={getActiveClass(child)} onClick={(e) => handleSetCurrent(e, child)}>
                                    {child.categoryName}
                                </a>
                            );
                        })}
                    </div>
                )}

                <h2 className="subtitle">
                    {currentChannel.description}
                </h2>
            </div>

            <div className="section-content">
                <h3 className="section-title">Danh sách các tin tức</h3>
                <section className="list">
                    <ArticleList articles={articles} />
                </section>
            </div>
        </div>
    );
}