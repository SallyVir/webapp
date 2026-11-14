import { useState } from 'react';
import type { Comment } from '../../types/comment';

export default function CommentItem({
                                        comment,
                                        currentUserId,
                                        onUpdate,
                                        onDelete
                                    }: {
    comment: Comment;
    currentUserId?: number;
    onUpdate?: (commentId: number, newContent: string) => Promise<void>;
    onDelete?: (commentId: number) => Promise<void>;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);

    const isOwner = currentUserId !== undefined && Number(comment.user_id) === Number(currentUserId);
    const displayName = `Độc giả #${comment.user_id}`;
    const initial = String(comment.user_id || 'Đ').charAt(0).toUpperCase();

    const handleSaveEdit = async () => {
        if (!editContent.trim() || !onUpdate) return;
        await onUpdate(comment.id, editContent.trim());
        setIsEditing(false);
    };

    return (
        <div className="d-flex gap-3 py-3 border-bottom">
            <div
                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{ width: '40px', height: '40px', backgroundColor: '#9c4dcc' }}
            >
                {initial}
            </div>

            <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-center mb-1">
                    <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-dark" style={{ fontSize: '15px' }}>
              {displayName}
            </span>
                        <small className="text-muted">
                            • {comment.comment_time ? new Date(comment.comment_time).toLocaleString('vi-VN') : 'Vừa xong'}
                        </small>
                    </div>

                    {isOwner && !isEditing && (
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none text-muted"
                                style={{ fontSize: '13px' }}
                                onClick={() => setIsEditing(true)}
                            >
                                Sửa
                            </button>
                            <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none text-danger"
                                style={{ fontSize: '13px' }}
                                onClick={() => onDelete && onDelete(comment.id)}
                            >
                                Xóa
                            </button>
                        </div>
                    )}
                </div>

                {isEditing ? (
                    <div className="mt-2">
            <textarea
                className="form-control form-control-sm mb-2"
                rows={2}
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
            />
                        <div className="d-flex gap-2 justify-content-end">
                            <button
                                type="button"
                                className="btn btn-sm btn-light"
                                onClick={() => {
                                    setIsEditing(false);
                                    setEditContent(comment.content);
                                }}
                            >
                                Hủy
                            </button>
                            <button type="button" className="btn btn-sm btn-danger" onClick={handleSaveEdit}>
                                Lưu
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="mb-0 text-dark" style={{ lineHeight: '1.5', fontSize: '15px' }}>
                        {comment.content}
                    </p>
                )}
            </div>
        </div>
    );
}