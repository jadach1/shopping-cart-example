import { useState, useContext, useEffect } from "react";
import MyButton from "../UI/Button/MyButton";
import Toaster from "../Toaster/Toaster"
import classes from "../UI/Button/Button.module.css";
import { ShoppingCartContext } from "../Store/ShoppingCart/ShoppingCardContext";
import { FormValidationContext } from "./Context/FormValidationContextProvider";

const OrderForm = (props) => {
  const [qty, setQty] = useState(0); // Sets qty
  const [isValid, setValid] = useState(true);  //Error handling for qty
  const [isFormValid, setFromValiditiy] = useState(false)
  // Context providers
  const cartContext = useContext(ShoppingCartContext);
  const formValidContext = useContext(FormValidationContext)

  // Error to be displayed if user enters qty of 0
   const qtyError = (
      <>
        <div className={`bg-danger text-white font-bold 
                        ${classes.largeScreenError}`}>
          <h3>Please enter valid Quantity</h3>
        </div>
        <div className={`bg-danger text-white font-bold 
                        ${classes.smallScreenError}`}>
          <p>Please enter valid Quantity</p>
        </div>
      </>
    );

  const onChangeInputHandler = (event) => {
    setQty(event.target.value);
  };

  //Will listen if user has clicked outside of Menu Div and reset errors
  useEffect(() => {
    setValid(true);
  } , [formValidContext])

  //When user focus' on input remove error message, 
  //set form to invalid
  const onFocusHandler = () => {
    setValid(true)
    setFromValiditiy(false)
  }

  // Handles the form when user clicks ADD
  const formHandler = (event) => {
    event.preventDefault();
    
    // Check to make sure quantity is entered
    if (qty > 0) {
      // Pass desired params
       const itemName = props.item.name;
       const itemPrice = props.item.price;
       const itemQty = qty;
       const itemID = props.item.id;
      // Call dispatcher
       cartContext.addItem({ itemID, itemName, itemQty, itemPrice });
      //Reset Quantity
       setQty(0);
      // Sets the form to Valid, removes error
       setValid(true);
       setFromValiditiy(true);
    } else {
      // Prompts error message
       setValid(false);
       setFromValiditiy(false);
    }
  };

  //When the Toaster Element is closed will callback this function
  const onClose = () => {
    setFromValiditiy(false)
  }


  return (
    <div className={`  ${props.classes.alignItem}`} >
      <form onSubmit={formHandler}>
        <label aria-label="Amount"><strong>Amount</strong></label>
        <input
          className={props.classes.inputHalf}
          onChange={onChangeInputHandler}
          value={qty}
          type="number"
          min={0}
          name="qty"
          onFocus={onFocusHandler}
        />
        {!isValid && <Toaster  closed={onClose} payload={{title: "Problem", message: "You need to enter a valid quantity", type: "red" }}/>}
        {isFormValid && <Toaster closed={onClose} payload={{title: "Success", message: "Your Cart has been updated!", type: "green" }}/>}
        <div>
          <MyButton type="submit" title="+Add" classes={classes.add} />
        </div>
      </form>
      {!isValid && qtyError}
    </div>
  );
};

export default OrderForm;
