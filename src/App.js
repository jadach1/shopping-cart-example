import { useState, useCallback } from "react";
import "./App.css";
import AppNavbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import MenuAlerter from "./Components/Menu/clickOutsideListener";
import CartModal from "./Components/Menu/Modal/CartModal";
import ShoppingCartContextProvider from "./Components/Store/ShoppingCart/ShoppingCartContextProvider";
import FormValidationContextProvider from "./Components/Menu/Context/FormValidationContextProvider";

function App() {

  //Handles whether the Cart Modal is displayed or hidden
   const [showModal, setModal] = useState(false);

   const modalHandler = useCallback(() => {
    setModal(!showModal);
  },[showModal]);

  //Determines which meal set we will display
  const [meal, setMeal] = useState("Dinner");

  const setMealHandler = useCallback((meal) => {
      if(meal.trim() !== "" || meal.trim() !== meal){
          setMeal(meal)
        }
  },[])


  return (
      <ShoppingCartContextProvider>   
        <AppNavbar setMeal={setMealHandler} modalHandler={modalHandler} />
        <CartModal modalHandler={modalHandler} show={showModal} />
        <Header meal={meal}/>
        <FormValidationContextProvider>
          <MenuAlerter meal={meal}>
            <Menu meal={meal}/>
          </MenuAlerter>
        </FormValidationContextProvider>
      </ShoppingCartContextProvider>
  );
}

export default App;
