import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import {
    setTasks,
    setGroupBy,
    setPriorityFilter,
    setSearchTerm,
    setStatusFilter,
    setDateRange,
} from './core/taskSlice';

import { loadFilterSettings, saveFilterSettings, loadTasks } from './storage/taskStorage';

import TaskInput from './ui/TaskInput';
import TaskList from './ui/TaskList';
import FilterPanel from './ui/FilterPanel';
import SearchBar from './ui/SearchBar';
import GroupToggle from './ui/GroupToggle';
import DateFilterPanel from './ui/DateFilterPanel';

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
        dispatch(setDateRange(filters.dateRange as any));
        setIsLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (!isLoaded) return;
        saveFilterSettings({
            status: filter.status,
            priority: filter.priority,
            dateRange: filter.dateRange,
            searchTerm,
            groupBy,
        });
    }, [filter, searchTerm, groupBy, isLoaded]);

    return (
        <main className="min-h-screen bg-gray-50 text-gray-800 py-6 px-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
                <h1 className="text-3xl font-bold text-center text-blue-600">Task Manager</h1>
                <TaskInput />
                <FilterPanel />
                <SearchBar />
                <DateFilterPanel />
                <GroupToggle />
                <TaskList />
            </div>
        </main>
    );
}

export default App;
