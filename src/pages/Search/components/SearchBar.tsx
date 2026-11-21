export default function SearchBar({
                                      keyword,
                                      onChangeKeyword,
                                      onSubmit
                                  }: {
    keyword: string;
    onChangeKeyword: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}) {
    return (
        <form onSubmit={onSubmit} className="d-flex gap-2 mb-4">
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
    );
}