// описание интерфейса задачи
export interface Task {
    id: string; // уникальный идентификатор задачи
    title: string; // заголовок задачи
    completed: boolean; // флаг выполнения
    priority: 'low' | 'medium' | 'high'; // приоритет задачи
    date: string; // дата создания
    tags: string[]; // список тегов
    dueDate: string; // срок выполнения
}
