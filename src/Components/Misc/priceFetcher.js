import MEAL from '../../Models/Meal.model'

export function getMealPrice(updatedID) {
    const index = MEAL.DINNER.findIndex( item => {
        return item.id === updatedID
    })

    if(index !== -1){
        return MEAL.DINNER[index].price;
    } else
        return 0;
}