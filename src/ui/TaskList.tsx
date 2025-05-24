import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TaskItem from './TaskItem';
import { Task } from '../core/model';
import { motion, AnimatePresence } from 'framer-motion';

// компонент отображения списка задач
const TaskList = () => {
    const { tasks, filter, searchTerm, groupBy, activeTag } = useSelector(
        (state: RootState) => state.tasks
    );

    // подготовка текущей даты для сравнения
    const todayDate = new Date();
    const startOfDay = new Date(todayDate);
    startOfDay.setHours(0, 0, 0, 0);

    // функция фильтрации по диапазону дат
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

    // основная фильтрация задач по всем параметрам
    const filteredTasks = tasks.filter((task: Task) => {
        const statusMatch =
            filter.status === 'all' ||
            (filter.status === 'completed' && task.completed) ||
            (filter.status === 'active' && !task.completed);

        const priorityMatch = filter.priority === 'all' || task.priority === filter.priority;

        const searchMatch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const dateMatch = isInDateRange(task);

        const tagMatch = activeTag ? task.tags.includes(activeTag) : true;

        // работа фильтрации
        return statusMatch && priorityMatch && searchMatch && dateMatch && tagMatch;
    });

    // группировка задач по приоритету
    const groupedByPriority = () => {
        const priorities = ['high', 'medium', 'low'];
        return priorities
            .map(priority => ({
                priority,
                tasks: filteredTasks.filter(t => t.priority === priority),
            }))
            .filter(group => group.tasks.length > 0);
    };

    // если задач нет — показываем сообщение
    if (!filteredTasks.length) {
        return <p className="text-muted-foreground">Нет задач по выбранным фильтрам.</p>;
    }

    // отображение задач с группировкой по приоритету
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
                            <AnimatePresence>
                                {group.tasks.map(task => (
                                    <motion.div
                                        key={task.id}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <TaskItem task={task} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // обычное отображение без группировки
    return (
        <div className="space-y-2">
            <AnimatePresence>
                {filteredTasks.map(task => (
                    <motion.div
                        key={task.id}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <TaskItem task={task} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;
