import { useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoAddItem from './TodoAddItem';
import SortTodos from './SortTodos';
import FilterTodos from './FilterTodos';
import useLocalStorage from '../hooks/useLocalStorage';

function todolistReducer(todolist, { type, payload }) {
  switch (type) {
    case 'add':
      return [...todolist, payload];
    case 'remove':
      return todolist.filter((todo) => todo.id !== payload);
    case 'checkToggle':
      return todolist.map((todo) =>
        todo.id === payload ? { ...todo, isChecked: !todo.isChecked } : todo
      );
    case 'edit':
      return todolist.map((todo) =>
        todo.id === payload.id ? { ...todo, ...payload } : todo
      );
    default:
      throw new Error(`Unknown Type Error: ${type}`);
  }
}

function Todolist() {
  const [todolist, dispatch] = useLocalStorage('todolist', todolistReducer, []);
  const [sortedBy, setSortedBy] = useState('newest');
  const [filter, setFilter] = useState('all');
  const dialogRef = useRef();

  const today = {
    weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    day: new Date().toLocaleDateString('en-US', { day: '2-digit' }),
    month: new Date().toLocaleDateString('en-US', { month: 'short' }),
    year: new Date().toLocaleDateString('en-US', { year: 'numeric' }),
  };
  const formattedToday = `${today.weekday}, ${today.month} ${today.day}, ${today.year}`;

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

  const handleTodoAdd = (todo) => {
    dispatch({ type: 'add', payload: todo });
  };

  const handleTodoCheckToggle = (todoId) => {
    dispatch({ type: 'checkToggle', payload: todoId });
  };

  const handleTodoRemove = (todoId) => {
    dispatch({ type: 'remove', payload: todoId });
  };

  const handleTodoEdit = (editedTodo) => {
    dispatch({ type: 'edit', payload: editedTodo });
  };

  return (
    <div className="todolist">
      <div className="todolist__header">
        <div>
          <h1 className="todolist__title">Todo List</h1>
          <p className="todolist__date">{formattedToday}</p>
        </div>
        <button
          className="btn btn--primary"
          type="button"
          onClick={() => dialogRef.current?.showModal()}
        >
          New Todo
        </button>
        <TodoAddItem dialogRef={dialogRef} onTodoSubmit={handleTodoAdd} />
      </div>

      <div className="todolist__filter-section">
        <FilterTodos
          filterBy={filter}
          onFilter={(filterBy) => setFilter(filterBy)}
          todolist={todolist}
        />
        <SortTodos
          sortedBy={sortedBy}
          onSort={(sortedBy) => setSortedBy(sortedBy)}
        />
      </div>

      <div className="todolist__body">
        {sortedTodolist.length === 0 && (
          <p className="todolist__item--empty">There is nothing here...</p>
        )}
        {sortedTodolist.map((todo) => (
          <TodoItem
            key={todo.id}
            todoData={todo}
            onCheckToggle={handleTodoCheckToggle}
            onRemove={handleTodoRemove}
            onEdit={handleTodoEdit}
          />
        ))}
      </div>
    </div>
  );
}
export default Todolist;
