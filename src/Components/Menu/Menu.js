
import React, { useEffect, useState} from "react";
import * as meals from "../../Models/Meal.model";
import DisplayItems from "./DisplayItems";
import OrderForm from "./OrderForm";
import classes from "./Menu.module.css";

/*LISTS MENU ITEMS AND CONTENTS */
const Menu = (props) => {  
  const [Items, setItems] = useState(meals.MEAL.DINNER); 

  //Will wait to receive new menu set request
  useEffect( () => {
    const meal = props.meal;
    switch(meal){
      case "Breakfast":
        setItems(meals.MEAL.BREAKFAST)
        break;
      case "Dinner":
        setItems(meals.MEAL.DINNER)
        break;
      case "Dessert":
        setItems(meals.MEAL.DESSERT)
        break;
      default:
        break;
    }
  },[props.meal])


  return (
    <section className="d-flex justify-content-center" >
      <div className={` ${classes.menu}`} >
        {Items.map((item) => {
          return (
            <div className="row mb-4" key={item.id}>
              <div className="col-md-6">
                <DisplayItems item={item} />
              </div>
              <div className="col-md-6">
                <OrderForm
                  item={item}
                  classes={{
                    alignDisplay: `${classes.alignDisplay}`,
                    inputHalf: `${classes.inputHalf}`,
                  }}
                />
              </div>
              <hr className="dashed"></hr>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
