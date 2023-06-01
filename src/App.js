import { useState, useContext } from "react";
import "./App.css";
import AppNavbar from "./Components/Navbar/Navbar";
import Header from "./Components/Header/Header";
import Menu from "./Components/Menu/Menu";
import CartModal from "./Components/Menu/Modal/CartModal";
import ShoppingCartContextProvider from "./Components/Store/ShoppingCart/ShoppingCartContextProvider";
import MessagingContextProvider from "./Components/Store/Messages/MessagingContextProvider";
import MessagingContext from "./Components/Store/Messages/MessagingContext";
import Toaster from "./Components/Toaster/Toaster";

function App() {
  //Handles whether the Cart Modal is displayed or hidden
   const [showModal, setModal] = useState(false);
   const msgContext = useContext(MessagingContext)

   const modalHandler = () => {
    setModal(!showModal);
  };

  //Determines which meal set we will display
  const [meal, setMeal] = useState("breakfast");

  const setMealHandler = (meal) => {
    console.log(meal)
      if(meal.trim() !== ""){
        setMeal(meal)
      }
  }

  return (
    <MessagingContextProvider>
      <ShoppingCartContextProvider>
        { msgContext.show && <Toaster />}
        <AppNavbar setMeal={setMealHandler} modalHandler={modalHandler} />
        <CartModal modalHandler={modalHandler} show={showModal} />
        <Header />
        <Menu meal={meal}/>
      </ShoppingCartContextProvider>
    </MessagingContextProvider>
  );
}

export default App;
