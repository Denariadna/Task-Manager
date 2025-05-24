import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { editTask } from '../core/taskSlice';
import { Task } from '../core/model';
import { Button } from '@/ui/button';
import { Input } from '@/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/ui/dialog';
import { useEffect } from 'react';

interface EditModalProps {
    task: Task;
    open: boolean;
    onClose: () => void;
}

interface FormValues {
    title: string;
    dueDate: string;
}

const EditModal = ({ task, open, onClose }: EditModalProps) => {
    const dispatch = useDispatch();
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
        },
    });

    useEffect(() => {
        if (open) {
            reset({
                title: task.title,
                dueDate: task.dueDate,
            });
        }
    }, [open, task, reset]);

    const onSubmit = (data: FormValues) => {
        dispatch(editTask({ ...task, title: data.title, dueDate: data.dueDate }));
        onClose();
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать задачу</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        placeholder="Название"
                        {...register('title', {
                            required: 'Это поле обязательно',
                            minLength: { value: 3, message: 'Минимум 3 символа' },
                        })}
                    />
                    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

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
