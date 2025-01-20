import { useRef, useState } from 'react';
import TodoItem from './TodoItem';
import TodoAddItem from './TodoAddItem';

function Todolist() {
  const [todolist, setTodolist] = useState([]);
  const dialogRef = useRef();

  const today = {
    weekday: new Date().toLocaleDateString('en-US', { weekday: 'long' }),
    day: new Date().toLocaleDateString('en-US', { day: '2-digit' }),
    month: new Date().toLocaleDateString('en-US', { month: 'short' }),
    year: new Date().toLocaleDateString('en-US', { year: 'numeric' }),
  };
  const formattedToday = `${today.weekday}, ${today.month} ${today.day}, ${today.year}`;

  const handleTodolist = (todo) => {
    setTodolist([...todolist, todo]);
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

      <div className="todolist__body">
        {todolist.length === 0 && (
          <p className="todolist__item--empty">There is nothing todo...</p>
        )}
        {todolist.map((todo) => (
          <TodoItem key={todo.id} todoData={todo} />
        ))}
      </div>
    </div>
  );
}
export default Todolist;
