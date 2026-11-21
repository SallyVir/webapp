const CATEGORIES = [
    { id: '', name: 'Tất cả chuyên mục' },
    { id: '1', name: 'Thời sự' },
    { id: '2', name: 'Kinh tế' },
    { id: '3', name: 'Thế giới' },
    { id: '4', name: 'Giải trí' },
    { id: '5', name: 'Thể thao' },
    { id: '6', name: 'Giáo dục' }
];

const TIME_RANGES = [
    { id: 'all', name: 'Tất cả thời gian' },
    { id: 'today', name: 'Hôm nay' },
    { id: 'week', name: '7 ngày qua' },
    { id: 'month', name: '30 ngày qua' }
];

export default function SearchFilterSidebar({
                                                selectedCategory,
                                                onSelectCategory,
                                                selectedTime,
                                                onSelectTime
                                            }: {
    selectedCategory: string;
    onSelectCategory: (id: string) => void;
    selectedTime: string;
    onSelectTime: (id: string) => void;
}) {
    return (
        <div className="bg-light border rounded-1 p-3">
            <h6 className="fw-bold text-uppercase text-dark border-bottom pb-2 mb-3">
                Chuyên mục
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-4">
                {CATEGORIES.map((cat) => (
                    <li key={cat.id}>
                        <button
                            type="button"
                            onClick={() => onSelectCategory(cat.id)}
                            className={`btn btn-link p-0 text-decoration-none ${
                                selectedCategory === cat.id ? 'text-danger fw-bold' : 'text-dark'
                            }`}
                            style={{ fontSize: '14px' }}
                        >
                            {cat.name}
                        </button>
                    </li>
                ))}
            </ul>

            <h6 className="fw-bold text-uppercase text-dark border-bottom pb-2 mb-3">
                Thời gian
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
                {TIME_RANGES.map((t) => (
                    <li key={t.id}>
                        <button
                            type="button"
                            onClick={() => onSelectTime(t.id)}
                            className={`btn btn-link p-0 text-decoration-none ${
                                selectedTime === t.id ? 'text-danger fw-bold' : 'text-dark'
                            }`}
                            style={{ fontSize: '14px' }}
                        >
                            {t.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}