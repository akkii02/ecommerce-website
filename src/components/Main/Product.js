import React, { useContext } from "react";
import ProductArr from "./ProductArr";
import "./Product.css";
import CartContext from "../store/cart-context";
const Product = () => {
  const cartctx = useContext(CartContext);
  const addToCart = (product) => {
  const quantity = 1;
  const updatedProduct = { ...product, quantity: quantity };
  cartctx.addItem(updatedProduct);
  console.log("Added to Cart:", updatedProduct);
  console.log("Updated Cart Items:", cartctx.items);
};

  return (
    <>
      <div className="container mx-auto">
        <div className="row mx-auto" style={{ width: "90%" }}>
          {ProductArr.map((product, index) => (
            <div
              key={index}
              className="col-md-5 m-5"
              style={{ width: "450px" }}
            >
              <div className="card border-0 shadow-none">
                <h5 className="card-title text-center mt-3 mb-5">
                  {product.title}
                </h5>
                <div className="image-container  mx-auto">
                  <img
                    src={product.imageUrl}
                    className="card-img-top zoom-on-hover"
                    alt={product.title}
                    style={{ width: "250px" }}
                  />
                </div>
                <div className="card-body m-4">
                  <p className=" float-start">
                    <strong>Price: ${product.price}</strong>
                  </p>
                  <button className="btn btn-primary float-end" onClick={()=>addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Product;
