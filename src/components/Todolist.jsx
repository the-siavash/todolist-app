import { useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoAddItem from './TodoAddItem';
import SortTodos from './SortTodos';
import FilterTodos from './FilterTodos';
import useLocalStorage from '../hooks/useLocalStorage';

function Todolist() {
  const [todolist, setTodolist] = useLocalStorage('todolist', []);
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

  const handleTodolist = (todo) => {
    setTodolist([...todolist, todo]);
  };

  const handleTodoCheckToggle = (todoId) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((todo) =>
        todo.id === todoId ? { ...todo, isChecked: !todo.isChecked } : todo
      )
    );
  };

  const handleTodoRemove = (todoId) => {
    setTodolist((prevTodolist) =>
      prevTodolist.filter((todo) => todo.id !== todoId)
    );
  };

  const handleTodoEdit = (editedTodo) => {
    setTodolist((prevTodolist) =>
      prevTodolist.map((todo) =>
        todo.id === editedTodo.id ? { ...todo, ...editedTodo } : todo
      )
    );
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
        <TodoAddItem dialogRef={dialogRef} onTodoSubmit={handleTodolist} />
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
        {todolist.length === 0 && (
          <p className="todolist__item--empty">There is nothing todo...</p>
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
