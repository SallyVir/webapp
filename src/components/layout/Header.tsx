import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {setCurrentCategory} from "../../store/slices/categorySlice.ts";
import {setCurrentChannel} from "../../store/slices/channelSlice.ts";
import {articleService} from "../../services/articleService.ts";
import {setArticles} from "../../store/slices/articleSlice.ts";
import React from "react";

export default function Header() {
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
        <header className="header">
            <div className="header-top">
                <div className="logo">
                    <img src={currentChannel.image_url} alt="Channel Logo"/>
                </div>

                <div className="header-actions">
                    <button className="search-button" onClick={() => navigate('/search')}>Tìm kiếm</button>
                    <button className="user-button" onClick={() => navigate('/account')}>Avatar</button>
                </div>
            </div>

            <nav className="navbar">
                <ul className="nav-menu-list">
                    {parentCategories.map((parent: any) => {
                        const childCategories = categories.filter((child: any) => child.parent_id === parent.id);

                        return (
                            <li key={parent.id} className="nav-item">
                                <a className="nav-link" onClick={(e) => handleSetCurrent(e, parent)}>
                                    {parent.categoryName}
                                </a>
                                {childCategories.length > 0 && (
                                <ul className="dropdown-menu">
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
        </header>
    )
}
