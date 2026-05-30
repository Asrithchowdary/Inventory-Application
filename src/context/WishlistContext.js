import React, { createContext, useState } from "react"

export const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  )

  const save = (items) => {
    setWishlist(items)
    localStorage.setItem("wishlist", JSON.stringify(items))
  }

  const toggleWishlist = (product) => {
    const exists = wishlist.find((i) => i.id === product.id)
    if (exists) {
      save(wishlist.filter((i) => i.id !== product.id))
    } else {
      save([...wishlist, product])
    }
  }

  const isWishlisted = (id) => wishlist.some((i) => i.id === id)

  return (
    <WishlistContext.Provider
      value={{ wishlist, toggleWishlist, isWishlisted }}
    >
      {children}
    </WishlistContext.Provider>
  )
}