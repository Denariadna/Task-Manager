import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setGroupBy } from '../core/taskSlice';
import { Button } from '@/ui/button';

// переключатель группировки задач (без / по приоритету)
const GroupToggle = () => {
    const dispatch = useDispatch();
    const groupBy = useSelector((state: RootState) => state.tasks.groupBy); // текущее состояние группировки

    return (
        <div className="mb-4 flex gap-2">
            {/* кнопка отключения группировки */}
            <Button
                variant={groupBy === 'none' ? 'default' : 'outline'} // активный стиль
                onClick={() => dispatch(setGroupBy('none'))}
            >
                Без группировки
            </Button>

            {/* кнопка включения группировки по приоритету */}
            <Button
                variant={groupBy === 'priority' ? 'default' : 'outline'}
                onClick={() => dispatch(setGroupBy('priority'))}
            >
                Группировать по приоритету
            </Button>
        </div>
    );
};

export default GroupToggle;
