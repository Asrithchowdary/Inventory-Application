import React, { useState, useEffect, useRef, useContext } from "react"
import { useNavigate, Link, useLocation } from "react-router-dom"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import "../styles/navbar.css"

export default function Navbar() {
  const navigate               = useNavigate()
  const location               = useLocation()
  const [showMenu, setShowMenu] = useState(false)
  const menuRef                = useRef(null)

  const { cartItems }  = useContext(CartContext)
  const { wishlist }   = useContext(WishlistContext)

  const cartCount  = cartItems.reduce((t, i) => t + (i.quantity || 1), 0)
  const wishCount  = wishlist.length

  const user       = JSON.parse(localStorage.getItem("user") || "{}")
  const isLoggedIn = localStorage.getItem("isLoggedIn")

  const initials = user.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  // Hide nav links on auth pages
  const isAuthPage = ["/login", "/register"].includes(location.pathname)

  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleOutside)
    return () => document.removeEventListener("mousedown", handleOutside)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    setShowMenu(false)
    navigate("/login")
  }

  const goTo = (path) => {
    navigate(path)
    setShowMenu(false)
  }

  return (
    <nav className="nb">

      {/* LEFT — Logo */}
      <Link to={isLoggedIn ? "/dashboard" : "/register"} className="nb-logo">
        <span className="nb-logo-icon">📦</span>
        <span className="nb-logo-text">InventoryApp</span>
      </Link>

      {/* CENTER — Nav links — only when logged in + not on auth pages */}
      {isLoggedIn && !isAuthPage && (
        <div className="nb-links">
          <Link to="/dashboard"    className="nb-link">Dashboard</Link>
          <Link to="/summer-deals" className="nb-link nb-link-hot">🔥 Summer Deals</Link>
          <Link to="/week-deals"   className="nb-link nb-link-flash">⚡ Week Deals</Link>
        </div>
      )}

      {/* RIGHT */}
      <div className="nb-right">

        {/* Logged in — show icons + profile */}
        {isLoggedIn && !isAuthPage ? (
          <>
            {/* Wishlist */}
            <button
              className="nb-icon-btn"
              onClick={() => navigate("/wishlist")}
              title="Wishlist"
            >
              <span className="nb-icon-emoji">🤍</span>
              {wishCount > 0 && (
                <span className="nb-badge nb-badge-red">{wishCount}</span>
              )}
            </button>

            {/* Cart */}
            <button
              className="nb-icon-btn"
              onClick={() => navigate("/cart")}
              title="Cart"
            >
              <span className="nb-icon-emoji">🛒</span>
              {cartCount > 0 && (
                <span className="nb-badge nb-badge-green">{cartCount}</span>
              )}
            </button>

            {/* Profile dropdown */}
            <div className="nb-profile-wrap" ref={menuRef}>
              <button
                className="nb-avatar"
                onClick={() => setShowMenu(v => !v)}
                title={user.name || "Profile"}
              >
                {initials}
              </button>

              {showMenu && (
                <div className="nb-dropdown">

                  {/* User info */}
                  <div className="nb-dropdown-header">
                    <div className="nb-dropdown-avatar">{initials}</div>
                    <div className="nb-dropdown-user-info">
                      <p className="nb-dropdown-name">
                        {user.name || "User"}
                      </p>
                      <p className="nb-dropdown-email">
                        {user.email || ""}
                      </p>
                    </div>
                  </div>

                  <div className="nb-dropdown-divider" />

                  {[
                    { icon:"🏠", label:"Dashboard",  path:"/dashboard" },
                    { icon:"📦", label:"My Orders",   path:"/orders"    },
                    { icon:"❤️", label:"My Wishlist", path:"/wishlist",
                      count: wishCount },
                    { icon:"🛒", label:"Cart",        path:"/cart",
                      count: cartCount },
                  ].map(item => (
                    <button
                      key={item.label}
                      className="nb-dropdown-item"
                      onClick={() => goTo(item.path)}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                      {item.count > 0 && (
                        <span className="nb-dropdown-count">{item.count}</span>
                      )}
                    </button>
                  ))}

                  <div className="nb-dropdown-divider" />

                  <button
                    className="nb-dropdown-item"
                    onClick={() => goTo("/settings")}
                  >
                    <span>⚙️</span>
                    <span>Settings</span>
                  </button>

                  <button
                    className="nb-dropdown-item"
                    onClick={() => goTo("/help")}
                  >
                    <span>💬</span>
                    <span>Help & Support</span>
                  </button>

                  <div className="nb-dropdown-divider" />

                  <button
                    className="nb-dropdown-item nb-logout"
                    onClick={handleLogout}
                  >
                    <span>🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Not logged in — show Login/Register only if not already on auth page */
          !isAuthPage && (
            <div className="nb-auth-links">
              <Link to="/login"    className="nb-btn-ghost">Login</Link>
              <Link to="/register" className="nb-btn-solid">Register</Link>
            </div>
          )
        )}
      </div>
    </nav>
  )
}