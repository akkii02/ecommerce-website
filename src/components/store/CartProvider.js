import React, { useState } from "react";
import CartContext from "./cart-context";

const CardProvider = (props) => {
  const [items, setItems] = useState([]);

  const totalAmount = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const addItemToCardHandler = (item) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((existingItem) => existingItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        updatedItems[existingItemIndex].quantity += 1;
      } else {
        updatedItems.push({ ...item, quantity: 1 });
      }
      return updatedItems;
    });
  };
  
  const removeItemFromCartHandler = (item) => {
    setItems((prevItems) => {
      const updatedItems = [...prevItems];
      const existingItemIndex = updatedItems.findIndex((existingItem) => existingItem.id === item.id);
  
      if (existingItemIndex !== -1) {
        if (item.quantity === 1) {
          updatedItems.splice(existingItemIndex, 1);
        } else {
          updatedItems[existingItemIndex].quantity -= 1;
        }
      }
  
      return updatedItems;
    });
  };
  

  const cartContext = {
    items: items,
    addItem: addItemToCardHandler,
    removeItem: removeItemFromCartHandler,
    totalAmount: totalAmount,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CardProvider;
