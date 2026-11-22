import type {Article} from '../../types/article';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks.ts";
import {setCurrentArticle} from "../../store/slices/articleSlice.ts";

export default function SubArticleCard({article}: { article: Article }) {
    // return (
    //     <div className="card mb-3 shadow-sm">
    //         <div className="row g-0 align-items-center">
    //             <div className="col-4">
    //                 <img
    //                     src={article.thumb}
    //                     className="img-fluid rounded-start"
    //                     alt={article.title}
    //                 />
    //             </div>
    //             <div className="col-8">
    //                 <div className="card-body py-2">
    //                     <h6 className="card-title mb-1">
    //                         <a href={article.link} className="text-decoration-none text-dark">
    //                             {article.title}
    //                         </a>
    //                     </h6>
    //                 </div>
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
                className="article-img-sub"
                alt={article.title}
            />
            <div className="article-body">
                <h6 className="article-title">
                    {/*<a href={article.link} className="text-decoration-none text-dark">*/}
                        {article.title}
                    {/*</a>*/}
                </h6>
            </div>
        </div>
    );
}