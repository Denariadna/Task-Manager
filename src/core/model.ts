export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
    date: string;
    tags: string[];
    dueDate: string;
}
