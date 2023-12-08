import React, {useState,useContext,useEffect} from "react";
import CartContext from "./cart-context";
import AuthContext from "./Auth-Context";



const CardProvider = (props) => {
  const authCtx =useContext(AuthContext)
const [items, setItems] = useState([]);

const totalAmount = items.reduce((total, item) => {
  return total + item.price * item.quantity;
}, 0);
useEffect(()=>{
  fetchDataToDatabase()
},[])
const addItemToCardHandler = (item) => {
  console.log("CartProvider item",item)
  setItems((prevItems) => {
    const updatedItems = [...prevItems];
    const existingItemIndex = updatedItems.findIndex(
      (existingItem) => existingItem.id === item.id
    );

    if (existingItemIndex !== -1) {
      updatedItems[existingItemIndex].quantity += 1;
    } else {
      updatedItems.push({ ...item, quantity: 1 });
    }
    return updatedItems;
  });
};
 
const removeItemFromCartHandler = (id) => {
  setItems((prevItems) => {
    const updatedItems = [...prevItems];
    const existingItemIndex = updatedItems.findIndex(
      (existingItem) => existingItem.id === id
    );

    if (existingItemIndex !== -1) {
      if (updatedItems[existingItemIndex].quantity === 1) {
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
const email = authCtx.userEmail;
const withoutAtSymbol = email.replace(/@/g, "");
const emailWithoutDot = withoutAtSymbol.replace(/\./g, "");
async function fetchDataToDatabase() {
  try {
    const response = await fetch(
      `https://crudcrud.com/api/98a5e71a7a3245bfb22d2b8981ac2e0b/cart${emailWithoutDot}`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    console.log("Fetch data in cart", data);
    const mappedData = data.map((item) => ({
      id: item.id,
      imageUrl: item.imageUrl,
      price: item.price,
      quantity: item.quantity,
      title: item.title,
    }));

    setItems((prevItems) => {
      const updatedItems = [...prevItems];

      mappedData.forEach((item) => {
        const existingItemIndex = updatedItems.findIndex(
          (existingItem) => existingItem.id === item.id
        );

        if (existingItemIndex !== -1) {
          updatedItems[existingItemIndex].quantity += 1;
        } else {
          updatedItems.push({ ...item, quantity: 1 });
        }
      });

      return updatedItems;
    });

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

  
return (
  <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
);
};

export default CardProvider;
