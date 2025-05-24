import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { addTask } from '../core/taskSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

interface FormValues {
    title: string;
    dueDate: string;
}

const TaskInput = () => {
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const today = new Date().toISOString().split('T')[0];

    const onSubmit = (data: FormValues) => {
        dispatch(
            addTask({
                id: uuidv4(),
                title: data.title,
                completed: false,
                priority: 'medium',
                date: new Date().toISOString(),
                tags: [],
                dueDate: data.dueDate,
            })
        );
        reset();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-start gap-2 mb-4 flex-col sm:flex-row"
        >
            <div className="w-full sm:w-auto flex-1 space-y-1">
                <Input
                    placeholder="Введите задачу"
                    {...register('title', {
                        required: 'Это поле обязательно',
                        minLength: { value: 3, message: 'Минимум 3 символа' },
                    })}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
            </div>

            <div className="w-full sm:w-auto flex-1 space-y-1">
                <Input
                    type="date"
                    {...register('dueDate', {
                        required: 'Укажите дату',
                        validate: value => value >= today || 'Дата не может быть раньше текущей',
                    })}
                />
                {errors.dueDate && <p className="text-sm text-red-500">{errors.dueDate.message}</p>}
            </div>

            <Button type="submit">Добавить</Button>
        </form>
    );
};

export default TaskInput;
