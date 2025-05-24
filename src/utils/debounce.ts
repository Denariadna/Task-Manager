// функция debounce — задержка выполнения до окончания паузы
export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
    let timer: ReturnType<typeof setTimeout>; // ссылка на таймер

    return (...args: Parameters<T>) => {
        clearTimeout(timer); // сброс предыдущего таймера
        timer = setTimeout(() => fn(...args), delay); // новый запуск через delay
    };
}
