import FeaturedArticleList from '../../components/articles/FeaturedArticleList';
import ArticleList from '../../components/articles/ArticleList';
import {useAppSelector} from "../../store/hooks.ts";

export default function HomePage() {
    const articles = useAppSelector((state: any) => state.article.articles);
    const featuredArticleList = articles.slice(0,5);
    const articleList = articles.slice(5);

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
                <h3 className="section-title">Tin tức nổi bật</h3>
                <section className="featured">
                    <FeaturedArticleList articles={featuredArticleList}></FeaturedArticleList>
                </section>

                <h3 className="section-title">Danh sách các tin tức</h3>
                <section className="list">
                    <ArticleList articles={articleList}></ArticleList>
                </section>
            </div>
        </div>
    );


    // const [articles, setArticles] = useState<Article[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);

    // useEffect(() => {
    //     articleService.getArticleByCategory('Xã hội')
    //         .then((data: any) => {
    //             const list = Array.isArray(data) ? data : (data?.articles || []);
    //             setArticles(list);
    //             setLoading(false);
    //         })
    //         .catch((err) => {
    //             console.error('Lỗi khi tải bài viết:', err);
    //             setArticles([]);
    //             setLoading(false);
    //         });
    // }, []);
    //
    // if (loading) {
    //     return (
    //         <div className="container my-5 text-center">
    //             <div className="spinner-border text-danger" role="status">
    //                 <span className="visually-hidden">Loading...</span>
    //             </div>
    //             <p className="mt-2 text-muted">Đang tải tin tức từ Tiền Phong...</p>
    //         </div>
    //     );
    // }

    // return (
    //     <div className="container my-4">
    //         <h2 className="mb-3 text-danger fw-bold">Tin nổi bật</h2>
    //         <FeaturedArticleList articles={articles} />
    //
    //         <h2 className="my-4 text-primary fw-bold">Tin mới nhất</h2>
    //         <ArticleList articles={articles} />
    //     </div>
    // );
    // return (
    //     <div>
    //         <h2>Trang Home </h2>
    //     </div>
    // );
}