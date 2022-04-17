import React from "react";

import Modal from "../UI/Modal/Modal";
import CartContext from "../../store/cart-context";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = React.useContext(CartContext);

  function removeItemHandler(id) {
    cartCtx.removeItem(id);
  }

  function addItemHandler(item) {
    cartCtx.addItem(item);
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          cartItem={item}
          onRemove={removeItemHandler}
          onAdd={addItemHandler}
        />
      ))}
    </ul>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>${cartCtx.totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        <button className={classes["button"]}>Order</button>
      </div>
    </Modal>
  );
};

export default Cart;
