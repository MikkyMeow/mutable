import { ITodo } from "../App";

export const remove = (todos: ITodo[], id: string): ITodo[] => {
    return todos.filter(todo => todo.id !== id);
}