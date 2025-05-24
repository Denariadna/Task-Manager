import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Button } from '@/ui/button';
import { setStatusFilter, setPriorityFilter } from '../core/taskSlice';

// панель фильтрации задач по статусу и приоритету
const FilterPanel = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state: RootState) => state.tasks.filter); // текущие фильтры

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {/* блок фильтра по статусу */}
            <span className="text-sm font-semibold w-full">Статус:</span>
            <Button
                variant={filter.status === 'all' ? 'default' : 'outline'} // если выбран — активный стиль
                onClick={() => dispatch(setStatusFilter('all'))}
            >
                Все
            </Button>
            <Button
                variant={filter.status === 'completed' ? 'default' : 'outline'}
                onClick={() => dispatch(setStatusFilter('completed'))}
            >
                Выполненные
            </Button>
            <Button
                variant={filter.status === 'active' ? 'default' : 'outline'}
                onClick={() => dispatch(setStatusFilter('active'))}
            >
                Активные
            </Button>

            {/* блок фильтра по приоритету */}
            <span className="text-sm font-semibold w-full pt-2">Приоритет:</span>
            <Button
                variant={filter.priority === 'low' ? 'default' : 'outline'}
                onClick={() => dispatch(setPriorityFilter('low'))}
            >
                Низкий
            </Button>
            <Button
                variant={filter.priority === 'medium' ? 'default' : 'outline'}
                onClick={() => dispatch(setPriorityFilter('medium'))}
            >
                Средний
            </Button>
            <Button
                variant={filter.priority === 'high' ? 'default' : 'outline'}
                onClick={() => dispatch(setPriorityFilter('high'))}
            >
                Высокий
            </Button>
            <Button
                variant={filter.priority === 'all' ? 'default' : 'outline'}
                onClick={() => dispatch(setPriorityFilter('all'))}
            >
                Все приоритеты
            </Button>
        </div>
    );
};

export default FilterPanel;
