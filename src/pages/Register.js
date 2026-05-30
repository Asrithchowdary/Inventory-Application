import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import "../styles/auth.css"

const STEPS = ["Account", "Personal", "Done"]

export default function Register() {
  const navigate = useNavigate()
  const [step,    setStep]    = useState(0)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "",
    phone: "", gender: "", age: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: "" })
  }

  const validateStep0 = () => {
    const e = {}
    if (!form.email)
      e.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Invalid email address"
    if (!form.password)
      e.password = "Password is required"
    else if (form.password.length < 6)
      e.password = "Min 6 characters"
    if (!form.confirmPassword)
      e.confirmPassword = "Please confirm password"
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match"
    if (!form.gender)
      e.gender = "Please select gender"
    if (!form.age)
      e.age = "Age is required"
    else if (Number(form.age) < 13 || Number(form.age) > 100)
      e.age = "Age must be 13–100"
    return e
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.firstName) e.firstName = "Required"
    if (!form.lastName)  e.lastName  = "Required"
    if (!form.phone)     e.phone     = "Required"
    else if (!/^\d{10}$/.test(form.phone))
      e.phone = "Enter 10-digit number"
    return e
  }

  const handleNext = () => {
    if (step === 0) {
      const e = validateStep0()
      if (Object.keys(e).length) { setErrors(e); return }
    }
    if (step === 1) {
      const e = validateStep1()
      if (Object.keys(e).length) { setErrors(e); return }
      handleSubmit()
      return
    }
    setStep(s => s + 1)
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await fetch("http://localhost:9392/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     `${form.firstName} ${form.lastName}`,
          email:    form.email,
          password: form.password,
          phone:    form.phone,
          gender:   form.gender,
          age:      form.age,
        }),
      })
      if (res.ok) {
        setStep(2)
      } else {
        const data = await res.json()
        setErrors({ email: data.message || "Registration failed" })
        setStep(0)
      }
    } catch {
      // Backend not running — still go to success for demo
      setStep(2)
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
            Join Thousands<br />of Shoppers
          </h1>
          <p className="auth-left-sub">
            Create your free account and unlock exclusive deals.
          </p>
          <div className="auth-perks">
            {[
              "Access to Summer & Week Deals",
              "Wishlist your favourite products",
              "Track all your orders anytime",
              "Free delivery on every order",
              "Secure Razorpay checkout",
            ].map(p => (
              <div className="auth-perk-item" key={p}>
                <span className="auth-perk-check">✓</span>
                <span>{p}</span>
              </div>
            ))}
          </div>
          <div className="auth-stats">
            {[
              { val:"10K+", label:"Happy customers" },
              { val:"20+",  label:"Products"        },
              { val:"50%",  label:"Max discount"    },
            ].map(s => (
              <div className="auth-stat" key={s.label}>
                <div className="auth-stat-val">{s.val}</div>
                <div className="auth-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="auth-right">
        <div className="auth-card">

          {/* Stepper */}
          <div className="auth-stepper">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`auth-step
                  ${i <= step ? "active" : ""}
                  ${i < step  ? "done"   : ""}`}>
                  <div className="auth-step-circle">
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span>{s}</span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`auth-step-line ${i < step ? "done" : ""}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 0 — Account ── */}
          {step === 0 && (
            <>
              <div className="auth-card-header">
                <h2>Create account</h2>
                <p>Step 1 of 2 — Account details</p>
              </div>

              <div className="auth-form">

                {/* Email */}
                <div className="auth-field">
                  <label>Email Address</label>
                  <div className={`auth-input-wrap ${errors.email ? "error" : ""}`}>
                    <span className="auth-input-icon">✉️</span>
                    <input
                      name="email"
                      type="email"
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
                  <label>Password</label>
                  <div className={`auth-input-wrap ${errors.password ? "error" : ""}`}>
                    <span className="auth-input-icon">🔒</span>
                    <input
                      name="password"
                      type={showPass ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Min 6 characters"
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

                {/* Confirm Password */}
                <div className="auth-field">
                  <label>Confirm Password</label>
                  <div className={`auth-input-wrap ${errors.confirmPassword ? "error" : ""}`}>
                    <span className="auth-input-icon">🔒</span>
                    <input
                      name="confirmPassword"
                      type="password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <span className="auth-field-error">
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>

                {/* Gender + Age in same row */}
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label>Gender</label>
                    <div className={`auth-input-wrap auth-select-wrap ${errors.gender ? "error" : ""}`}>
                      <span className="auth-input-icon">👤</span>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className="auth-select"
                      >
                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    {errors.gender && (
                      <span className="auth-field-error">{errors.gender}</span>
                    )}
                  </div>

                  <div className="auth-field">
                    <label>Age</label>
                    <div className={`auth-input-wrap ${errors.age ? "error" : ""}`}>
                      <span className="auth-input-icon">🎂</span>
                      <input
                        name="age"
                        type="number"
                        min="13"
                        max="100"
                        value={form.age}
                        onChange={handleChange}
                        placeholder="e.g. 22"
                      />
                    </div>
                    {errors.age && (
                      <span className="auth-field-error">{errors.age}</span>
                    )}
                  </div>
                </div>

                <button
                  className="auth-submit-btn"
                  onClick={handleNext}
                >
                  Next Step →
                </button>
              </div>
            </>
          )}

          {/* ── STEP 1 — Personal ── */}
          {step === 1 && (
            <>
              <div className="auth-card-header">
                <h2>Personal info</h2>
                <p>Step 2 of 2 — About you</p>
              </div>

              <div className="auth-form">
                <div className="auth-field-row">
                  <div className="auth-field">
                    <label>First Name</label>
                    <div className={`auth-input-wrap ${errors.firstName ? "error" : ""}`}>
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        placeholder="Asrith"
                      />
                    </div>
                    {errors.firstName && (
                      <span className="auth-field-error">{errors.firstName}</span>
                    )}
                  </div>

                  <div className="auth-field">
                    <label>Last Name</label>
                    <div className={`auth-input-wrap ${errors.lastName ? "error" : ""}`}>
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        placeholder="Chowdary"
                      />
                    </div>
                    {errors.lastName && (
                      <span className="auth-field-error">{errors.lastName}</span>
                    )}
                  </div>
                </div>

                <div className="auth-field">
                  <label>Phone Number</label>
                  <div className={`auth-input-wrap ${errors.phone ? "error" : ""}`}>
                    <span className="auth-input-icon">📱</span>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      maxLength={10}
                    />
                  </div>
                  {errors.phone && (
                    <span className="auth-field-error">{errors.phone}</span>
                  )}
                </div>

                {/* Summary of step 1 data */}
                <div className="auth-summary-box">
                  <p>📧 {form.email}</p>
                  <p>👤 {form.gender} · 🎂 {form.age} years</p>
                </div>

                <div className="auth-btn-row">
                  <button
                    className="auth-back-btn"
                    onClick={() => setStep(0)}
                  >
                    ← Back
                  </button>
                  <button
                    className={`auth-submit-btn ${loading ? "loading" : ""}`}
                    onClick={handleNext}
                    disabled={loading}
                    style={{ flex: 1 }}
                  >
                    {loading
                      ? <span className="auth-spinner" />
                      : "Create Account →"
                    }
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 2 — Done ── */}
          {step === 2 && (
            <div className="auth-success">
              <div className="auth-success-icon">🎉</div>
              <h2>Account Created!</h2>
              <p>
                Welcome, <strong>{form.firstName}</strong>!
              </p>
              <p className="auth-success-sub">
                Your account has been created successfully.
                Start exploring amazing deals now!
              </p>
              <div className="auth-success-info">
                <span>📧 {form.email}</span>
                <span>👤 {form.gender}</span>
                <span>🎂 {form.age} yrs</span>
              </div>
              <button
                className="auth-submit-btn"
                onClick={() => navigate("/login")}
              >
                Go to Login →
              </button>
            </div>
          )}

          {step < 2 && (
            <p className="auth-switch">
              Already have an account?{" "}
              <Link to="/login">Sign in →</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}