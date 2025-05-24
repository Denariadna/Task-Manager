# 🗂️ Task Manager

Полноценное приложение для управления задачами с фильтрами, тегами, локальным хранилищем и деплоем на GitHub Pages.

## 🔗 Демо

[https://Denariadna.github.io/Task-Manager](https://Denariadna.github.io/Task-Manager)

---

## ⚙️ Технологии

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [GitHub Pages](https://pages.github.com/)

---

## 🚀 Запуск проекта

```bash
git clone https://github.com/Denariadna/Task-Manager.git
cd Task-Manager
npm install
npm run dev
```

---

## 📦 Сборка и деплой

```bash
npm run build
npm run deploy
```

> Деплой на GitHub Pages: публикуется в ветке `gh-pages`

---

## 📋 Функциональность

- ✅ Добавление, удаление и редактирование задач
- ✅ Указание срока выполнения (dueDate)
- ✅ Выбор приоритета (низкий, средний, высокий)
- ✅ Теги с возможностью фильтрации
- ✅ Поиск по задачам и тегам с debounce
- ✅ Фильтры:
  - Статус: все / выполненные / активные
  - Приоритет: все / low / medium / high
  - Дата: сегодня / неделя / месяц / просроченные
  - Тег: при клике на #тег
- ✅ Группировка по приоритету
- ✅ Подсветка активных фильтров
- ✅ Локальное сохранение задач и фильтров
- ✅ Анимация задач
- ✅ Единый UI стиль с shadcn/ui
- ✅ Адаптивный дизайн

---

## 🗂️ Структура проекта

```
src/
├── app/               # Redux store
├── core/              # Модель, Slice
├── storage/           # Работа с localStorage
├── ui/                # Компоненты интерфейса
├── utils/             # Утилиты (debounce и пр.)
├── index.tsx          # Точка входа
├── App.tsx            # Главный компонент
├── main.css           # Стили
```