import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { WishlistContext } from "../context/WishlistContext"
import { CartContext } from "../context/CartContext"
import "../styles/wishlist.css"

export default function Wishlist() {
  const navigate                         = useNavigate()
  const { wishlist, toggleWishlist }     = useContext(WishlistContext)
  const { addToCart }                    = useContext(CartContext)

  return (
    <div className="wl-page">
      <div className="wl-header">
        <h1>❤️ My Wishlist <span className="wl-count">{wishlist.length}</span></h1>
        <button className="wl-back-btn" onClick={() => navigate("/dashboard")}>
          ← Continue Shopping
        </button>
      </div>

      {wishlist.length === 0 ? (
        <div className="wl-empty">
          <div style={{ fontSize: 64, marginBottom: 16 }}>🤍</div>
          <h2>Your wishlist is empty</h2>
          <p>Save your favourite items here.</p>
          <button onClick={() => navigate("/dashboard")}>Browse Products</button>
        </div>
      ) : (
        <div className="wl-grid">
          {wishlist.map((item) => (
            <div className="wl-card" key={item.id}>
              <button
                className="wl-remove-btn"
                onClick={() => toggleWishlist(item)}
                title="Remove from wishlist"
              >
                ✕
              </button>
              <div className="wl-img-wrap">
                <img
                  src={item.image}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src =
                      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=400"
                  }}
                />
              </div>
              <div className="wl-card-body">
                <span className="wl-cat">{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.brand}</p>
                <div className="wl-price-row">
                  <span className="wl-price-new">
                    ₹{(item.discountPrice || item.price).toLocaleString("en-IN")}
                  </span>
                  {item.discountPrice && (
                    <span className="wl-price-old">
                      ₹{item.price.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
                <button
                  className="wl-add-btn"
                  onClick={() => {
                    addToCart(item)
                    navigate("/cart")
                  }}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}