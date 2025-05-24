import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './model';
import { saveTasks } from '../storage/taskStorage';

interface TaskState {
    tasks: Task[];
    filter: {
        status: 'all' | 'completed' | 'active';
        priority: 'all' | 'low' | 'medium' | 'high';
        dateRange: 'all' | 'today' | 'week' | 'month' | 'overdue';
    };
    searchTerm: string;
    groupBy: 'none' | 'priority';
}

const initialState: TaskState = {
    tasks: [],
    filter: {
        status: 'all',
        priority: 'all',
        dateRange: 'all',
    },
    searchTerm: '',
    groupBy: 'none',
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            saveTasks(state.tasks);
        },
        toggleTask: (state, action: PayloadAction<string>) => {
            const task = state.tasks.find(t => t.id === action.payload);
            if (task) task.completed = !task.completed;
            saveTasks(state.tasks);
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(t => t.id !== action.payload);
            saveTasks(state.tasks);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(t => t.id === action.payload.id);
            if (index !== -1) state.tasks[index] = action.payload;
            saveTasks(state.tasks);
        },
        setStatusFilter: (state, action: PayloadAction<TaskState['filter']['status']>) => {
            state.filter.status = action.payload;
        },
        setPriorityFilter: (state, action: PayloadAction<TaskState['filter']['priority']>) => {
            state.filter.priority = action.payload;
        },
        setDateRange: (state, action: PayloadAction<TaskState['filter']['dateRange']>) => {
            state.filter.dateRange = action.payload;
        },
        setSearchTerm: (state, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
        },
        setGroupBy: (state, action: PayloadAction<'none' | 'priority'>) => {
            state.groupBy = action.payload;
        },
    },
});

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
} = taskSlice.actions;

export default taskSlice.reducer;
