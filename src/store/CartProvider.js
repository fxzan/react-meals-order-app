import React from "react";
import CartContext from "./cart-context";

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    let flag = false;
    const updatedItems = state.items.map(item => {
      if (item.id === action.payload.id) {
        item.amount = Number(item.amount) + Number(action.payload.amount);
        flag = true;
      }
      return item;
    });

    if (!flag) updatedItems.push(action.payload);

    const updatedTotal = updatedItems.reduce((curTot, item) => {
      return curTot + (Number(item.price) * Number(item.amount));
    }, 0)

    return { items: updatedItems, total: updatedTotal.toFixed(2) };
  }

  if (action.type === 'REMOVE_ITEM') {
    const updatedItems = state.items.map((item) => {
      if (item.id === action.payload) {
        item.amount = Number(item.amount) - 1;
      }
      return item;
    }).filter(item => item.amount !== 0);

    const updatedTotal = updatedItems.reduce((curTot, item) => {
      return curTot + Number(item.price) * Number(item.amount);
    }, 0);

    return { items: updatedItems, total: updatedTotal.toFixed(2) };
  }

  return { ...state };
}

const CartProvider = (props) => {
  const [cartState, dispatcher] = React.useReducer(cartReducer, { items: [], total: 0 })
  
  function addItemToCartHandler(item) {
    dispatcher({ type: 'ADD_ITEM', payload: item });
  }

  function removeItemFromCartHandler(id) {
    dispatcher({ type: 'REMOVE_ITEM', payload: id });
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.total,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
