import { useTodolist } from '../context/TodolistContext';
import TodoItem from './TodoItem';

function TodoItems({ filter, sortedBy }) {
  const todolist = useTodolist();

  let filteredTodolist;
  switch (filter) {
    case 'all':
      filteredTodolist = todolist;
      break;
    case 'todo':
      filteredTodolist = todolist.filter((todo) => !todo.isChecked);
      break;
    case 'done':
      filteredTodolist = todolist.filter((todo) => todo.isChecked);
      break;
  }

  let sortedTodolist;
  switch (sortedBy) {
    case 'newest':
      sortedTodolist = [...filteredTodolist].sort(
        (a, b) => new Date(b.editedAt) - new Date(a.editedAt)
      );
      break;
    case 'oldest':
      sortedTodolist = [...filteredTodolist].sort(
        (a, b) => new Date(a.editedAt) - new Date(b.editedAt)
      );
      break;
  }

  if (sortedTodolist.length === 0)
    return <p className="todolist__item--empty">There is nothing here...</p>;

  return sortedTodolist.map((todo) => (
    <TodoItem key={todo.id} todoData={todo} />
  ));
}
export default TodoItems;
