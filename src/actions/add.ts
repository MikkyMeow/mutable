import { ITodo } from "../App";

export const add = (todos: ITodo[], id: string, text: string): ITodo[] => {
  return [...todos, { id, text, checked: false }];
};
