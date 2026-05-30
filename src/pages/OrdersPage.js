import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import "../styles/orderspage.css"

const STATUS_COLORS = {
  Delivered:  { bg:"#f0fdf4", text:"#16a34a", dot:"#16a34a" },
  Shipped:    { bg:"#eff6ff", text:"#2563eb", dot:"#2563eb" },
  Processing: { bg:"#fffbeb", text:"#b45309", dot:"#f59e0b" },
  Cancelled:  { bg:"#fff1f2", text:"#e11d48", dot:"#e11d48" },
  Failed:     { bg:"#fef2f2", text:"#dc2626", dot:"#dc2626" },
}

const ALL_ORDERS_BY_USER = {
  "admin@gmail.com": [
    {
      id: "ORD-2026-001",
      date: "21 May 2026",
      time: "10:32 AM",
      items: [
        {
          name: "Adidas Sports Wear",
          brand: "Adidas",
          qty: 1,
          price: 1499,
          image: "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=80",
        },
        {
          name: "H&M Top",
          brand: "H&M",
          qty: 1,
          price: 1299,
          image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=80",
        },
      ],
      total: 2798,
      status: "Delivered",
      paymentId: "pay_OX9Zk2001",
      paymentMethod: "UPI",
      address: "Kphb colony Road no.5, Hyderabad — 500085",
    },
    {
      id: "ORD-2026-002",
      date: "18 May 2026",
      time: "03:14 PM",
      items: [
        {
          name: "Nike Air Max 270",
          brand: "Nike",
          qty: 1,
          price: 4499,
          image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?w=80",
        },
      ],
      total: 4499,
      status: "Shipped",
      paymentId: "pay_OX8Zk002",
      paymentMethod: "Razorpay",
      address: "Kphb colony Road no.5, Hyderabad — 500085",
    },
    {
      id: "ORD-2026-003",
      date: "15 May 2026",
      time: "07:45 PM",
      items: [
        {
          name: "Levi's 511 Slim Jeans",
          brand: "Levi's",
          qty: 2,
          price: 2999,
          image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?w=80",
        },
      ],
      total: 5998,
      status: "Processing",
      paymentId: "pay_OX7Zk003",
      paymentMethod: "COD",
      address: "Kphb colony Road no.5, Hyderabad — 500085",
    },
    {
      id: "ORD-2026-004",
      date: "10 May 2026",
      time: "11:20 AM",
      items: [
        {
          name: "Sony WH-1000XM5",
          brand: "Sony",
          qty: 1,
          price: 24999,
          image: "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?w=80",
        },
      ],
      total: 24999,
      status: "Cancelled",
      paymentId: "pay_OX6Zk004",
      paymentMethod: "Razorpay",
      address: "Kphb colony Road no.5, Hyderabad — 500085",
    },
    {
      id: "ORD-2026-005",
      date: "05 May 2026",
      time: "09:05 AM",
      items: [
        {
          name: "Zara Floral Midi Dress",
          brand: "Zara",
          qty: 1,
          price: 2499,
          image: "https://images.pexels.com/photos/972995/pexels-photo-972995.jpeg?w=80",
        },
      ],
      total: 2499,
      status: "Failed",
      paymentId: "pay_OX5Zk005",
      paymentMethod: "UPI",
      address: "Kphb colony Road no.5, Hyderabad — 500085",
    },
  ],
}

const FILTERS = ["All","Delivered","Shipped","Processing","Cancelled","Failed"]

export default function OrdersPage() {
  const navigate = useNavigate()

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}")
  const userEmail   = currentUser.email || ""
  const userName    = currentUser.name  || "there"

  // Get orders for this specific user
  const userOrders = ALL_ORDERS_BY_USER[userEmail] || []

  const [expanded, setExpanded] = useState(null)
  const [filter,   setFilter]   = useState("All")

  const filtered = filter === "All"
    ? userOrders
    : userOrders.filter(o => o.status === filter)

  return (
    <div className="op-page">

      {/* Header */}
      <div className="op-header">
        <div>
          <h1>📦 My Orders</h1>
          <p>
            {userOrders.length === 0
              ? `Hi ${userName}, you haven't placed any orders yet`
              : `${userOrders.length} order${userOrders.length > 1 ? "s" : ""} placed`
            }
          </p>
        </div>
        <button
          className="op-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Continue Shopping
        </button>
      </div>

      {/* Empty state for new users */}
      {userOrders.length === 0 ? (
        <div className="op-empty-state">
          <div className="op-empty-icon">🛍️</div>
          <h2>No orders yet, {userName}!</h2>
          <p>
            Looks like you haven't placed any orders.
            Explore our amazing deals and start shopping!
          </p>
          <div className="op-empty-actions">
            <button
              className="op-action-btn primary"
              onClick={() => navigate("/summer-deals")}
            >
              🔥 Summer Deals
            </button>
            <button
              className="op-action-btn ghost"
              onClick={() => navigate("/dashboard")}
            >
              Browse Products
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Filter tabs */}
          <div className="op-filters">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`op-filter-btn ${filter === f ? "active" : ""}`}
              >
                {f}
                {f !== "All" && (
                  <span className="op-filter-count">
                    {userOrders.filter(o => o.status === f).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* No results for filter */}
          {filtered.length === 0 ? (
            <div className="op-empty-state">
              <p>No {filter.toLowerCase()} orders found.</p>
              <button
                className="op-action-btn ghost"
                onClick={() => setFilter("All")}
              >
                Show all orders
              </button>
            </div>
          ) : (

            /* Orders list */
            <div className="op-list">
              {filtered.map(order => {
                const sc     = STATUS_COLORS[order.status]
                const isOpen = expanded === order.id
                return (
                  <div className="op-card" key={order.id}>

                    {/* Header row — clickable */}
                    <div
                      className="op-card-header"
                      onClick={() =>
                        setExpanded(isOpen ? null : order.id)
                      }
                    >
                      <div className="op-card-left">
                        <div className="op-order-id">{order.id}</div>
                        <div className="op-order-meta">
                          <span>📅 {order.date}</span>
                          <span>·</span>
                          <span>🕐 {order.time}</span>
                          <span>·</span>
                          <span>💳 {order.paymentMethod}</span>
                          <span>·</span>
                          <span>
                            {order.items.length} item
                            {order.items.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>

                      <div className="op-card-right">
                        <span
                          className="op-status-badge"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          <span
                            className="op-status-dot"
                            style={{ background: sc.dot }}
                          />
                          {order.status}
                        </span>
                        <div className="op-total">
                          ₹{order.total.toLocaleString("en-IN")}
                        </div>
                        <span className="op-chevron">
                          {isOpen ? "▲" : "▼"}
                        </span>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {isOpen && (
                      <div className="op-card-body">

                        {/* Items */}
                        <div className="op-items">
                          {order.items.map((item, i) => (
                            <div className="op-item" key={i}>
                              <img
                                src={item.image}
                                alt={item.name}
                                onError={e => {
                                  e.target.src =
                                    "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=80"
                                }}
                              />
                              <div className="op-item-info">
                                <p className="op-item-name">{item.name}</p>
                                <p className="op-item-brand">{item.brand}</p>
                              </div>
                              <div className="op-item-right">
                                <p className="op-item-qty">
                                  Qty: {item.qty}
                                </p>
                                <p className="op-item-price">
                                  ₹{(item.price * item.qty).toLocaleString("en-IN")}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Details */}
                        <div className="op-details-grid">
                          <div className="op-detail-box">
                            <p className="op-detail-label">📍 Delivery Address</p>
                            <p className="op-detail-value">{order.address}</p>
                          </div>
                          <div className="op-detail-box">
                            <p className="op-detail-label">🔖 Payment ID</p>
                            <p className="op-detail-value op-mono">
                              {order.paymentId}
                            </p>
                          </div>
                          <div className="op-detail-box">
                            <p className="op-detail-label">💰 Order Total</p>
                            <p className="op-detail-value op-total-big">
                              ₹{order.total.toLocaleString("en-IN")}
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="op-actions">
                          {order.status === "Delivered" && (
                            <button className="op-action-btn primary">
                              ↩ Return / Exchange
                            </button>
                          )}
                          {(order.status === "Shipped" ||
                            order.status === "Processing") && (
                            <button className="op-action-btn danger">
                              ✕ Cancel Order
                            </button>
                          )}
                          {order.status === "Failed" && (
                            <button className="op-action-btn primary">
                              🔄 Retry Payment
                            </button>
                          )}
                          <button className="op-action-btn ghost">
                            📄 Download Invoice
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </>
      )}
    </div>
  )
}