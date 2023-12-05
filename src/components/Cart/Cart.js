import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import CartContext from "../store/cart-context";

const Cart = () => {
  const cartCtx = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleAddItem = (index) => {
    cartCtx.addItem(cartCtx.items[index]);
  };

  const handleRemoveItem = (index) => {
    cartCtx.removeItem(index);
    console.log("R",index)
  };

  const calculateTotalPrice = () => {
    return cartCtx.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="d-flex align-items-center">
      <h5 className="mb-0 text-light me-2">Cart</h5>
      <span className="badge bg-primary" onClick={handleShow}>
        {cartCtx.items.length}
      </span>

      <Modal show={showModal} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title>Your Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartCtx.items.map((item, index) => (
            <div className="border my-1 p-1" key={index}>
              <p>{item.title}</p>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="d-flex align-items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "90px", margin: "15px" }}
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
                  <div style={{marginTop:"-10px"}}>
                  <Button
                  className="mx-1"
                  variant="success"
                  onClick={() => handleAddItem(index)}
                  >
                    +
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveItem(index)}
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
`}</style>;
    </div>
  );
};

export default Cart;
