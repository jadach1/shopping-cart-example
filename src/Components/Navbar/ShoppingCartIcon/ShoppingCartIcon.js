import { useState, useEffect, useContext } from "react";
import { ShoppingCartContext } from "../../Store/ShoppingCart/ShoppingCardContext";
import Nav from "react-bootstrap/Nav";
// React Icons
import { FaShoppingCart } from "react-icons/fa";

const ShoppingCartIcon = (props) => {
  const [itemAdded, setAnimation] = useState(false); //For animation
  const bumpClass = ` ${itemAdded ? props.classes : ""}`;

  const cartContext = useContext(ShoppingCartContext);

  // Will make an animation effect on the cart button whenever the quantity is changed
  useEffect(() => {
    if (cartContext.totalQty <= 0) {
      return;
    }

    setAnimation(true);
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.totalQty]);

  return (
    <Nav.Link className="offset-md-4 col-md-2" onClick={props.modalHandler}>
      <button className={bumpClass}>
        <span>
          <FaShoppingCart style={{ color: "red" }} />
        </span>
        <span> {cartContext.totalQty} </span>
      </button>
    </Nav.Link>
  );
};

export default ShoppingCartIcon;
