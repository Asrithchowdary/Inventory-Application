import React, { createContext, useState } from "react"

export const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  )

  const save = (items) => {
    setCartItems(items)
    localStorage.setItem("cartItems", JSON.stringify(items))
  }

  const addToCart = (product) => {
    const existing = cartItems.find(i => i.id === product.id)
    if (existing) {
      save(
        cartItems.map(i =>
          i.id === product.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      )
    } else {
      save([...cartItems, { ...product, quantity: 1 }])
    }
  }

  const removeFromCart = (id) =>
    save(cartItems.filter(i => i.id !== id))

  const updateQuantity = (id, type) => {
    save(
      cartItems.map(i =>
        i.id === id
          ? { ...i, quantity: type === "inc" ? i.quantity + 1 : Math.max(1, i.quantity - 1) }
          : i
      )
    )
  }

  const clearCart = () => save([])

  const cartCount = cartItems.reduce((t, i) => t + (i.quantity || 1), 0)

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  )
}