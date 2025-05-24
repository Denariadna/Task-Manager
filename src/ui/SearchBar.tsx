import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setSearchTerm } from '../core/taskSlice';
import { Input } from '@/ui/input';
import { useCallback } from 'react';
import { debounce } from '../utils/debounce';
import { X } from 'lucide-react';

// строка поиска задач с debounce и кнопкой очистки
const SearchBar = () => {
    const dispatch = useDispatch();
    const searchTerm = useSelector((state: RootState) => state.tasks.searchTerm); // текущее значение поиска

    // обновление строки поиска с задержкой
    const handleSearch = useCallback(
        debounce((value: string) => {
            dispatch(setSearchTerm(value));
        }, 300),
        []
    );

    // очистка строки поиска
    const handleClear = () => {
        dispatch(setSearchTerm(''));
    };

    return (
        <div className="relative mb-4 w-full">
            {/* поле ввода поиска */}
            <Input
                defaultValue={searchTerm}
                placeholder="Поиск по задачам..."
                onChange={e => handleSearch(e.target.value)}
                className={
                    searchTerm.length > 0
                        ? 'border-blue-500 focus-visible:ring-blue-500 pr-10' // подсветка при вводе
                        : 'pr-10'
                }
            />

            {/* кнопка очистки (появляется только при активном поиске) */}
            {searchTerm.length > 0 && (
                <button
                    onClick={handleClear}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-red-500 transition"
                >
                    <X size={16} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
