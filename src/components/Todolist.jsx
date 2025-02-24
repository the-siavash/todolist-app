import { useRef, useState } from 'react';
import TodoAddItem from './TodoAddItem';
import TodoItems from './TodoItems';
import SortTodos from './SortTodos';
import FilterTodos from './FilterTodos';

function Todolist() {
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
        <TodoAddItem dialogRef={dialogRef} />
      </div>

      <div className="todolist__filter-section">
        <FilterTodos
          filterBy={filter}
          onFilter={(filterBy) => setFilter(filterBy)}
        />
        <SortTodos
          sortedBy={sortedBy}
          onSort={(sortedBy) => setSortedBy(sortedBy)}
        />
      </div>

      <div className="todolist__body">
        <TodoItems filter={filter} sortedBy={sortedBy} />
      </div>
    </div>
  );
}
export default Todolist;
