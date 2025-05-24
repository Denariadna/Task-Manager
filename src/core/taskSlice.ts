import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './model';
import { saveTasks } from '../storage/taskStorage';

// описание структуры состояния задач
interface TaskState {
    tasks: Task[]; // список задач
    filter: {
        status: 'all' | 'completed' | 'active'; // фильтр по статусу
        priority: 'all' | 'low' | 'medium' | 'high'; // фильтр по приоритету
        dateRange: 'all' | 'today' | 'week' | 'month' | 'overdue'; // фильтр по дате
    };
    searchTerm: string; // строка поиска
    groupBy: 'none' | 'priority'; // группировка задач
    activeTag: string | null; // активный тег для фильтрации
}

// начальное состояние
const initialState: TaskState = {
    tasks: [],
    filter: {
        status: 'all',
        priority: 'all',
        dateRange: 'all',
    },
    searchTerm: '',
    groupBy: 'none',
    activeTag: null,
};

// создание слайса Redux
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        // замена всего списка задач
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        // добавление задачи + сохранение
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            saveTasks(state.tasks);
        },
        // переключение статуса задачи + сохранение
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) task.completed = !task.completed;
            saveTasks(state.tasks);
        },
        // удаление задачи + сохранение
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
            saveTasks(state.tasks);
        },
        // редактирование задачи + сохранение
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
            saveTasks(state.tasks);
        },

        // установка фильтра по статусу
        setStatusFilter: (state, action: PayloadAction<TaskState['filter']['status']>) => {
            state.filter.status = action.payload;
        },
        // установка фильтра по приоритету
        setPriorityFilter: (state, action: PayloadAction<TaskState['filter']['priority']>) => {
            state.filter.priority = action.payload;
        },
        // установка диапазона по дате
        setDateRange: (state, action: PayloadAction<TaskState['filter']['dateRange']>) => {
            state.filter.dateRange = action.payload;
        },

        // установка строки поиска
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },

        // группировка задач (по приоритету / без)
        setGroupBy: (state, action: PayloadAction<'none' | 'priority'>) => {
            state.groupBy = action.payload;
        },

        // установка активного тега для фильтрации
        setActiveTag: (state, action: PayloadAction<string>) => {
            state.activeTag = action.payload;
        },
        // сброс активного тега
        clearActiveTag: state => {
            state.activeTag = null;
        },
    },
});

// экспорт действий и редьюсера
export const {
    setTasks,
    addTask,
    toggleTask,
    deleteTask,
    editTask,
    setStatusFilter,
    setPriorityFilter,
    setDateRange,
    setSearchTerm,
    setGroupBy,
    setActiveTag,
    clearActiveTag,
} = taskSlice.actions;

export default taskSlice.reducer;
