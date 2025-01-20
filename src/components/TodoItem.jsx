import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function TodoItem({ todoData, onCheckToggle, onRemove }) {
  const formattedDate = new Date(todoData.editedAt).toLocaleDateString(
    'en-US',
    {
      dateStyle: 'medium',
    }
  );

  return (
    <div
      className={`todolist__item ${
        todoData.isChecked && 'todolist__item--checked'
      }`}
    >
      <FontAwesomeIcon
        icon={todoData.isChecked ? faCircleCheck : faCircle}
        size="lg"
        className="todolist__icon-check"
        onClick={() => onCheckToggle(todoData.id)}
      />
      <div className="todolist__item-content">
        <h2 className="todolist__item-title">{todoData.title}</h2>
        <p className="todolist__item-description">{todoData.description}</p>
        <p className="flex items-center gap-1">
          <span className="todolist__item-date">{formattedDate}</span>
          <span className="todolist__icon-edit">edit</span>
          <span
            className="todolist__icon-remove"
            onClick={() => onRemove(todoData.id)}
          >
            remove
          </span>
        </p>
      </div>
    </div>
  );
}
export default TodoItem;
