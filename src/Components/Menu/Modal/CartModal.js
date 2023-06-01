import { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import MyButton from "../../UI/Button/MyButton";
import CartModalForm from "./CartModalForm";
import { ShoppingCartContext } from "../../Store/ShoppingCart/ShoppingCardContext";

const CartModal = (props) => {
  const cartContext = useContext(ShoppingCartContext);

  return (
    <Modal show={props.show} onHide={props.modalHandler}>
      <Modal.Header closeButton>
        <Modal.Title>Shopping Cart</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartContext.items.map((order) => {
          return <CartModalForm key={order.itemID} orders={order} />;
        })}
      </Modal.Body>
      <Modal.Footer className="row">
        <div className="col">
          <h3>Total: $ {cartContext.totalPrice}</h3>
        </div>
        <div className="col">
          <MyButton type="button" title="Submit Order" />
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;
