import React, { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import "../styles/cart.css"

export default function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext)

  const subtotal = cartItems.reduce(
    (t, i) => t + (i.discountPrice || i.price) * i.quantity, 0
  )
  const totalItems = cartItems.reduce((t, i) => t + i.quantity, 0)
  const savings = cartItems.reduce(
    (t, i) => i.discountPrice ? t + (i.price - i.discountPrice) * i.quantity : t, 0
  )

  return (
    <div className="cart-page">

      <div className="cart-header">
        <h1 className="cart-heading">
          🛒 My Cart
          <span className="cart-badge">{totalItems}</span>
        </h1>
        {cartItems.length > 0 && (
          <button className="cart-clear-btn" onClick={clearCart}>
            Clear All
          </button>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything yet.</p>
          <button onClick={() => navigate("/dashboard")}>
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="cart-body">

          <div className="cart-items">
            {cartItems.map(item => (
              <div className="cart-card" key={item.id}>
                <div className="cart-img-wrap">
                  <img
                    src={item.image}
                    alt={item.name}
                    onError={e => {
                      e.target.src =
                        "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=200"
                    }}
                  />
                </div>
                <div className="cart-info">
                  <div className="cart-info-top">
                    <div>
                      <span className="cart-cat">{item.category}</span>
                      <h3 className="cart-name">{item.name}</h3>
                      <p className="cart-brand">{item.brand}</p>
                    </div>
                    <button
                      className="cart-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="cart-info-bottom">
                    <div className="cart-price-col">
                      <span className="cart-price-new">
                        ₹{(item.discountPrice || item.price).toLocaleString("en-IN")}
                      </span>
                      {item.discountPrice && (
                        <span className="cart-price-old">
                          ₹{item.price.toLocaleString("en-IN")}
                        </span>
                      )}
                    </div>
                    <div className="cart-qty">
                      <button
                        onClick={() => updateQuantity(item.id, "dec")}
                        disabled={item.quantity <= 1}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, "inc")}>+</button>
                    </div>
                    <div className="cart-item-total">
                      ₹{(
                        (item.discountPrice || item.price) * item.quantity
                      ).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-heading">Order Summary</h2>
            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {savings > 0 && (
                <div className="summary-row savings">
                  <span>Total Savings</span>
                  <span>−₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-tag">FREE</span>
              </div>
            </div>
            <div className="summary-divider" />
            <div className="summary-total">
              <span>Total Amount</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {savings > 0 && (
              <div className="summary-savings-msg">
                🎉 You save ₹{savings.toLocaleString("en-IN")} on this order!
              </div>
            )}
            <button
              className="checkout-btn"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout →
            </button>
            <button
              className="continue-btn"
              onClick={() => navigate("/dashboard")}
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  )
}