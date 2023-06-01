import React from "react";

export const ShoppingCartContext = React.createContext({
  items: [{
    itemID: "",
    itemName: "",
    itemQty: 0,
    total: 0,
  }],
  totalPrice: 0,
  orderQty: 0,
  selectedMeal: "",
  addItem: () => {},
  updateItem: () => {},
  removeItem: () => {},
  newItem: () => {},
});

