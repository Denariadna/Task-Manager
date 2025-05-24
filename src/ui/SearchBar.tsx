import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { setSearchTerm } from '../core/taskSlice';
import { Input } from '@/ui/input';
import { debounce } from '../utils/debounce';

const SearchBar = () => {
    const dispatch = useDispatch();

    const handleSearch = useCallback(
        debounce((value: string) => {
            dispatch(setSearchTerm(value));
        }, 300),
        []
    );

    return (
        <div className="mb-4">
            <Input placeholder="Поиск по задачам..." onChange={e => handleSearch(e.target.value)} />
        </div>
    );
};

export default SearchBar;
