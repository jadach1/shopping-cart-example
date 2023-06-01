import { useContext, useState, useRef } from "react";
import Input from "../../UI/Input/Input";
import MyButton from "../../UI/Button/MyButton";
import classes from "./Modal.module.css";
import { FaCertificate} from "react-icons/fa";
import { ShoppingCartContext } from "../../Store/ShoppingCart/ShoppingCardContext";


const CartModalForm = (props) => {
  const cartContext = useContext(ShoppingCartContext)
  const [isEdit, setEdit] = useState(true);
  const updatedAmount = useRef();

  const itemName = props.orders.itemName;
  const itemQty = props.orders.itemQty;
  const itemTotal = props.orders.total;

  const editHandler = () => {
    if(!isEdit){
      cartContext.updateItem(props.orders, updatedAmount.current.value)
    }
    setEdit(!isEdit);
  };

  const deleteHandler = () => {
    cartContext.removeItem(props.orders)
  };



  return (
    <div className={`row ${classes.name} justify-content-center d-flex`}>
      <div className={`col ${classes.alignName}`}>
        <FaCertificate color="red" />
          {itemName}
      </div>
      <div className="col">
        <Input
          ref = {updatedAmount}
          label="qty"
          input={{
            id: "qty",
            type: "number",
            min: 0,
            step: 1,
            disabled: isEdit,
            defaultValue: itemQty
          }}
        />
      </div>
      <div className="col ">${itemTotal}</div>
      <div className="col d-flex">
        <MyButton
          onClick={editHandler}
          type="button"
          title={isEdit ? "Edit" : "Update"}
        />
        <div className="offset-md-1"></div>
        <MyButton onClick={deleteHandler} type="button" title="Delete" />
      </div>
    </div>
  );
};

export default CartModalForm;
