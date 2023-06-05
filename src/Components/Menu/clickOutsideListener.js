import { useEffect, useRef, useState, useContext } from "react";
import classes from './Menu.module.css'
import { FormValidationContext } from "./Context/FormValidationContextProvider";

/*THIS COMPONENT WILL REACT TO THE USER CLICKING OUTSIDE OF THE MENU
 AND THEREFORE REMOVE ANY ERROR MESSAGES ON THE FORM */

const useOutsideClickListener = (ref) => {
    const formContext = useContext(FormValidationContext)

    //Will react when user has clicked outside of desired area
    useEffect( ()=> {
        //Called
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)){
                
                formContext.updateSignal();         
            }
        }
        //Bind the event listener
        document.addEventListener("click",handleClickOutside);
        return () => {
            //Unbind the event listener on clean up
            document.removeEventListener("click", handleClickOutside)
        }
    },[ref, formContext.signal])

}

/*A HANDLER TO CHECK TO SEE IF USER CLICKS OUTSIDE OF MENU */
const MenuAlerter = (props) => {
    const wrapperRef = useRef(null)

     useOutsideClickListener(wrapperRef)

    return (
        <div className={`col-6 ${classes.clickOutsideListener}`} ref={wrapperRef}> 
            {props.children}
        </div>
    )
}

export default MenuAlerter;