import React from 'react';
import Input from "../../UI/Input/Input";
import CartContext from "../../../store/cart-context";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const cartCtx = React.useContext(CartContext);

  function addItemHandler(event) {
    event.preventDefault();
    cartCtx.addItem({ ...props.item, amount: document.getElementById('amount_' + props.id).value });
    document.getElementById("amount_" + props.id).value = 1;
  }

  return (
    <form className={classes.form}>
      <Input
        label="Qty"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button onClick={addItemHandler}>+ Add</button>
    </form>
  );
};

export default MealItemForm;
