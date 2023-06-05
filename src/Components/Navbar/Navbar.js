import React, { useContext } from "react";
import { ShoppingCartContext } from "../Store/ShoppingCart/ShoppingCardContext";
import ShoppingCartIcon from "./ShoppingCartIcon/ShoppingCartIcon";

// React-BootStrap Imports
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";

//Styling
import classes from "./Navbar.module.css";


const AppNavbar = (props) => {

  const cartContext = useContext(ShoppingCartContext);
  const expand = "md"; // This is used for the NavBar responsiveness

//For Debuggin purposes
  const show = () => {
    console.log(cartContext.items);
    console.log(cartContext);
  };

  const mealSelectionHandler = (meal) => {
    if (meal.target.innerText.trim() !== "") {
      props.setMeal(meal.target.innerText);
    }
  };

  return (
    <>
      <Navbar
        key={expand}
        expand={expand}
        className={`mb-3 fixed-top ${classes.dragon}`}
      >
        <Container fluid>
          <Navbar.Brand>
            <strong>Restaurant Demo <small>Using React</small></strong>
          </Navbar.Brand>

          <div className={`d-md-none d-flex ${classes.dragonBreath}`}>
            {cartContext.totalQty > 0 && <ShoppingCartIcon modalHandler={props.modalHandler} classes={`${classes.bump}`}/>}
          </div>

          <Navbar.Toggle style={{borderColor: `black`}} aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
            style={{width: `auto`}}
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
                <Nav.Link>
                  <button onClick={mealSelectionHandler}>Dinner</button>
                </Nav.Link>
                <Nav.Link>
                  <button onClick={mealSelectionHandler}>Breakfast</button>
                </Nav.Link>
                <Nav.Link>
                  <button onClick={mealSelectionHandler}>Dessert </button>
                </Nav.Link>
                {cartContext.totalQty > 0 &&  <ShoppingCartIcon modalHandler={props.modalHandler} classes={`${classes.bump}`}/>}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default React.memo(AppNavbar);
