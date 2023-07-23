import React, { useContext } from "react";
import Todo from "../models/todo";
import TodoItem from "./TodoItem";
import classes from "./Todos.module.css";
import { TodosContext } from "../store/todos-context";

// const Todos: React.FC<{ items: Todo[]; onRemoveTodo: (id: string) => void }> = (props)
const Todos: React.FC = () => {
  const todosCtx = useContext(TodosContext);

  return (
    <ul className={classes.todos}>
      {/* {props.items.map((item) => ( */}
      {todosCtx.items.map((item) => (
        <TodoItem
          key={item.id}
          text={item.text}
          // onRemoveTodo={props.onRemoveTodo.bind(null, item.id)}
          onRemoveTodo={todosCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default Todos;
