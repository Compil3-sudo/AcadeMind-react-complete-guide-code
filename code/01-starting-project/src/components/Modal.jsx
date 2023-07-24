import React from "react";
import classes from "./Modal.module.css";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate();

  const closeHandler = () => {
    navigate("/");
  };

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler}></div>
      <dialog open className={classes.modal}>
        {props.children}
      </dialog>
    </>
  );
};

export default Modal;
