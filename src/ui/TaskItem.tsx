import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../core/model';
import { toggleTask, deleteTask } from '../core/taskSlice';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import EditModal from './EditModal';

interface Props {
    task: Task;
}

const TaskItem = ({ task }: Props) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const isOverdue = dueDate < today;

    return (
        <div className="flex items-start justify-between border rounded-lg px-4 py-2 gap-4">
            <div className="flex flex-col gap-1 flex-1">
                <div className="flex items-center gap-2">
                    <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => dispatch(toggleTask(task.id))}
                    />
                    <span className={task.completed ? 'line-through text-muted-foreground' : ''}>
                        {task.title}
                    </span>
                </div>
                <span
                    className={`text-xs ${
                        isOverdue ? 'text-red-500 font-semibold' : 'text-gray-500'
                    }`}
                >
                    Срок: {task.dueDate} {isOverdue ? '(Просрочено)' : ''}
                </span>
            </div>

            <div className="flex gap-2 items-center">
                <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    Редактировать
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => dispatch(deleteTask(task.id))}
                >
                    Удалить
                </Button>
            </div>

            <EditModal task={task} open={isEditing} onClose={() => setIsEditing(false)} />
        </div>
    );
};

export default TaskItem;
