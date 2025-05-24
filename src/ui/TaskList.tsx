import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TaskItem from './TaskItem';
import { Task } from '../core/model';

const TaskList = () => {
    const { tasks, filter, searchTerm, groupBy } = useSelector((state: RootState) => state.tasks);

    const todayDate = new Date();
    const startOfDay = new Date(todayDate);
    startOfDay.setHours(0, 0, 0, 0);

    const isInDateRange = (task: Task): boolean => {
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);

        switch (filter.dateRange) {
            case 'today':
                return due.getTime() === startOfDay.getTime();
            case 'week':
                const weekFromToday = new Date(startOfDay);
                weekFromToday.setDate(startOfDay.getDate() + 7);
                return due >= startOfDay && due <= weekFromToday;
            case 'month':
                const monthFromToday = new Date(startOfDay);
                monthFromToday.setMonth(startOfDay.getMonth() + 1);
                return due >= startOfDay && due <= monthFromToday;
            case 'overdue':
                return due < startOfDay;
            default:
                return true;
        }
    };

    const filteredTasks = tasks.filter((task: Task) => {
        const statusMatch =
            filter.status === 'all' ||
            (filter.status === 'completed' && task.completed) ||
            (filter.status === 'active' && !task.completed);

        const priorityMatch = filter.priority === 'all' || task.priority === filter.priority;

        const searchMatch = task.title.toLowerCase().includes(searchTerm.toLowerCase());

        const dateMatch = isInDateRange(task);

        return statusMatch && priorityMatch && searchMatch && dateMatch;
    });

    const groupedByPriority = () => {
        const priorities = ['high', 'medium', 'low'];
        return priorities
            .map(priority => ({
                priority,
                tasks: filteredTasks.filter(t => t.priority === priority),
            }))
            .filter(group => group.tasks.length > 0);
    };

    if (!filteredTasks.length) {
        return <p className="text-muted-foreground">Нет задач по выбранным фильтрам.</p>;
    }

    if (groupBy === 'priority') {
        return (
            <div className="space-y-4">
                {groupedByPriority().map(group => (
                    <div key={group.priority}>
                        <h3 className="font-semibold capitalize mb-2">
                            {group.priority === 'high' && '🔥 Высокий приоритет'}
                            {group.priority === 'medium' && '🟡 Средний приоритет'}
                            {group.priority === 'low' && '🟢 Низкий приоритет'}
                        </h3>
                        <div className="space-y-2">
                            {group.tasks.map(task => (
                                <TaskItem key={task.id} task={task} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-2">
            {filteredTasks.map(task => (
                <TaskItem key={task.id} task={task} />
            ))}
        </div>
    );
};

export default TaskList;
