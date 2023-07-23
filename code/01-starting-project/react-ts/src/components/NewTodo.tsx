import React, { useContext, useRef } from "react";
import classes from "./NewTodo.module.css";
import { TodosContext } from "../store/todos-context";

// const NewTodo: React.FC<{ onAddTodo: (text: string) => void }> = (props) => {
const NewTodo: React.FC = () => {
  // this needs an initial value, as well as type
  const todoTextInputRef = useRef<HTMLInputElement>(null);
  const todosCtx = useContext(TodosContext);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    // use the ? when working with values that COULD be null
    // so ? := try to get that value
    // the ? checks if it can get the value
    // the ! means I am SURE
    // that the value can't be null or undefined
    const enteredText = todoTextInputRef.current!.value;

    if (enteredText.trim().length === 0) {
      // throw an error
      return;
    }

    // props.onAddTodo(enteredText);
    todosCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">Todo text</label>
      <input type="text" id="text" ref={todoTextInputRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodo;
