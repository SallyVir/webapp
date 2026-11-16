import type {Article} from '../../types/article';
import {formatPubDate} from "../../utils/formatters.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks.ts";
import {setCurrentArticle} from "../../store/slices/articleSlice.ts";

export default function ArticleCard({article}: { article: Article }) {
    // return (
    //     <div className="col-12 col-sm-6 col-lg-4">
    //         <div className="card h-100 shadow-sm">
    //             <img
    //                 src={article.thumb}
    //                 className="card-img-top"
    //                 alt={article.title}
    //             />
    //             <div className="card-body d-flex flex-column">
    //                 <h5 className="card-title">{article.title}</h5>
    //                 <p className="card-text text-muted">{article.description}</p>
    //                 <a href={article.link} className="btn btn-primary mt-auto">
    //                     Đọc tiếp
    //                 </a>
    //             </div>
    //         </div>
    //     </div>
    // );
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleArticleClick = () => {
        dispatch(setCurrentArticle(article));
        navigate(`/articles/${article.id}`);
    };

    return (
        <div className="article-card" onClick={handleArticleClick}>
            <img
                src={article.thumb || article.image}
                className="article-img"
                alt={article.title}
            />
            <div className="article-body">
                <h4 className="article-title">{article.title}</h4>
                <div className="article-date">{formatPubDate(article.pubDate)}</div>
                <p className="article-description">{article.description}</p>

                {/*<a href={article.link} className="btn btn-primary mt-auto">*/}
                {/*    Đọc tiếp*/}
                {/*</a>*/}
            </div>
        </div>
    );
}