import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
    setTasks,
    setGroupBy,
    setPriorityFilter,
    setSearchTerm,
    setStatusFilter,
} from './core/taskSlice';

import { loadFilterSettings, saveFilterSettings, loadTasks } from './storage/taskStorage';

import TaskInput from './ui/TaskInput';
import TaskList from './ui/TaskList';
import FilterPanel from './ui/FilterPanel';
import SearchBar from './ui/SearchBar';
import GroupToggle from './ui/GroupToggle';

function App() {
    const dispatch = useDispatch();
    const { filter, searchTerm, groupBy } = useSelector((state: RootState) => state.tasks);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(setTasks(loadTasks()));
        const filters = loadFilterSettings();
        dispatch(setStatusFilter(filters.status as any));
        dispatch(setPriorityFilter(filters.priority as any));
        dispatch(setSearchTerm(filters.searchTerm));
        dispatch(setGroupBy(filters.groupBy as any));
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isLoaded) return;

        saveFilterSettings({
            status: filter.status,
            priority: filter.priority,
            searchTerm,
            groupBy,
        });
    }, [filter, searchTerm, groupBy, isLoaded]);

    return (
        <main className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Task Manager</h1>
            <TaskInput />
            <FilterPanel />
            <SearchBar />
            <GroupToggle />
            <TaskList />
        </main>
    );
}

export default App;
