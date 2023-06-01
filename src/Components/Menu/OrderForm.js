import { useState, useContext } from "react";
import MyButton from "../UI/Button/MyButton";
import Toaster from "../Toaster/Toaster"
import classes from "../UI/Button/Button.module.css";
import { ShoppingCartContext } from "../Store/ShoppingCart/ShoppingCardContext";
import  MessagingContext  from '../Store/Messages/MessagingContext'

const OrderForm = (props) => {
  const [qty, setQty] = useState(0); // Sets qty
  const [isValid, setValid] = useState(true);  //Error handling for qty

  // Context provider for the ShoppingCart
   const cartContext = useContext(ShoppingCartContext);
  
  // Context for Messaging
   const msgContext = useContext(MessagingContext);

  // Error to be displayed if user enters qty of 0
   const qtyError = (
      <div className="bg-danger text-white font-bold">
        <h3>Please enter valid Quantity</h3>
      </div>
    );

  const onChangeInputHandler = (event) => {
    setQty(event.target.value);
    setValid(true)
  };

  //When user focus' on input remove error message
  const onFocusHandler = () => {
    setValid(true)
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
      // Send success message
       msgContext.newMessage({payload: {title: 'SUCCESS', message: 'Return a SUCCESS', icon: 'SUCCESS', colour: 'SUCCESS'}});
    } else {
      // Prompts error message
       setValid(false);
    }
  };


  return (
    <div className={`col-md-6  ${props.classes.alignItem}`}>
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
        {!isValid && qtyError}
        {!isValid && <Toaster />}
        <div>
          <MyButton type="submit" title="+Add" classes={classes.add} />
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
