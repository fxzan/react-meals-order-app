import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.cartItem.price.toFixed(2)}`;

  function removeItemHandler(event) {
    event.preventDefault();
    props.onRemove(props.cartItem.id);
  }

  function addItemHandler(event) {
    event.preventDefault();
    props.onAdd({ ...props.cartItem, amount: 1 })
  }

  return (
    <li className={classes["cart-item"]}>
      <div>
        <h2>{props.cartItem.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.cartItem.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={removeItemHandler}>−</button>
        <button onClick={addItemHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
