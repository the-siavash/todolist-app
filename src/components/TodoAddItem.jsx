import { useState } from 'react';
import { useTodolistDispatch } from '../context/TodolistContext';

function TodoAddItem({ dialogRef }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useTodolistDispatch();

  const createTodo = () => {
    if (!title || !description) return null;
    const todo = {
      id: Date.now(),
      isChecked: false,
      title: title,
      description: description,
      createdAt: new Date().toISOString(),
      editedAt: new Date().toISOString(),
    };
    dispatch({ type: 'add', payload: todo });
    setTitle('');
    setDescription('');
  };

  const handleSubmitClick = () => {
    createTodo();
    dialogRef.current.close();
  };

  const handleCancelClick = () => {
    setTitle('');
    setDescription('');
    dialogRef.current.close();
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setTitle('');
      setDescription('');
    }
  };

  return (
    <dialog ref={dialogRef} className="dialog" onKeyDown={handleEscape}>
      <div className="dialog__content">
        <form onSubmit={(event) => event.preventDefault()}>
          <input
            type="text"
            placeholder="Task name here..."
            autoComplete="off"
            className="todolist__input-title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <textarea
            placeholder="Description"
            className="todolist__input-description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </form>
        <div className="dialog__buttons">
          <button
            className="btn btn--secondary"
            type="button"
            onClick={() => handleCancelClick()}
          >
            Cancel
          </button>
          <button
            className="btn btn--primary"
            type="submit"
            onClick={() => handleSubmitClick()}
            disabled={!title || !description}
          >
            Add Task
          </button>
        </div>
      </div>
    </dialog>
  );
}
export default TodoAddItem;
