import { useContext, useEffect, useState } from "react";
import { ShoppingCartContext } from "../Store/ShoppingCart/ShoppingCardContext";

// React-BootStrap Imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

//Styling
import classes from "./Navbar.module.css";

// React Icons
import { FaShoppingCart } from "react-icons/fa";


const AppNavbar = (props) => {
  const cartContext = useContext(ShoppingCartContext);
  const expand = "md"; // This is used for the NavBar responsiveness

  const [itemAdded, setAnimation] = useState(false);  //For animation
  const bumpClass = ` ${itemAdded ? classes.bump : ''}`;
  const shoppingCart = (
    <Nav.Link className="offset-md-4 col-md-2" onClick={props.modalHandler}>
      <button className={bumpClass}>
        <span>
          <FaShoppingCart style={{ color: "red" }} />
        </span>
        <span> {cartContext.totalQty} </span>
      </button>
    </Nav.Link>
  );

  // Will make an animation effect on the cart button whenever the quantity is changed
  useEffect( () => {
    
    if(cartContext.totalQty <= 0){
      return;
    } 

    setAnimation(true)
    const timer = setTimeout( () => {setAnimation(false)}, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [cartContext.totalQty])

  const show = () => {
    console.log(cartContext.items);
    console.log(cartContext);
  };

  const mealSelectionHandler = (meal) => {
    console.log(meal)
    if(meal.target.innerText.trim() !== ""){
      props.setMeal(meal.target.innerText)
    }
  }

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className={`mb-3 fixed-top ${classes.dragon}`}
      >
        <Container fluid>
          <Navbar.Brand>
            <strong>Restaurant Demo</strong>
          </Navbar.Brand>
          <div className={`d-md-none d-flex ${classes.dragonBreath}`}>
            { cartContext.totalQty > 0 && shoppingCart}
          </div>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                View our Menu's !
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="row">
              <Nav
                className={`${classes.dragonBreath} justify-content-center d-flex flex-grow-1 pe-3 `}
              >
                <Nav.Link><button onClick={mealSelectionHandler}>Dinner</button></Nav.Link>
                <Nav.Link><button onClick={mealSelectionHandler}>Breakfast</button></Nav.Link>
                <Nav.Link><button onClick={mealSelectionHandler}>Dessert  </button></Nav.Link>
                { cartContext.totalQty > 0 && shoppingCart}
                <button onClick={show}>click</button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default AppNavbar;
