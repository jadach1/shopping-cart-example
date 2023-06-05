import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import MyButton from "../../UI/Button/MyButton";
import CartModalForm from "./CartModalForm";
import { ShoppingCartContext } from "../../Store/ShoppingCart/ShoppingCardContext";
import Toaster from "../../Toaster/Toaster";

const CartModal = (props) => {
  const [isSubmitted, setSubmit] = useState(false);
  const cartContext = useContext(ShoppingCartContext);
  const [form, setForm] = useState([]);

  useEffect( () => {
    if(cartContext.items.length > 0){
      setForm([...cartContext.items.map((order) => {
        return <CartModalForm key={order.itemID} orders={order} disabled={isSubmitted} />;
      })])
    } else {
      setForm([])
    }
  }, [cartContext.items, isSubmitted])

  const submitHandler = () => {
    setSubmit(true);
  };

  const onClose = () => {
    new Promise((res, rej) => {
      setSubmit(false);
      res(true);
    })
    .then((res) => {
      cartContext.submitOrder();
    })
    .then((res) => {
      props.modalHandler();
    });
  };

  return (
    <Modal show={props.show} onHide={props.modalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {form}
        {isSubmitted && (
          <Toaster
            closed={onClose}
            payload={{
              title: "Awesome!",
              message: "Your order has been placed !",
              type: "submit",
            }}
          />
        )}
      </Modal.Body>
      <Modal.Footer className="row">
        <div className="col">
          <h3>Total: $ {cartContext.totalPrice}</h3>
        </div>
        <div className="col">
          <MyButton
            onClick={submitHandler}
            type="button"
            title="Submit Order"
            disabled={isSubmitted}
          />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default React.memo(CartModal);
