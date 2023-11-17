import React from "react";
import ProductArr from "./ProductArr";
import "./Product.css";
const Product = () => {
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
                {/* Add border-0 and shadow-none classes */}
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
                  <button className="btn btn-primary float-end">
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
