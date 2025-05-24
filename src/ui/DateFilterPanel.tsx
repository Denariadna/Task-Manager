import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Button } from '@/ui/button';
import { setDateRange } from '../core/taskSlice';

// панель выбора фильтра по сроку задачи
const DateFilterPanel = () => {
    const dispatch = useDispatch();
    const current = useSelector((state: RootState) => state.tasks.filter.dateRange); // текущий фильтр

    // отрисовка кнопки с подсветкой активного фильтра
    const renderButton = (label: string, value: typeof current) => (
        <Button
            variant={current === value ? 'default' : 'outline'} // если выбран — подсвечиваем
            onClick={() => dispatch(setDateRange(value))} // при клике меняем фильтр
        >
            {label}
        </Button>
    );

    return (
        <div className="flex flex-wrap gap-2 mb-4">
            {renderButton('Все даты', 'all')}
            {renderButton('Сегодня', 'today')}
            {renderButton('Неделя', 'week')}
            {renderButton('Месяц', 'month')}
            {renderButton('Просроченные', 'overdue')}
        </div>
    );
};

export default DateFilterPanel;
