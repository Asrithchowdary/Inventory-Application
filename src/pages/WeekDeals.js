import React, { useContext, useState, useEffect } from "react"
import weekDeals from "../data/WeekDeals"
import "../styles/deals.css"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"

const CATEGORIES = ["All", "Men", "Women", "Kids", "Shoes"]
const PER_PAGE   = 8

function Countdown({ hours }) {
  const [secs, setSecs] = useState(hours * 3600)
  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000)
    return () => clearInterval(t)
  }, [])
  const h   = Math.floor(secs / 3600)
  const m   = Math.floor((secs % 3600) / 60)
  const s   = secs % 60
  const pad = n => String(n).padStart(2, "0")
  return (
    <div className="countdown">
      <span>{pad(h)}</span>
      <span className="cd-sep">:</span>
      <span>{pad(m)}</span>
      <span className="cd-sep">:</span>
      <span>{pad(s)}</span>
    </div>
  )
}

export default function WeekDeals() {
  const { addToCart }                    = useContext(CartContext)
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext)
  const [filter,   setFilter]            = useState("All")
  const [addedIds, setAddedIds]          = useState([])
  const [page,     setPage]              = useState(1)

  const handleAdd = (product) => {
    addToCart(product)
    setAddedIds(p => [...p, product.id])
    setTimeout(() => setAddedIds(p => p.filter(id => id !== product.id)), 1500)
  }

  const filtered =
    filter === "All" ? weekDeals : weekDeals.filter(p => p.category === filter)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (cat) => { setFilter(cat); setPage(1) }

  return (
    <div className="deals-page">
      {/* Hero */}
      <div className="deals-hero week-hero">
        <div className="deals-hero-content">
          <h1>⚡ Week Deals</h1>
          <p>Exclusive weekly offers — grab them before they're gone!</p>
          <div className="deals-hero-stats">
            <span>🛍 {weekDeals.length} products</span>
            <span>⏰ Limited time</span>
            <span>🚚 Free delivery</span>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="deals-toolbar">
        <div className="deals-filter-group">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => handleFilter(c)}
              className={`deals-filter-btn ${filter === c ? "active" : ""}`}
            >
              {c}
            </button>
          ))}
        </div>
        <span className="deals-count">{filtered.length} deals</span>
      </div>

      {/* Grid */}
      <div className="deals-grid">
        {paginated.map(product => {
          const off        = Math.round(((product.price - product.discountPrice) / product.price) * 100)
          const added      = addedIds.includes(product.id)
          const wishlisted = isWishlisted(product.id)
          return (
            <div className="deals-card" key={product.id}>
              <span className="deals-badge">{off}% OFF</span>
              <button
                className={`deals-wish-btn ${wishlisted ? "on" : ""}`}
                onClick={() => toggleWishlist(product)}
              >
                {wishlisted ? "❤️" : "🤍"}
              </button>
              <div className="deals-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  onError={e => {
                    e.target.src =
                      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=400"
                  }}
                />
                <div className="deals-img-overlay">
                  <button
                    className="deals-quick-add"
                    onClick={() => handleAdd(product)}
                  >
                    {added ? "✓ Added!" : "Quick Add"}
                  </button>
                </div>
              </div>
              <div className="deals-card-body">
                <div className="deals-timer-row">
                  <span className="deals-timer-label">⏱ Ends in:</span>
                  <Countdown hours={product.hoursLeft} />
                </div>
                <span className="deals-cat">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.brand}</p>
                <div className="deals-price-row">
                  <span className="deals-price-new">
                    ₹{product.discountPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="deals-price-old">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <button
                  className={`deals-add-btn ${added ? "added" : ""}`}
                  onClick={() => handleAdd(product)}
                >
                  {added ? "✓ Added!" : "Add To Cart"}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="deals-pagination">
          <button
            className="deals-page-btn"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            ← Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`deals-page-num ${p === page ? "active" : ""}`}
            >
              {p}
            </button>
          ))}
          <button
            className="deals-page-btn"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}