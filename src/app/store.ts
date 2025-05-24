import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../core/taskSlice';

// создание Redux store
export const store = configureStore({
    reducer: {
        tasks: taskReducer, // подключение слайса задач
    },
});

// типизация состояния всего стора
export type RootState = ReturnType<typeof store.getState>;

// типизация dispatch для использования в хуках
export type AppDispatch = typeof store.dispatch;
