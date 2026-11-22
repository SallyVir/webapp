import { useState } from 'react';
import type { FormEvent } from 'react';
import Button from '../../../components/common/Button';
import Input from '../../../components/common/Input';

interface SearchBarProps {
    initialValue?: string;
    loading?: boolean;
    onSearch: (keyword: string) => void;
}

export default function SearchBar({ initialValue = '', loading = false, onSearch }: SearchBarProps) {
    const [value, setValue] = useState(initialValue);
    const [prevInitial, setPrevInitial] = useState(initialValue);

    if (prevInitial !== initialValue) {
        setPrevInitial(initialValue);
        setValue(initialValue);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const keyword = value.trim();
        if (!keyword) return;
        onSearch(keyword);
    };

    return (
        <form onSubmit={handleSubmit} role="search" className="d-flex gap-2 align-items-start">
            <Input
                type="search"
                inputSize="lg"
                wrapperClassName="flex-grow-1"
                placeholder="Nhập từ khóa tìm kiếm..."
                aria-label="Từ khóa tìm kiếm"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <Button type="submit" size="lg" loading={loading}>
                Tìm kiếm
            </Button>
        </form>
    );
}