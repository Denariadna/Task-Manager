import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Button } from '@/ui/button';
import { setDateRange } from '../core/taskSlice';

const DateFilterPanel = () => {
    const dispatch = useDispatch();
    const current = useSelector((state: RootState) => state.tasks.filter.dateRange);

    const renderButton = (label: string, value: typeof current) => (
        <Button
            variant={current === value ? 'default' : 'outline'}
            onClick={() => dispatch(setDateRange(value))}
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
