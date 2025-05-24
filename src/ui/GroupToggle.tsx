import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setGroupBy } from '../core/taskSlice';
import { Button } from '@/ui/button';

const GroupToggle = () => {
    const dispatch = useDispatch();
    const groupBy = useSelector((state: RootState) => state.tasks.groupBy);

    return (
        <div className="mb-4 flex gap-2">
            <Button
                variant={groupBy === 'none' ? 'default' : 'outline'}
                onClick={() => dispatch(setGroupBy('none'))}
            >
                Без группировки
            </Button>
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
