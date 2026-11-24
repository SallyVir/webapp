import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import React from "react";
import { setCurrentCategory} from "../../store/slices/categorySlice.ts";
import { setCurrentChannel} from "../../store/slices/channelSlice.ts";
import {articleService} from "../../services/articleService.ts";
import {setArticles} from "../../store/slices/articleSlice.ts";

export default function Footer() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const categories = useAppSelector((state: any) => state.category.categories);
    const channels = useAppSelector((state: any) => state.channel.channels);
    const currentChannel = useAppSelector((state: any) => state.channel.currentChannel);

    const parentCategories = categories.filter((cat: any) => !cat.parent_id);

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

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="logo">
                    <img src={currentChannel.image_url} alt="Channel Logo"/>
                </div>
            </div>

            <nav className="navbar">
                <ul className="nav-menu-list">
                    {parentCategories.map((parent: any) => {
                        const childCategories = categories.filter((child: any) => child.parent_id === parent.id);

                        return (
                            <li key={parent.id} className="nav-item">
                                <a className="parent-nav-link" onClick={(e) => handleSetCurrent(e, parent)}>
                                    {parent.categoryName}
                                </a>

                                {childCategories.length > 0 && (
                                <ul className="child-list">
                                    {childCategories.map((child: any) => (
                                        <li key={child.id} className="nav-item">
                                            <a className="nav-link" onClick={(e) => handleSetCurrent(e, child)}>
                                                {child.categoryName}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </footer>
    )
}