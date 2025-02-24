import Todolist from './components/Todolist';
import { TodolistProvider } from './context/TodolistContext';

export default function App() {
  return (
    <div className="container">
      <TodolistProvider>
        <Todolist />
      </TodolistProvider>
    </div>
  );
}
