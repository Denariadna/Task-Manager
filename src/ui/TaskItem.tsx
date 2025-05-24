import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from '../core/model';
import { toggleTask, deleteTask, setActiveTag } from '../core/taskSlice';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import EditModal from './EditModal';

interface Props {
    task: Task; // данные задачи
}

const TaskItem = ({ task }: Props) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false); // состояние открытия модалки

    // проверка просроченности задачи
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    const isOverdue = dueDate < today;

    // цвета приоритетов
    const priorityColors: Record<Task['priority'], string> = {
        high: 'bg-red-500',
        medium: 'bg-yellow-500',
        low: 'bg-green-500',
    };

    // установка активного тега при клике
    const handleTagClick = (tag: string) => {
        dispatch(setActiveTag(tag));
    };

    return (
        <div className="flex flex-col bg-white shadow rounded-lg px-4 py-3 border border-gray-200 space-y-2">
            <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1 flex-1">
                    {/* строка с приоритетом, чекбоксом и названием */}
                    <div className="flex items-center gap-2">
                        <span
                            className={`w-2.5 h-2.5 rounded-full ${priorityColors[task.priority]}`}
                            title={task.priority}
                        />
                        <Checkbox
                            checked={task.completed}
                            onCheckedChange={() => dispatch(toggleTask(task.id))} // переключение выполнено/не выполнено
                        />
                        <span
                            className={task.completed ? 'line-through text-muted-foreground' : ''}
                        >
                            {task.title}
                        </span>
                    </div>

                    {/* срок выполнения */}
                    <span
                        className={`text-xs ${
                            isOverdue ? 'text-red-500 font-semibold' : 'text-gray-500'
                        }`}
                    >
                        Срок: {task.dueDate} {isOverdue ? '(Просрочено)' : ''}
                    </span>

                    {/* отображение тегов */}
                    {task.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                            {task.tags.map(tag => (
                                <span
                                    key={tag}
                                    onClick={() => handleTagClick(tag)} // фильтрация по тегу
                                    className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full cursor-pointer hover:bg-blue-200"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* кнопки редактирования и удаления */}
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
            </div>

            {/* модальное окно редактирования */}
            <EditModal task={task} open={isEditing} onClose={() => setIsEditing(false)} />
        </div>
    );
};

export default TaskItem;
