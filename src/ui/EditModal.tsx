import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editTask } from '../core/taskSlice';
import { Task } from '../core/model';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { useEffect } from 'react';

interface EditModalProps {
    task: Task; // редактируемая задача
    open: boolean; // флаг открытия модального окна
    onClose: () => void; // колбэк закрытия окна
}

interface FormValues {
    title: string;
    dueDate: string;
    tags: string; // строка тегов через запятую
}

const EditModal = ({ task, open, onClose }: EditModalProps) => {
    const dispatch = useDispatch();

    // инициализация формы с начальными значениями
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            title: task.title,
            dueDate: task.dueDate,
            tags: task.tags.join(', '),
        },
    });

    // при открытии модалки — сбрасываем поля на текущие значения задачи
    useEffect(() => {
        if (open) {
            reset({
                title: task.title,
                dueDate: task.dueDate,
                tags: task.tags.join(', '),
            });
        }
    }, [open, task, reset]);

    // сохранение изменений задачи
    const onSubmit = (data: FormValues) => {
        const parsedTags = data.tags
            .split(',')
            .map(t => t.trim())
            .filter(Boolean); // преобразуем строку тегов в массив

        dispatch(editTask({ ...task, title: data.title, dueDate: data.dueDate, tags: parsedTags }));
        onClose();
    };

    const today = new Date().toISOString().split('T')[0]; // текущая дата для валидации

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать задачу</DialogTitle>
                </DialogHeader>

                {/* форма редактирования задачи */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* поле ввода заголовка */}
                    <Input
                        placeholder="Название"
                        {...register('title', {
                            required: 'Это поле обязательно',
                            minLength: { value: 3, message: 'Минимум 3 символа' },
                        })}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

                    {/* поле выбора даты */}
                    <Input
                        type="date"
                        {...register('dueDate', {
                            required: 'Укажите дату',
                            validate: value =>
                                value >= today || 'Дата не может быть раньше текущей',
                        })}
                    />
                    {errors.dueDate && (
                        <p className="text-sm text-red-500">{errors.dueDate.message}</p>
                    )}

                    {/* поле ввода тегов */}
                    <Input placeholder="Теги (через запятую)" {...register('tags')} />

                    {/* кнопки действия */}
                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Отмена
                        </Button>
                        <Button type="submit">Сохранить</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditModal;
