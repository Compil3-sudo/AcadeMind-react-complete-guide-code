import { useEffect, useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
  isInitial: true,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isInitial: false,
    };
  }

  if (action.type === "ADD_SINGLE_ITEM") {
    const updatedTotalAmount = state.totalAmount + action.item.price;
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isInitial: false,
    };
  }

  if (action.type === "REMOVE") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
      isInitial: false,
    };
  }

  if (action.type === "CLEAR") {
    localStorage.setItem("cartState", JSON.stringify(defaultCartState));
    return defaultCartState;
  }

  if (action.type === "RESTORE") {
    const restoredItems = action.storedCart.items;
    const restoredTotalAmount = action.storedCart.totalAmount;

    return {
      items: restoredItems,
      totalAmount: restoredTotalAmount,
      isInitial: false,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  useEffect(() => {
    if (!cartState.isInitial) {
      localStorage.setItem("cartState", JSON.stringify(cartState));
    } else {
      let restoredState = JSON.parse(localStorage.getItem("cartState"));

      // the carState was never saved into localStorage => create default localStorage entry
      if (!restoredState) {
        localStorage.setItem("cartState", JSON.stringify(defaultCartState));
        restoredState = defaultCartState;
      }

      restoreCartHandler(restoredState);
    }
  }, [cartState]);

  const restoreCartHandler = (storedCart) => {
    dispatchCartAction({ type: "RESTORE", storedCart: storedCart });
  };

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const addSingleItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_SINGLE_ITEM", item: item });
  };

  const clearCartHandler = (item) => {
    dispatchCartAction({ type: "CLEAR" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    addSingleItem: addSingleItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
    restoreCart: restoreCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
