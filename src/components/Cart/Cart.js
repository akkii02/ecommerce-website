import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import CartContext from "../store/cart-context";
import AuthContext from "../store/Auth-Context";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const authCtx = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddItem = async (id) => {
    const item = cartCtx.items.find((item) => item.id === id);

    // updateData(id)
    if (item) {
      cartCtx.addItem(item);
    }
  };

  const handleRemoveItem = (id) => {
    console.log("handleRemoveItem",cartCtx.items)
    cartCtx.removeItem(id);
    deleteData()
  };

  const calculateTotalPrice = () => {
    return cartCtx.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const email = authCtx.userEmail;
  const withoutAtSymbol = email.replace(/@/g, "");
  const emailWithoutDot = withoutAtSymbol.replace(/\./g, "");

  // async function updateData(id) {
  //   const response = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}`,{
  //     method:"GET",
  //   });
  //   const data = await response.json();
  //   console.log("update", data);
  
  //   if (data.length === 0) {
  //     console.warn('No items to update');
  //     return;
  //   }
  
  //   let itemIdUpdatedata;
  //   const updatedItem = data.map((item) => {
  //     if (item.id === id) {
  //       itemIdUpdatedata = item._id;
  //       return {
  //         id: item.id,
  //         imageUrl: item.imageUrl,
  //         quantity: item.quantity + 1,
  //         price: item.price * (item.quantity + 1),
  //         title: item.title,
  //       };
  //     } else {
  //       return item;
  //     }
  //   });
  //   console.log("upID", itemIdUpdatedata);
  //   console.log("upItem", updatedItem);
  //   sendDataToDatabase(updatedItem)
    
  //   const deresponse = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}/${itemIdUpdatedata}`, {
  //     method: 'DELETE',
  //   });
  
  //   if (deresponse.ok) {
  //     console.log('Item deleted successfully');
  //   } else {
  //     console.error('Failed to delete item');
  //   }
  // }
  // async function sendDataToDatabase(cart) {
  //   try {
  //     const response = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}`, {
  //       method: "POST",
  //       body: JSON.stringify(cart),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`Failed to POST data: ${response.status} ${response.statusText}`);
  //     }
  
  //     const data = await response.json();
  //     console.log("Data in Product", data);
  //   } catch (error) {
  //     console.error("Error posting data:", error);
  //   }
  // }

async function deleteData() {
  const response = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}`);
  const data = await response.json();
  console.log("delete", data);

  if (data.length === 0) {
    console.warn('No items to delete');
    return;
  }

  const itemIdToDelete = data[0]._id;

  const res = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}/${itemIdToDelete}`, {
    method: 'DELETE',
  });

  if (res.ok) {
    alert('Item deleted successfully');
  } else {
    console.error('Failed to delete item');
  }
}

  return (
    <div className="d-flex align-items-center">
      <h5 className="mb-0 text-light me-2">Cart</h5>
      <span className="badge bg-primary" onClick={toggleModal}>
        {cartCtx.items.length}
      </span>
      <Modal show={showModal} onHide={toggleModal} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Your Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartCtx.items.map((item) => (
            <div className="border my-1 p-1 cart-item" key={item.id}>
              <p>{item.title}</p>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-image"
                  />
                  <div>
                    <p>Price: ${item.price}</p>
                  </div>
                  <div className="m-2">
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="me-2">
                    <p>Total Price: ${item.price * item.quantity}</p>
                  </div>
                  <div style={{ marginTop: "-10px" }}>
                    <Button
                      className="mx-1"
                      variant="success"
                      onClick={() => handleAddItem(item.id)}
                    >
                      +
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      -
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex justify-content-between w-100">
            <p>Total: ${calculateTotalPrice()}</p>
            <Button
              variant="success"
              onClick={() => console.log("Add Purchase clicked")}
            >
              Purchase
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
      <style jsx>{`
        .custom-modal {
          max-width: 800px;
        }

        .cart-item-image {
          width: 90px;
          margin: 15px;
        }
      `}</style>
    </div>
  );
};

export default Cart;
