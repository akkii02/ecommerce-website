import React, { useState, useContext } from "react";
import ProductArr from "./ProductArr";
import "./Product.css";
import CartContext from "../store/cart-context";
import GenericComponent from "../Navbar/GenericComponent";
import ProductView from "../Pages/ProductView";
import AuthContext from "../store/Auth-Context";

const Product = () => {
  const authCtx = useContext(AuthContext);
  const cartctx = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const addToCart = (product) => {
    const quantity = 1;
    const updatedProduct = { ...product, quantity: quantity };
    cartctx.addItem(updatedProduct);
    sendDataToDatabase(updatedProduct)
    console.log("Added to Cart:", updatedProduct);
    // console.log("Updated Cart Items:", cartctx.items);
  };
 
  const showProductDetails = (product) => {
    setSelectedProduct(product);
  };
  console.log(authCtx.userEmail);
  const email = authCtx.userEmail;
  const withoutAtSymbol = email.replace(/@/g, "");
  const emailWithoutDot = withoutAtSymbol.replace(/\./g, "");
  
  async function sendDataToDatabase(cart) {
    try {
      const response = await fetch(`https://crudcrud.com/api/c847a3e504474cb5872993e7c25f99f3/cart${emailWithoutDot}`, {
        method: "POST",
        body: JSON.stringify(cart),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to POST data: ${response.status} ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Data in Product", data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  }
  
  

  return (
    <>
      <GenericComponent />
      <div className="container mx-auto">
        {selectedProduct ? (
          <ProductView product={selectedProduct} />
        ) : (
          <div className="row mx-auto" style={{ width: "90%" }}>
            {ProductArr.map((product) => (
              <div
                key={product.id}
                className="col-md-6 m-5 rounded-2"
                style={{
                  width: "400px",
                  border: "2px solid grey",
                  marginLeft: "8%",
                }}
                onClick={() => showProductDetails(product)}
              >
                <div className="card border-0 shadow-none">
                  <h4 className="card-title text-center mt-2 mb-2">
                    {product.title}
                  </h4>
                  <div className="image-container  mx-auto">
                    <img
                      src={product.imageUrl}
                      className="card-img-top zoom-on-hover"
                      alt={product.title}
                      style={{ width: "250px" }}
                    />
                  </div>
                  <div className="card-body m-1">
                    <p className="float-start">
                      <strong>Price: ${product.price}</strong>
                    </p>
                    <button
                      className="btn btn-primary float-end"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Product;
