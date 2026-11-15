import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/common/Button';
import { saveArticleService } from '../../../services/saveArticleService';
import type { Article } from '../../../types/article';
import type { User } from '../../../types/user';

function getStoredUser(): User | null {
    try {
        const saved = localStorage.getItem('user');
        return saved ? (JSON.parse(saved) as User) : null;
    } catch {
        return null;
    }
}

export default function ArticleActions({ article }: { article: Article }) {
    const navigate = useNavigate();
    const [user] = useState<User | null>(getStoredUser);
    const [saveId, setSaveId] = useState<number | null>(null);
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);

    const userId = user ? Number(user.id) : null;

    const findSaveId = async (uid: number): Promise<number | null> => {
        const list = await saveArticleService.getSavedArticles(uid);
        const found = Array.isArray(list) ? list.find((s) => Number(s.article_id) === article.id) : undefined;
        return found ? found.id : null;
    };

    // check save or not
    useEffect(() => {
        if (userId === null) return;
        let cancelled = false;
        findSaveId(userId)
            .then((id) => {
                if (!cancelled) setSaveId(id);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId, article.id]);

    const handleToggleSave = async () => {
        if (userId === null) {
            navigate('/login');
            return;
        }

        setSaving(true);
        try {
            if (saveId !== null) {
                await saveArticleService.removeSavedArticle(saveId);
                setSaveId(null);
            } else {
                await saveArticleService.saveArticle(userId, article.id, article.link);
                setSaveId(await findSaveId(userId));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error(error);
        }
    };

    const isSaved = saveId !== null;

    return (
        <div className="d-flex flex-wrap gap-2 my-3">
            <Button
                size="sm"
                variant={isSaved ? 'danger' : 'outline-danger'}
                loading={saving}
                onClick={handleToggleSave}
            >
                {isSaved ? 'Đã lưu bài' : 'Lưu bài'}
            </Button>

            <Button size="sm" variant="outline-secondary" onClick={handleCopyLink}>
                {copied ? 'Đã sao chép liên kết' : 'Sao chép liên kết'}
            </Button>
        </div>
    );
}