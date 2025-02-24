import { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TodolistContext = createContext(null);
const TodolistDispatchContext = createContext(null);

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

export const TodolistProvider = ({ children }) => {
  const [todolist, dispatch] = useLocalStorage('todolist', todolistReducer, []);
  return (
    <TodolistContext.Provider value={todolist}>
      <TodolistDispatchContext.Provider value={dispatch}>
        {children}
      </TodolistDispatchContext.Provider>
    </TodolistContext.Provider>
  );
};

export const useTodolist = () => {
  const context = useContext(TodolistContext);
  if (context === undefined)
    throw new Error('TodolistContext is used outside of TodolistProvider...');
  return context;
};

export const useTodolistDispatch = () => {
  const context = useContext(TodolistDispatchContext);
  if (context === undefined)
    throw new Error(
      'TodolistDispatchContext is used outside of TodolistDispatchProvider...'
    );
  return context;
};
