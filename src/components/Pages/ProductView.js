import React, { useContext, useState } from 'react';
import "./ProductView.css"
import CartContext from '../store/cart-context';
const ProductView = ({ product, onBuy }) => {
      const cartctx = useContext(CartContext);
  const [selectedImage, setSelectedImage] = useState(product.imageUrl);

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };
  const onAddToCart = (product) => {
      const quantity = 1;
      const updatedProduct = { ...product, quantity: quantity };
      cartctx.addItem(updatedProduct);
      console.log('Added to Cart:', updatedProduct);
      console.log('Updated Cart Items:', cartctx.items);
    };

  return (
      <>
    <div className="product-view-container" style={{ display: 'flex', alignItems: 'center' , marginTop:"4%" , marginLeft:"10%" }}>
      <div className="product-images" style={{ border: '2px solid black', width: '300px', marginRight: '20px' }}>
        {product.imageUrl && (
          <img
            src={selectedImage}
            alt={`Product`}
            className="product-image selected card-img-top zoom-on-hover"
          />
        )}
      </div>

      <div className="product-details" style={{ width: '500px',margin:"3%" }}>
        <h2 className='text-centre'>{product.title}</h2>
        <p>Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the
        1500s, when an unknown printer took a galley of type and scrambled it to
        make a type specimen book. It has survived not only five centuries, but
        also the leap into electronic typesetting.</p>
        <h1>Price: ${product.price}</h1>
        <div className="product-rating">
          Rating: ⭐️⭐️⭐️
        </div>
      </div>
    </div>
    <div className="product-buttons" style={{marginLeft:"10%" , marginBottom:"2%"}}>
    <button className="btn btn-primary" onClick={() => onBuy(product)} style={{margin:"2%"}}>
      Buy Now
    </button>
    <button className="btn btn-success" onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
  </div>
  </>
  );
};

export default ProductView;
