import { useState } from 'react';

export default function SearchBar({
                                      keyword,
                                      onChangeKeyword,
                                      onSubmit,
                                      onQuickSearch
                                  }: {
    keyword: string;
    onChangeKeyword: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onQuickSearch?: (kw: string) => void;
}) {
    const [recentKeywords, setRecentKeywords] = useState<string[]>(() => {
        const saved = localStorage.getItem('search_history');
        return saved ? JSON.parse(saved) : [];
    });

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = keyword.trim();
        if (trimmed) {
            const updated = [trimmed, ...recentKeywords.filter((k) => k !== trimmed)].slice(0, 5);
            setRecentKeywords(updated);
            localStorage.setItem('search_history', JSON.stringify(updated));
        }
        onSubmit(e);
    };

    const handleClearHistory = () => {
        localStorage.removeItem('search_history');
        setRecentKeywords([]);
    };

    return (
        <div className="mb-4">
            <form onSubmit={handleFormSubmit} className="d-flex gap-2">
                <input
                    type="text"
                    className="form-control rounded-1 py-2"
                    placeholder="Nhập từ khóa tìm kiếm..."
                    value={keyword}
                    onChange={(e) => onChangeKeyword(e.target.value)}
                />
                <button
                    type="submit"
                    className="btn text-white fw-bold px-4 py-2 text-nowrap"
                    style={{ backgroundColor: '#e31818', borderRadius: '4px' }}
                >
                    Tìm kiếm
                </button>
            </form>

            {recentKeywords.length > 0 && (
                <div className="d-flex align-items-center flex-wrap gap-2 mt-2" style={{ fontSize: '13px' }}>
                    <span className="text-muted">Tìm gần đây:</span>
                    {recentKeywords.map((item) => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => {
                                onChangeKeyword(item);
                                onQuickSearch && onQuickSearch(item);
                            }}
                            className="btn btn-sm btn-light border rounded-pill px-2 py-0 text-dark"
                        >
                            {item}
                        </button>
                    ))}
                    <button
                        type="button"
                        onClick={handleClearHistory}
                        className="btn btn-link p-0 text-muted text-decoration-none ms-1"
                        style={{ fontSize: '12px' }}
                    >
                        (Xóa)
                    </button>
                </div>
            )}
        </div>
    );
}