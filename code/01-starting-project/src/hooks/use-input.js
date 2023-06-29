import React, { useReducer, useState } from "react";

const defaultState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  }

  if (action.type === "RESET") {
    return { value: "", isTouched: false };
  }

  return { defaultState };
};

const useInput = (validateValue) => {
  const [inputState, dispatchAction] = useReducer(
    inputStateReducer,
    defaultState
  );
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  // const valueIsValid = validateValue(enteredValue);
  // const hasError = !valueIsValid && isTouched;
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    // setEnteredValue(event.target.value);
    dispatchAction({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = () => {
    // setIsTouched(true);
    dispatchAction({ type: "BLUR" });
  };

  const reset = () => {
    // setEnteredValue("");
    // setIsTouched(false);
    dispatchAction({ type: "RESET" });
  };

  return {
    // value: enteredValue,
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
