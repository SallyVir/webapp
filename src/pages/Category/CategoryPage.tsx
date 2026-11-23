import {useAppSelector} from "../../store/hooks.ts";
import ArticleList from "../../components/articles/ArticleList.tsx";

export default function CategoryPage() {
    const articles = useAppSelector((state: any) => state.article.articles);
    const currentCategory = useAppSelector((state: any) => state.category.currentCategory);
    const currentChannel = useAppSelector((state: any) => state.channel.currentChannel);

    return(
        <div className="container">
            <div className="section-top">
                <h1 className="title">
                    {currentCategory.categoryName}
                </h1>
                <h2 className="subtitle">
                    {currentChannel.description}
                </h2>
            </div>
            <div className="section-content">
                <h3 className="section-title">Danh sách các tin tức</h3>
                <section className="list">
                    <ArticleList articles={articles}></ArticleList>
                </section>
            </div>
        </div>
    );
}