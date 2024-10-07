import { ITodo } from "../App";

export const setChecked = (todos: ITodo[], id: string, value: boolean) => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, checked: value } : todo
  );
};
