import React,{useContext,} from "react";
import products from "../data/products";
import ProductCard from "../components/ProductCard";
import {CartContext,} from "../context/CartContext";

function Shoes() {

  const { addToCart } =
    useContext(CartContext);

  const shoesProducts =
    products.filter(

      (product) =>

        product.category ===
        "Shoes"
    );

  return (

    <div className="products-page">

      <h1>
        👟 Shoes Collection
      </h1>

      <div className="products-grid">

        {shoesProducts.map(
          (product) => (

            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
            />

          )
        )}

      </div>

    </div>
  );
}

export default Shoes;