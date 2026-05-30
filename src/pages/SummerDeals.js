import React, { useContext, useState } from "react"
import summerDeals from "../data/SummerDeals"
import "../styles/deals.css"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"


const CATEGORIES = ["All", "Men", "Women", "Kids", "Shoes"]
const PER_PAGE   = 8

export default function SummerDeals() {
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
    filter === "All" ? summerDeals : summerDeals.filter(p => p.category === filter)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (cat) => { setFilter(cat); setPage(1) }

  return (
    <div className="deals-page">
      {/* Hero */}
      <div className="deals-hero summer-hero">
        <div className="deals-hero-content">
          <h1>🔥 Summer Deals</h1>
          <p>Up to 50% OFF on selected styles — limited time only!</p>
          <div className="deals-hero-stats">
            <span>🛍 {summerDeals.length} products</span>
            <span>⏰ Ends soon</span>
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
        <span className="deals-count">
          {filtered.length} deals
        </span>
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