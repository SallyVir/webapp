# Tài liệu Kết nối API Backend (FastAPI) cho ReactJS

Tài liệu hướng dẫn kết nối và cấu hình API cho ứng dụng Tin tức (Scraper News App).

---

## 1. Cấu hình Cơ bản (Base URLs)
* **Môi trường Production (Render):** `https://my-python-server-vm3c.onrender.com`
---

## 2. Bảng Thống Kê Chi Tiết Endpoints

| STT | Nhóm Chức Năng | Method | Endpoint | Dữ liệu truyền lên (Payload / Query) | Mô tả chi tiết |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **1** | **Đăng ký** | `POST` | `/api/register` | `{"userName": "...", "password": "..."}` | Tạo tài khoản người dùng mới. |
| **2** | **Đăng nhập** | `POST` | `/api/login` | `{"userName": "...", "password": "..."}` | Xác thực tài khoản. Lưu lại `user_id` & `userName` ở Client. |
| **3** | **Đổi mật khẩu** | `POST` | `/api/change-password` | `{"userName": "...", "old_password": "...", "new_password": "..."}` | Cập nhật mật khẩu người dùng. |
| **4** | **Đăng xuất** | `POST` | `/api/logout` | *(Không cần)* | Phía React tự xóa Token/User khỏi `localStorage`. |
| **5** | **Thêm bình luận** | `POST` | `/api/comments` | `{"article_id": 1, "user_id": 1, "content": "..."}` | Thêm bình luận cho một bài báo. |
| **6** | **Bình luận theo bài báo** | `GET` | `/api/articles/{article_id}/comments` | *(Path Parameter)* | Lấy danh sách bình luận hiển thị dưới trang bài báo. |
| **7** | **Bình luận theo User** | `GET` | `/api/users/{user_id}/comments` | *(Path Parameter)* | Lấy lịch sử bình luận của một người dùng. |
| **8** | **Lưu / Bỏ lưu bài báo** | `POST` | `/api/save-article` | `{"user_id": 1, "article_id": 1}` | Cơ chế **Toggle**: Đã lưu thì hủy lưu, chưa lưu thì thêm lưu. |
| **9** | **Danh sách bài đã lưu** | `GET` | `/api/users/{user_id}/saved-articles` | *(Path Parameter)* | Lấy danh sách các bài báo người dùng đã bấm lưu. |
| **10**| **Tất cả chuyên mục** | `GET` | `/api/categories` | *(Không có)* | Lấy danh sách chuyên mục đổ ra Navbar/Menu. |
| **11**| **Bài báo theo chuyên mục**| `GET` | `/api/categories/{category_name}/articles` | *(Path Parameter)* | Lấy danh sách các bài báo thuộc chuyên mục được chọn. |
| **12**| **Chi tiết bài báo** | `GET` | `/api/articles/{article_id}` | *(Path Parameter)* | Lấy thông tin chi tiết bài viết: `title`, `author`, `content`, `pubDate`,... |
| **13**| **Tìm kiếm bài báo** | `GET` | `/api/articles/search` | Query: `?keyword=từ_khóa` | Tìm kiếm bài báo theo từ khóa tiêu đề. |
| **14**| **Đồng bộ dữ liệu RSS** | `POST` | `/api/sync-rss` | *(Không có)* | Kích hoạt cào bài mới từ báo Tiền Phong về DB. |
| **15**| **Ping giữ thức Server** | `GET` | `/ping` | *(Không có)* | Dành cho Cron-job ping định kỳ 10 phút/lần. |

---

## 3. Mẫu Code Gọi API cho React.js

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://my-python-server-vm3c.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const registerUser = (userData) => API.post('/api/register', userData);
export const loginUser = (userData) => API.post('/api/login', userData);
export const changePassword = (data) => API.post('/api/change-password', data);

export const getCategories = () => API.get('/api/categories');
export const getArticlesByCategory = (categoryName) => 
  API.get(`/api/categories/${encodeURIComponent(categoryName)}/articles`);
export const getArticleDetail = (articleId) => API.get(`/api/articles/${articleId}`);
export const searchArticles = (keyword) => API.get(`/api/articles/search?keyword=${encodeURIComponent(keyword)}`);

export const getCommentsByArticle = (articleId) => API.get(`/api/articles/${articleId}/comments`);
export const getUserComments = (userId) => API.get(`/api/users/${userId}/comments`);
export const addComment = (commentData) => API.post('/api/comments', commentData);

export const toggleSaveArticle = (saveData) => API.post('/api/save-article', saveData);
export const getSavedArticles = (userId) => API.get(`/api/users/${userId}/saved-articles`);
```