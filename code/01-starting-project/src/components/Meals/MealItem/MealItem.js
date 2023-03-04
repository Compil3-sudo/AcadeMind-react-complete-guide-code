import React, { useContext, useState } from "react";
import CartContext from "../../../store/cart-context";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import { Alert } from "@mui/material";

const MealItem = (props) => {
  const cartCtx = useContext(CartContext);
  const [displayWarning, setDisplayWarning] = useState(false);

  const price = `$${props.price.toFixed(2)}`;

  const addToCartHandler = (amount) => {
    // check if item.amount out of stock. Stock = 10 just as example
    const items = cartCtx.items;
    const itemToAdd = items.find((x) => x.id === props.id);

    if (items.includes(itemToAdd) && itemToAdd.amount + amount > 10) {
      setDisplayWarning(true);
      return;
    }
    cartCtx.addItem({
      id: props.id,
      name: props.name,
      amount: amount,
      price: props.price,
    });
  };

  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      {displayWarning && (
        <Alert severity="warning" onClose={() => setDisplayWarning(false)}>
          This prevents you from adding infinite items. It can also prevent you
          from adding items if they are out of stock.
        </Alert>
      )}
      <div>
        <MealItemForm id={props.id} onAddToCart={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealItem;
