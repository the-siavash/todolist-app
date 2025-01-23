function FilterTodos({ filterBy, onFilter, todolist }) {
  const checkedTodos = todolist.reduce(
    (acc, todo) => (todo.isChecked ? (acc += 1) : 0),
    0
  );

  const filterItems = [
    { text: 'all', length: todolist.length },
    { text: 'todo', length: todolist.length - checkedTodos },
    { text: 'done', length: checkedTodos },
  ];

  return (
    <ul className="filter__items">
      {filterItems.map((filterItem) => (
        <FilterItem
          key={filterItem.text}
          item={filterItem}
          classNames={`filter__item ${filterItem === filterBy && 'selected'}`}
          handleClick={onFilter}
        />
      ))}
    </ul>
  );
}
export default FilterTodos;

function FilterItem({ item, classNames, handleClick }) {
  return (
    <li className={classNames} onClick={() => handleClick(item.text)}>
      {item.text} ({item.length})
    </li>
  );
}
