import { ITodo } from "../App";

export const edit = (todos: ITodo[], id: string, value: string): ITodo[] => {
  return todos.map((todo) =>
    todo.id === id ? { ...todo, text: value } : todo
  );
};
