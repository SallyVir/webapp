import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import HomePage from '../pages/Home/HomePage';
import ArticleDetailPage from '../pages/ArticleDetail/ArticleDetailPage';
import CategoryPage from '../pages/Category/CategoryPage';
import SearchPage from '../pages/Search/SearchPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import AccountPage from '../pages/Account/AccountPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/articles/:id",
        element: <ArticleDetailPage />,
    },
    {
        path: "/categories/:categoryName",
        element: <CategoryPage />,
    },
    {
        path: "/search",
        element: <SearchPage />,
    },
    {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    {
        path: "/account",
        element: <AccountPage />,
    },
    {
        path: "*",
        element: (
            <div>
                <h2>Không tìm thấy trang yêu cầu</h2>
            </div>
        ),
    },
]);

export default function AppRoutes() {
    return <RouterProvider router={router} />;
}