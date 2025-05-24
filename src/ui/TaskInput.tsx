import { useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { addTask } from '../core/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/ui/select';

interface FormValues {
    title: string;
    dueDate: string;
    priority: 'low' | 'medium' | 'high';
}

// компонент добавления задачи
const TaskInput = () => {
    const dispatch = useDispatch();

    // инициализация формы с react-hook-form
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            priority: 'medium', // приоритет по умолчанию
        },
    });

    const today = new Date().toISOString().split('T')[0];
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]); // список текущих тегов

    // добавление одного тега
    const handleAddTag = () => {
        const trimmed = tagInput.trim();
        if (trimmed && !tags.includes(trimmed)) {
            setTags([...tags, trimmed]);
            setTagInput('');
        }
    };

    // удаление одного тега
    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter(t => t !== tag));
    };

    // отправка формы (создание задачи)
    const onSubmit = (data: FormValues) => {
        dispatch(
            addTask({
                id: uuidv4(),
                title: data.title,
                completed: false,
                priority: data.priority || 'medium',
                date: new Date().toISOString(),
                dueDate: data.dueDate,
                tags,
            })
        );
        reset(); // очистка полей формы
        setTags([]);
        setTagInput('');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mb-4">
            {/* блок ввода названия и даты */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Input
                    placeholder="Введите задачу"
                    {...register('title', {
                        required: 'Это поле обязательно',
                        minLength: { value: 3, message: 'Минимум 3 символа' },
                    })}
                />
                <Input
                    type="date"
                    {...register('dueDate', {
                        required: 'Укажите дату',
                        validate: value => value >= today || 'Дата не может быть раньше текущей',
                    })}
                />
            </div>

            {/* приоритет, тег и кнопка + на одной строке */}
            <div className="flex flex-wrap gap-2 items-center">
                <Controller
                    control={control}
                    name="priority"
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-fit">
                                <SelectValue placeholder="Выберите приоритет" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Низкий</SelectItem>
                                <SelectItem value="medium">Средний</SelectItem>
                                <SelectItem value="high">Высокий</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                <Input
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    placeholder="Введите тег"
                    className="w-auto"
                />
                <Button type="button" onClick={handleAddTag}>
                    +
                </Button>
            </div>

            {/* отображение добавленных тегов ниже */}
            {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            onClick={() => handleRemoveTag(tag)}
                            className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full cursor-pointer"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {/* отображение ошибок валидации */}
            <div className="text-sm text-red-500">
                {errors.title && <p>{errors.title.message}</p>}
                {errors.dueDate && <p>{errors.dueDate.message}</p>}
            </div>

            {/* кнопка отправки */}
            <Button type="submit">Добавить</Button>
        </form>
    );
};

export default TaskInput;
