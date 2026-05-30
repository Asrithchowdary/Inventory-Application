import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

export default function Login({ setIsLoggedIn }) {
  const navigate = useNavigate()
  const [form,       setForm]       = useState({ email: "", password: "" })
  const [errors,     setErrors]     = useState({})
  const [loading,    setLoading]    = useState(false)
  const [showPass,   setShowPass]   = useState(false)
  const [loginError, setLoginError] = useState("")

  const validate = () => {
    const e = {}
    if (!form.email)
      e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address"
    if (!form.password)
      e.password = "Password is required"
    else if (form.password.length < 6)
      e.password = "Min 6 characters"
    return e
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
    setLoginError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    try {
      const res = await fetch("http://localhost:9392/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:    form.email,
          password: form.password,
        }),
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("token", data.token || "")
        localStorage.setItem(
          "user",
          JSON.stringify({
            name:  data.name  || form.email.split("@")[0],
            email: form.email,
          })
        )
        setIsLoggedIn("true")
        navigate("/dashboard")
      } else {
        setLoginError(data.message || "Invalid email or password")
      }
    } catch {
      // Backend not running — demo fallback
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem(
        "user",
        JSON.stringify({
          name:  form.email.split("@")[0],
          email: form.email,
        })
      )
      setIsLoggedIn("true")
      navigate("/dashboard")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">

      {/* LEFT PANEL */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">
            <span className="auth-logo-icon">📦</span>
            <span className="auth-logo-text">InventoryApp</span>
          </div>
          <h1 className="auth-left-title">
            Shop Smarter,<br />Live Better
          </h1>
          <p className="auth-left-sub">
            Discover amazing deals across fashion,
            electronics and more.
          </p>
          <div className="auth-features">
            {[
              { icon:"🔥", title:"Summer Deals",  desc:"Up to 50% OFF"          },
              { icon:"⚡", title:"Week Deals",     desc:"New offers every week"   },
              { icon:"🛍️", title:"20+ Products",  desc:"All categories"          },
              { icon:"🚚", title:"Free Delivery",  desc:"On all orders"           },
            ].map(f => (
              <div className="auth-feature-item" key={f.title}>
                <span className="auth-feature-icon">{f.icon}</span>
                <div>
                  <div className="auth-feature-title">{f.title}</div>
                  <div className="auth-feature-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">

          <div className="auth-card-header">
            <h2>Welcome back 👋</h2>
            <p>Sign in to your account</p>
          </div>

          {loginError && (
            <div className="auth-error-banner">
              ⚠️ {loginError}
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>

            {/* Email */}
            <div className="auth-field">
              <label>Email Address</label>
              <div className={`auth-input-wrap ${errors.email ? "error" : ""}`}>
                <span className="auth-input-icon">✉️</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <span className="auth-field-error">{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className="auth-field">
              <div className="auth-label-row">
                <label>Password</label>
                <span className="auth-forgot">Forgot password?</span>
              </div>
              <div className={`auth-input-wrap ${errors.password ? "error" : ""}`}>
                <span className="auth-input-icon">🔒</span>
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-eye"
                  onClick={() => setShowPass(v => !v)}
                >
                  {showPass ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && (
                <span className="auth-field-error">{errors.password}</span>
              )}
            </div>

            {/* Remember me */}
            <div className="auth-remember">
              <label className="auth-checkbox-label">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-submit-btn ${loading ? "loading" : ""}`}
              disabled={loading}
            >
              {loading
                ? <span className="auth-spinner" />
                : "Sign In →"
              }
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <div className="auth-social">
            <button className="auth-social-btn">
              <span className="auth-social-icon">G</span>
              Google
            </button>
            <button className="auth-social-btn">
              <span className="auth-social-icon">f</span>
              Facebook
            </button>
          </div>

          <p className="auth-switch">
            Don't have an account?{" "}
            <Link to="/register">Create one free →</Link>
          </p>
        </div>
      </div>
    </div>
  )
}