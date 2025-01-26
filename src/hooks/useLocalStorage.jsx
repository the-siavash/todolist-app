import { useEffect, useReducer } from 'react';

function useLocalStorage(key, reducerFunction, initialValue) {
  const [state, dispatch] = useReducer(
    reducerFunction,
    JSON.parse(localStorage.getItem(key)) || initialValue
  );

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state]);

  return [state, dispatch];
}
export default useLocalStorage;
