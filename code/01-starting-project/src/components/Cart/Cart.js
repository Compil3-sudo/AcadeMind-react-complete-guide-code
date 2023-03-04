import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Alert from "@mui/material/Alert";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemremoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const [displayWarning, setDisplayWarning] = useState(true);

  const cartItemAddHandler = (item) => {
    if (item.amount === 10) {
      setDisplayWarning(false);
      return;
    } else {
      cartCtx.addSingleItem(item);
    }
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemremoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {!displayWarning && (
        <Alert severity="warning" onClose={() => setDisplayWarning(true)}>
          This prevents you from adding infinite items. It can also prevent you
          from adding items if they are out of stock.
        </Alert>
      )}
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
