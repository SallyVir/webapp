const WEEKDAYS: string[] = [
    'Chủ nhật',
    'Thứ hai',
    'Thứ ba',
    'Thứ tư',
    'Thứ năm',
    'Thứ sáu',
    'Thứ bảy',
];

function formatDateTime(value?: string): string {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    const pad = (n: number) => String(n).padStart(2, '0');
    return `${WEEKDAYS[date.getDay()]}, ${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function AuthorInfo({
                                       author,
                                       pubDate,
                                       updated
                                   }: {
    author?: string;
    pubDate?: string;
    updated?: string;
}) {
    const authorName = author?.trim() || 'Tiền Phong';
    const initial = authorName.charAt(0).toUpperCase();
    const published = formatDateTime(pubDate);
    const updatedText = formatDateTime(updated);
    const showUpdated = !!updatedText && updatedText !== published;

    return (
        <div className="d-flex align-items-center gap-3 py-3 border-top border-bottom">
            <div
                className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold flex-shrink-0"
                style={{ width: '44px', height: '44px', backgroundColor: 'var(--primary-color)' }}
            >
                {initial}
            </div>

            <div>
                <div className="fw-bold text-dark">{authorName}</div>
                <small className="text-muted">
                    {published}
                    {showUpdated && ` • Cập nhật: ${updatedText}`}
                </small>
            </div>
        </div>
    );
}