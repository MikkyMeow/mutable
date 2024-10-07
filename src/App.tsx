import { FormEvent, useCallback, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { Button, TextField } from "@mui/material";
import { edit } from "./actions/edit";
import { getRandomHash } from "./helpers";
import { add } from "./actions/add";
import { remove } from "./actions/remove";
import styles from "./App.module.css";
import { setChecked } from "./actions/setChecked";

export interface ITodo {
  id: string;
  text: string;
  checked: boolean;
}

// баги
// Если инпут пустой. оставлять прежнее значение

const App = () => {
  const [todoId, setTodoId] = useState(NaN);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEdit, setIsEdit] = useState("");

  const fetchTodos = useCallback(async () => {
    const { data: fetchedData, error } = await supabase
      .from("todo")
      .select("*");
    if (error) {
      console.error("Ошибка загрузки данных:", error);
    } else {
      setTodoId(fetchedData[0].id);
      setTodos(fetchedData[0].todo);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  const updateTodos = async () => {
    const { error } = await supabase
      .from("todo")
      .update({ todo: todos })
      .eq("id", todoId);

    if (error) {
      console.log(error);
    } else {
      fetchTodos();
    }
  };

  if (isLoading) return <div>Загрузка...</div>;

  return (
    <div className={styles.root}>
      {todos.map((todo) => (
        <div key={todo.id} className={styles.todo}>
          <>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={todo.checked}
              onChange={(e) =>
                setTodos(setChecked(todos, todo.id, e.target.checked))
              }
            />
            {todo.id !== isEdit ? (
              <p className={styles.text} onClick={() => setIsEdit(todo.id)}>
                {todo.text}{" "}
              </p>
            ) : (
              <input
                className={styles.editInput}
                autoFocus
                defaultValue={todo.text}
                onBlur={(e) => {
                  setTodos(edit(todos, todo.id, e.target.value));
                  setIsEdit("");
                }}
              />
            )}
            <button
              className={styles.removeButton}
              onClick={() => setTodos(remove(todos, todo.id))}
            >
              X
            </button>
          </>
        </div>
      ))}
      <TextField
        variant="standard"
        placeholder="New value"
        onBlur={(e) => {
          setTodos(add(todos, getRandomHash(), e.target.value));
          e.target.value = "";
        }}
      />
      <div>
        <Button variant="outlined" onClick={updateTodos}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default App;
