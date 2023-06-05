import MEAL from "../../Models/Meal.model";

/*FETCH THE PRICE OF THE ITEM */
export function getMealPrice(updatedID) {

  console.log("update id, ", updatedID);
  // The ID should be either m, b or d.
  // Ascertain which meal set it is for.
  const mealSet = updatedID.charAt(0);
  let index;

  //Loop through the meal sets
  switch (mealSet) {
    
    case "m":
      // Find index of item
      index = MEAL.DINNER.findIndex((item) => {
        return item.id === updatedID;
      });
      // Return price
      if (index !== -1) return MEAL.DINNER[index].price;
      break;
    
    case "b":
      index = MEAL.BREAKFAST.findIndex((item) => {
        return item.id === updatedID;
      });
      if (index !== -1) return MEAL.BREAKFAST[index].price;
      break;
    
    case "d":
      index = MEAL.DESSERT.findIndex((item) => {
        return item.id === updatedID;
      });
      if (index !== -1) return MEAL.DESSERT[index].price;
      break;
    
    default:
      return 0;
  }

  if (index !== -1) {
    return MEAL.DINNER[index].price;
  } else return 0;
}
