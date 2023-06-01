import { useReducer } from "react";
import { ShoppingCartContext } from "./ShoppingCardContext";
import { getMealPrice } from "../../Misc/priceFetcher";

const shoppingCartInitialState = {
  shoppingCart: [],
  totalQty: 0,
  totalPrice: 0,
};

const ShoppingCartReducer = (state, action) => {

  const existingCart = [...state.shoppingCart];
  const index = existingCart.findIndex((item) => {
    return item.itemID === action.payload.item.itemID;
  });
  const existingTotal = +state.totalPrice;
  const existingTQty = +state.totalQty;

  switch (action.type) {
    case "ADD":
      const newTotal = +action.payload.item.itemQty * +action.payload.item.itemPrice;
      const newItem = [
        {
          itemID: action.payload.item.itemID,
          itemName: action.payload.item.itemName,
          itemQty: action.payload.item.itemQty,
          total:  +newTotal,
        },
      ];

      // If cart is empty we can simple return here
      if (state === []) {
        return {
          shoppingCart: newItem,
          totalQty: +action.payload.item.itemQty,
          totalPrice: +newTotal.toFixed(2),
        };
      }

      if (index === -1) {
        // If we have not found the item we will add it to new Array
        return {
          shoppingCart: [...existingCart.concat(newItem)],
          totalQty: +existingTQty + +action.payload.item.itemQty,
          totalPrice: (+existingTotal + +newTotal).toFixed(2),
        };
      } else {
        // Item exists, we will append

        // Grab existing item we wish to update
        const existingItem = existingCart[index];

        // Create a new object to represent our updated object
        const updatedItem = {
          ...existingCart[index],
          itemQty: +existingItem.itemQty + +action.payload.item.itemQty,
          total: (+existingItem.total + newTotal).toFixed(2),
        };
        // Replace the item with the updated item
        existingCart[index] = updatedItem;

        // set the new State
        return {
          shoppingCart: [...existingCart],
          totalQty: +existingTQty + +action.payload.item.itemQty,
          totalPrice: (+existingTotal + +newTotal).toFixed(2),
        };
      }
    case "UPDATE":
      const updatedItem = { ...action.payload.item };
      

      if (index !== -1) {
        // newQty will hold the new qty. updatedQty holds the difference.
        const newQty = +action.payload.updatedQty + +action.payload.item.itemQty;
        updatedItem.itemQty = newQty;
        updatedItem.total = (newQty * +action.payload.price).toFixed(2);
        // existingTQty = +existingTQty + +action.payload.updatedQty;
        // existingTotal = ( +existingTotal  +  +action.payload.updatedQty * +action.payload.price).toFixed(2);

        if (newQty === 0) {
          existingCart.splice(index, 1)
          return {
            shoppingCart: [...existingCart],
            totalQty: +existingTQty + +action.payload.updatedQty,
            totalPrice: ( +existingTotal  +  +action.payload.updatedQty * +action.payload.price).toFixed(2),
          };
        } else {
          existingCart[index] = updatedItem;
        }
      }

      return {
        shoppingCart: [...existingCart],
        totalQty: +existingTQty + +action.payload.updatedQty,
        totalPrice: ( +existingTotal  +  +action.payload.updatedQty * +action.payload.price).toFixed(2),
      };
    case "DELETE": 
    // find the element, remove, and reduce total and totalQuantity
      if(index !== -1){
        existingCart.splice(index, 1)
        return {
          shoppingCart: [...existingCart],
          totalQty: +existingTQty - +action.payload.item.itemQty,
          totalPrice: ( +existingTotal  -  +action.payload.item.total).toFixed(2),
        };
      }
      break;
    default:
      return state;
  }
};

const ShoppingCartContextProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(
    ShoppingCartReducer,
    shoppingCartInitialState
  );

  const AddItemToShoppingCart = (item) => {
    // Set new Item
    dispatchCart({ type: "ADD", payload: {item: item} });
  };

  const updateItemToShoppingCart = (item, qty) => {
    const price = getMealPrice(item.itemID);

    // NEgative is Decreaing.  Poisitve is Increasing
    const updatedQty = +qty - +item.itemQty; // This will deduce whether we are reducing or adding an amount

    dispatchCart({ type: "UPDATE", payload: { updatedQty, item, price } });
  };

  const removeItemFromShoppingCart = (item) => {
    dispatchCart({type: "DELETE", payload: {item: item}})
  }


  const shoppingCartContext = {
    items: cartState.shoppingCart,
    totalPrice: cartState.totalPrice,
    totalQty: cartState.totalQty,
    addItem: AddItemToShoppingCart,
    updateItem: updateItemToShoppingCart,
    removeItem: removeItemFromShoppingCart,
  };

  return (
    <ShoppingCartContext.Provider value={shoppingCartContext}>
      {props.children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContextProvider;
