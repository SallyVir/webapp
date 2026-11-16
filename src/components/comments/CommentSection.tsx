import { useEffect, useState } from 'react';
import { commentService } from '../../services/commentService';
import type { Comment } from '../../types/comment';
import type { User } from '../../types/user';
import CommentItem from './CommentItem';

export default function CommentSection({
                                           articleId,
                                           articleLink = ''
                                       }: {
    articleId: number;
    articleLink?: string;
}) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const [currentUser] = useState<User | null>(() => {
        const saved = localStorage.getItem('user');
        return saved ? JSON.parse(saved) : null;
    });

    const activeUserId = currentUser ? Number(currentUser.id) : 98023;
    const greetingName = currentUser ? currentUser.name : '98023';

    const loadComments = async () => {
        if (!articleId) return;
        try {
            const list = await commentService.getCommentsByArticle(articleId);
            setComments(Array.isArray(list) ? list : []);
        } catch {
            setComments([]);
        }
    };

    useEffect(() => {
        loadComments();
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;

        setSubmitting(true);
        const payload = {
            user_id: activeUserId,
            article_id: articleId,
            content: content.trim(),
            article_link: articleLink
        };

        try {
            await commentService.addComment(payload);
            setContent('');
            await loadComments();
        } catch {

            const tempComment: Comment = {
                id: Date.now(),
                article_id: articleId,
                article_link: articleLink,
                user_id: activeUserId,
                content: content.trim(),
                comment_time: new Date().toISOString()
            };
            setComments([tempComment, ...comments]);
            setContent('');
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateComment = async (commentId: number, newContent: string) => {
        try {
            await commentService.updateComment(commentId, newContent);
            await loadComments();
        } catch {
            setComments(comments.map((c) => (c.id === commentId ? { ...c, content: newContent } : c)));
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await commentService.deleteComment(commentId);
            await loadComments();
        } catch {
            setComments(comments.filter((c) => c.id !== commentId));
        }
    };

    return (
        <div className="my-4">
            <h4 className="text-uppercase fw-normal text-dark mb-3" style={{ letterSpacing: '0.5px' }}>
                Ý KIẾN {comments.length > 0 && <span className="text-muted fs-6">({comments.length})</span>}
            </h4>

            <form onSubmit={handleSubmit}>
                <div
                    className="border rounded-3 p-3 bg-white position-relative"
                    style={{ borderColor: '#dee2e6' }}
                >
          <textarea
              className="form-control border-0 shadow-none p-0 mb-5"
              rows={3}
              placeholder={`Chào ${greetingName}, hãy nhập ý kiến của bạn?`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              style={{ resize: 'vertical', fontSize: '15px' }}
              required
          />
                    <button
                        type="submit"
                        disabled={submitting}
                        className="btn text-white fw-bold text-uppercase position-absolute bottom-0 end-0 m-3 px-3 py-2"
                        style={{
                            backgroundColor: '#e31818',
                            borderRadius: '6px',
                            fontSize: '13px'
                        }}
                    >
                        {submitting ? 'ĐANG GỬI...' : 'GỬI Ý KIẾN'}
                    </button>
                </div>
            </form>

            <div className="mt-3">
                {comments.map((item) => (
                    <CommentItem
                        key={item.id}
                        comment={item}
                        currentUserId={activeUserId}
                        onUpdate={handleUpdateComment}
                        onDelete={handleDeleteComment}
                    />
                ))}
            </div>
        </div>
    );
}