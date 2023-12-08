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

  // async function updateData(id, updatedData) {
  //   const response = await fetch(`https://crudcrud.com/api/98a5e71a7a3245bfb22d2b8981ac2e0b/cart${emailWithoutDot}`);
  //   const data = await response.json();
  //   console.log("update", data);
  
  //   if (data.length === 0) {
  //     console.warn('No items to update');
  //     return;
  //   }
  
  //   const itemIdToUpdate = data[0]._id; 
  
  //   const res = await fetch(`https://crudcrud.com/api/98a5e71a7a3245bfb22d2b8981ac2e0b/cart${emailWithoutDot}/${itemIdToUpdate}`, {
  //     method: 'PATCH', 
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(updatedData),
  //   });
  
  //   if (res.ok) {
  //     console.log('Item updated successfully');
  //   } else {
  //     console.error('Failed to update item');
  //   }
  // }

async function deleteData() {
  const response = await fetch(`https://crudcrud.com/api/98a5e71a7a3245bfb22d2b8981ac2e0b/cart${emailWithoutDot}`);
  const data = await response.json();
  console.log("delete", data);

  if (data.length === 0) {
    console.warn('No items to delete');
    return;
  }

  const itemIdToDelete = data[0]._id;

  const res = await fetch(`https://crudcrud.com/api/98a5e71a7a3245bfb22d2b8981ac2e0b/cart${emailWithoutDot}/${itemIdToDelete}`, {
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
