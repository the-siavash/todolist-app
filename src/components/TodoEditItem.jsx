import { useState } from 'react';

function TodoEditItem({ dialogRef, onTodoEdit, todoData }) {
  const [title, setTitle] = useState(todoData.title);
  const [description, setDescription] = useState(todoData.description);

  const editTodo = () => {
    if (!title || !description) return null;
    const editedTodo = {
      ...todoData,
      title: title,
      description: description,
      editedAt: new Date().toISOString(),
    };
    onTodoEdit(editedTodo);
  };

  const handleSubmitClick = () => {
    editTodo();
    dialogRef.current.close();
  };

  const handleCancelClick = () => {
    setTitle(todoData.title);
    setDescription(todoData.description);
    dialogRef.current.close();
  };

  const handleEscape = (e) => {
    if (e.key === 'Escape') {
      setTitle(todoData.title);
      setDescription(todoData.description);
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
            Edit Task
          </button>
        </div>
      </div>
    </dialog>
  );
}
export default TodoEditItem;
