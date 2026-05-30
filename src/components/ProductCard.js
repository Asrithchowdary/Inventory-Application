import React from "react";

function ProductCard({
  product,
  addToCart,
}) {

  return (

    <div className="card">

      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <h3>{product.name}</h3>

      <p>{product.brand}</p>

      <h4>
        ₹ {product.price}
      </h4>

      <button
        onClick={() =>
          addToCart(product)
        }
      >
        Add To Cart
      </button>

    </div>
  );
}

export default ProductCard;