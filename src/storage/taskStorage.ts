import { Task } from '../core/model';

const TASKS_KEY = 'tasks';
const FILTERS_KEY = 'task_filters';

export const saveTasks = (tasks: Task[]) => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
};

export const loadTasks = (): Task[] => {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
};

export const saveFilterSettings = (filters: {
    status: string;
    priority: string;
    searchTerm: string;
    groupBy: string;
}) => {
    localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
};

export const loadFilterSettings = (): {
    status: string;
    priority: string;
    searchTerm: string;
    groupBy: string;
} => {
    const data = localStorage.getItem(FILTERS_KEY);
    return data
        ? JSON.parse(data)
        : { status: 'all', priority: 'all', searchTerm: '', groupBy: 'none' };
};
