// CartProvider.js
import React, { useState } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const [cartState, setCartState] = useState({
    items: [],
    totalAmount: 0,
  });

  const addItemToCartHandler = (item) => {
    setCartState((prevState) => {
      return {
        items: [...prevState.items, item],
        totalAmount: prevState.totalAmount + item.price,
      };
    });
  };

  const removeItemFromCartHandler = (id, price) => {
    setCartState((prevState) => {
      const updatedItems = prevState.items.filter((item) => item.id !== id);
      return {
        items: updatedItems,
        totalAmount: prevState.totalAmount - price,
      };
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
