import React, { useState, useContext } from "react"
import OfferBanner from "../components/OfferBanner"
import productsData from "../data/products"
import { CartContext } from "../context/CartContext"
import { WishlistContext } from "../context/WishlistContext"
import "../styles/dashboard.css"

const CATEGORIES = ["All","Men","Women","Kids","Shoes","Electronics"]

const CATEGORY_IMAGES = {
  All:         "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=400",
  Men:         "https://images.pexels.com/photos/1300550/pexels-photo-1300550.jpeg?w=400",
  Women:       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?w=400",
  Kids:        "https://images.pexels.com/photos/35537/child-children-girl-happy.jpg?w=400",
  Shoes:       "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?w=400",
  Electronics: "https://images.pexels.com/photos/607812/pexels-photo-607812.jpeg?w=400",
}

const PER_PAGE = 8

export default function Dashboard() {
  const { addToCart }                    = useContext(CartContext)
  const { toggleWishlist, isWishlisted } = useContext(WishlistContext)

  const [search,   setSearch]   = useState("")
  const [category, setCategory] = useState("All")
  const [sortBy,   setSortBy]   = useState("default")
  const [addedIds, setAddedIds] = useState([])
  const [page,     setPage]     = useState(1)

  const handleAddToCart = (product) => {
    addToCart(product)
    setAddedIds(prev => [...prev, product.id])
    setTimeout(
      () => setAddedIds(prev => prev.filter(id => id !== product.id)),
      1500
    )
  }

  const discount = (p) =>
    p.discountPrice
      ? Math.round(((p.price - p.discountPrice) / p.price) * 100)
      : 0

  const filtered = productsData
    .filter(p =>
      (category === "All" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "low")  return (a.discountPrice||a.price) - (b.discountPrice||b.price)
      if (sortBy === "high") return (b.discountPrice||b.price) - (a.discountPrice||a.price)
      if (sortBy === "name") return a.name.localeCompare(b.name)
      return 0
    })

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated  = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleCategoryClick = (cat) => {
    setCategory(cat)
    setPage(1)
    setSearch("")
  }

  return (
    <div className="db-page">

      {/* HERO BANNERS */}
      <div className="db-banners">
        <OfferBanner
          title="🔥 Summer Deals"
          subtitle="Up to 50% OFF"
          image="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=900"
          route="/summer-deals"
        />
        <OfferBanner
          title="⚡ Week Deals"
          subtitle="Limited Time Offers"
          image="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?w=900"
          route="/week-deals"
        />
      </div>

      {/* CATEGORY SHOWCASE */}
      <div className="db-cat-showcase">
        <h2 className="db-showcase-title">Shop by Category</h2>
        <div className="db-cat-grid">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`db-cat-card ${category === cat ? "active" : ""}`}
              onClick={() => handleCategoryClick(cat)}
            >
              <div className="db-cat-img-wrap">
                <img
                  src={CATEGORY_IMAGES[cat]}
                  alt={cat}
                  onError={e => {
                    e.target.src =
                      "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=300"
                  }}
                />
                {category === cat && (
                  <div className="db-cat-active-overlay">✓</div>
                )}
              </div>
              <div className="db-cat-label">
                <span>{cat}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="db-toolbar">
        <div className="db-search-wrap">
          <span className="db-search-icon">🔍</span>
          <input
            className="db-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
          />
          {search && (
            <button
              className="db-search-clear"
              onClick={() => { setSearch(""); setPage(1) }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Category pills */}
        <div className="db-cat-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`db-cat-pill ${category === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          className="db-sort"
          value={sortBy}
          onChange={e => { setSortBy(e.target.value); setPage(1) }}
        >
          <option value="default">Sort: Default</option>
          <option value="low">Price: Low → High</option>
          <option value="high">Price: High → Low</option>
          <option value="name">Name: A–Z</option>
        </select>
      </div>

      {/* MAIN CONTENT */}
      <div className="db-main-area">

        <div className="db-main-header">
          <h1 className="db-title">
            {category === "All" ? "🛍 Browse Products" : `🛍 ${category}`}
          </h1>
          <span className="db-count">
            Showing {paginated.length} of {filtered.length} products
          </span>
        </div>

        {filtered.length === 0 ? (
          <div className="db-empty">
            <p>😕 No products found for "<strong>{search}</strong>"</p>
            <button onClick={() => { setSearch(""); setCategory("All"); setPage(1) }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            {/* PRODUCT GRID */}
            <div className="db-grid">
              {paginated.map(product => {
                const off        = discount(product)
                const added      = addedIds.includes(product.id)
                const wishlisted = isWishlisted(product.id)
                return (
                  <div className="db-card" key={product.id}>

                    {/* Discount badge */}
                    {off > 0 && (
                      <span className="db-badge">{off}% OFF</span>
                    )}

                    {/* Wishlist button */}
                    <button
                      className={`db-wish-btn ${wishlisted ? "on" : ""}`}
                      onClick={() => toggleWishlist(product)}
                      title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      {wishlisted ? "❤️" : "🤍"}
                    </button>

                    {/* Image */}
                    <div className="db-img-wrap">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="db-img"
                        onError={e => {
                          e.target.src =
                            "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=400"
                        }}
                      />
                      {/* Hover overlay */}
                      <div className="db-img-overlay">
                        <button
                          className="db-quick-add"
                          onClick={() => handleAddToCart(product)}
                        >
                          {added ? "✓ Added!" : "Quick Add"}
                        </button>
                      </div>
                    </div>

                    {/* Card body */}
                    <div className="db-card-body">
                      <span className="db-cat-tag">{product.category}</span>
                      <h3 className="db-card-name">{product.name}</h3>
                      <p className="db-card-brand">{product.brand}</p>

                      <div className="db-price-row">
                        {product.discountPrice ? (
                          <>
                            <span className="db-price-new">
                              ₹{product.discountPrice.toLocaleString("en-IN")}
                            </span>
                            <span className="db-price-old">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          </>
                        ) : (
                          <span className="db-price-new">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>

                      <button
                        className={`db-add-btn ${added ? "added" : ""}`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {added ? "✓ Added to Cart!" : "Add To Cart"}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="db-pagination">
                <button
                  className="db-page-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  ← Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`db-page-num ${p === page ? "active" : ""}`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  className="db-page-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}