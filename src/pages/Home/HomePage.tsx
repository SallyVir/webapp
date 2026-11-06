import type { Article } from '../../types/article';
import FeaturedArticleList from '../../components/articles/FeaturedArticleList';
import ArticleList from '../../components/articles/ArticleList';

const mockArticles: Article[] = [
    {
        id: 1,
        title: 'Tổng bí thư: Chuyển đổi số là động lực quan trọng phát triển kinh tế',
        description: 'Chuyển đổi số không chỉ là xu hướng mà đã trở thành yêu cầu bắt buộc để nâng cao năng suất và năng lực cạnh tranh.',
        pubDate: '06/11/2026',
        updated: '06/11/2026',
        guid: 'https://tienphong.vn/article-1',
        link: 'https://tienphong.vn/article-1',
        category: 'Thời sự',
        thumb: 'https://picsum.photos/300/200?random=1',
        image: 'https://picsum.photos/800/450?random=1',
        author: 'Văn Nam',
        content: 'Nội dung chi tiết bài viết 1...'
    },
    {
        id: 2,
        title: 'Giá vàng hôm nay tăng mạnh trở lại lập kỷ lục mới',
        description: 'Thị trường vàng trong nước ghi nhận mức tăng đáng kể theo đà tăng của thị trường thế giới.',
        pubDate: '06/11/2026',
        updated: '06/11/2026',
        guid: 'https://tienphong.vn/article-2',
        link: 'https://tienphong.vn/article-2',
        category: 'Kinh tế',
        thumb: 'https://picsum.photos/300/200?random=2',
        image: 'https://picsum.photos/800/450?random=2',
        author: 'Thu Hương',
        content: 'Nội dung chi tiết bài viết 2...'
    },
    {
        id: 3,
        title: 'Tuyển Việt Nam tích cực chuẩn bị cho giải đấu lớn sắp tới',
        description: 'BHL cùng các cầu thủ đang hoàn thiện những khâu cuối cùng về thể lực và kỹ thuật.',
        pubDate: '06/11/2026',
        updated: '06/11/2026',
        guid: 'https://tienphong.vn/article-3',
        link: 'https://tienphong.vn/article-3',
        category: 'Thể thao',
        thumb: 'https://picsum.photos/300/200?random=3',
        image: 'https://picsum.photos/800/450?random=3',
        author: 'Minh Đạt',
        content: 'Nội dung chi tiết bài viết 3...'
    }
];

export default function HomePage() {
    return (
        <div className="container my-4">
            <h2 className="mb-3 text-danger fw-bold">Tin nổi bật</h2>
            <FeaturedArticleList articles={mockArticles} />

            <h2 className="my-4 text-primary fw-bold">Tin mới nhất</h2>
            <ArticleList articles={mockArticles} />
        </div>
    );
}