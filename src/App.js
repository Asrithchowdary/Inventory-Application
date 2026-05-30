import React, { useState } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import "./App.css"
import Navbar      from "./components/Navbar"
import Footer      from "./components/Footer"
import Login       from "./pages/Login"
import Register    from "./pages/Register"
import Dashboard   from "./pages/Dashboard"
import Cart        from "./pages/Cart"
import Checkout    from "./pages/Checkout"
import SummerDeals from "./pages/SummerDeals"
import WeekDeals   from "./pages/WeekDeals"
import Wishlist    from "./pages/Wishlist"
import HelpPage    from "./pages/HelpPage"
import SettingsPage from "./pages/SettingsPage"
import OrdersPage from "./pages/OrdersPage"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn")
  )

  const ProtectedRoute = ({ element }) =>
    isLoggedIn ? element : <Navigate to="/login" />

  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route
            path="/login"
            element={<Login setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<Dashboard />} />}
          />
          <Route
            path="/summer-deals"
            element={<ProtectedRoute element={<SummerDeals />} />}
          />
          <Route
            path="/week-deals"
            element={<ProtectedRoute element={<WeekDeals />} />}
          />
          <Route
            path="/cart"
            element={<ProtectedRoute element={<Cart />} />}
          />
          <Route
            path="/checkout"
            element={<ProtectedRoute element={<Checkout />} />}
          />
          <Route
            path="/wishlist"
            element={<ProtectedRoute element={<Wishlist />} />}
          />
          <Route
            path="/help"
            element={<ProtectedRoute element={<HelpPage />} />}
          />
          <Route
            path="/settings"
            element={<ProtectedRoute element={<SettingsPage />} />}
          />

          <Route path="/orders" element={<ProtectedRoute element={<OrdersPage />} />} />
          <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App