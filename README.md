Nhóm components/articles/ — các components cho articles

| File           | Ý nghĩa                                                                               |
| -------------- |---------------------------------------------------------------------------------------|
| ArticleCard.tsx     | ô article cơ bản                                                                      |                               
| ArticleList.tsx    | danh sách article                                                                     |
| CompactArticleList.tsx  | danh sách article gom cụm                                                             |
| FeaturedArticleList.tsx    | danh sách article theo hướng ngang là 1 cái to( MainArticleCard) + CompactArticleList |
| MainArticleCard.tsx    | ô article lớn nhất                                                                    |
| SubArticleCard.tsx   | các ô article bé hơn                                                                  |

# ArticleCard
![img.png](src/assets/img.png)

# ArticleList
![img_1.png](src/assets/img_1.png)

# CompactArticleList
![img_2.png](src/assets/img_2.png)

# FeaturedArticleList
![img_3.png](src/assets/img_3.png)

# MainArticleCard
![img_4.png](src/assets/img_4.png)

# SubArticleCard
![img_5.png](src/assets/img_5.png)
hoặc
![img_6.png](src/assets/img_6.png)

Nhóm components/comments/ — các components cho comments

| File                | Ý nghĩa               |
| ------------------- |-----------------------|
| CommentItem.tsx    | 1 thẻ comment         |
| CommentSection.tsx | danh sách các comment |

![img_7.png](src/assets/img_7.png)

Nhóm components/common/ — các thứ linh tinh để dùng cho các thức khác

| File               | Ý nghĩa              |
| ------------------ |----------------------|
| Button.tsx | Nút để sài nhiều nơi |
| Input.tsx  | khung input          |

# Button.tsx
![img_8.png](src/assets/img_8.png)

# Input.tsx
![img_9.png](src/assets/img_9.png)

Nhóm components/layout/ — chứa header và footer

| File                  | Ý nghĩa    |
| --------------------- |------------|
| Header.tsx      | Đầu trang  |
| Footer.tsx | Cuối trang |

# Header.tsx
![img_10.png](src/assets/img_10.png)

# Footer.tsx
![img_11.png](src/assets/img_11.png)

# assets : nơi chứa ảnh, vid,... và bây giờ css nằm ở trong đó luôn
# layout: mainlayout là layout tổng sử dụng cho mọi trang
# pages: Chứa từng page và các component riêng cho page(các component này dành riêng cho page này)
# routes: nơi chứa đường dẫn
# utils: nơi chứa các hàm chuyển đổi linh tinh