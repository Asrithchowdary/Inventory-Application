import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import myQR from "../assets/myqr.png"
import "../styles/checkout.css"

const MY_UPI_ID  = "9392468715@axl"
const MY_UPI_NAME = "Asrith Chowdary Kolla"    

const STEPS = ["Cart Review", "Delivery", "Payment"]

function Checkout() {
  const navigate  = useNavigate()
  const [step, setStep]           = useState(0)
  const [cartItems, setCartItems] = useState([])
  const [user, setUser]           = useState({
    name:"", phone:"", email:"",
    address:"", city:"", pincode:"",
  })
  const [payMethod, setPayMethod] = useState("razorpay")
  const [paid, setPaid]           = useState(false)
  const [paymentId, setPaymentId] = useState("")
  const [upiInput, setUpiInput]   = useState("")
  const [upiError, setUpiError]   = useState("")

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cartItems")) || []
    setCartItems(stored)
  }, [])

  const totalItems = cartItems.reduce((t,i) => t + (i.quantity||1), 0)
  const subtotal   = cartItems.reduce(
    (t,i) => t + (Number(i.discountPrice||i.price||0) * Number(i.quantity||1)), 0
  )
  const savings    = cartItems.reduce(
    (t,i) => i.discountPrice ? t + (i.price - i.discountPrice)*(i.quantity||1) : t, 0
  )

  const handleChange = e =>
    setUser({ ...user, [e.target.name]: e.target.value })

  const handleRazorpay = () => {
    const options = {
      key:         "rzp_test_SrC7WHXEzWnsqq",
      amount:      subtotal * 100,
      currency:    "INR",
      name:        "Inventory App",
      description: `Order of ${totalItems} items`,
      handler: (response) => {
        setPaymentId(response.razorpay_payment_id)
        setPaid(true)
        localStorage.removeItem("cartItems")
      },
      prefill: {
        name:    user.name,
        contact: user.phone,
        email:   user.email,
      },
      notes: {
        address: `${user.address}, ${user.city} - ${user.pincode}`,
      },
      theme: { color: "#001f5c" },
    }
    const razor = new window.Razorpay(options)
    razor.open()
  }

  const handleUpiPay = () => {
    if (!upiInput) { setUpiError("Please enter your UPI ID"); return }
    if (!upiInput.includes("@")) { setUpiError("Invalid UPI ID format"); return }
    setUpiError("")
    setPaymentId("UPI-" + Date.now())
    setPaid(true)
    localStorage.removeItem("cartItems")
  }

  const handleCOD = () => {
    setPaymentId("COD-" + Date.now())
    setPaid(true)
    localStorage.removeItem("cartItems")
  }

  const isStep1Valid =
    user.name && user.phone && user.email &&
    user.address && user.city && user.pincode

  //Success screen 
  if (paid) {
    return (
      <div className="co-success">
        <div className="co-success-icon">
          {payMethod === "cod" ? "📦" : "✅"}
        </div>
        <h2>
          {payMethod === "cod"
            ? "Order Placed!"
            : "Payment Successful!"}
        </h2>
        <p>Thank you, <strong>{user.name}</strong>!</p>
        <p className="co-pay-id">
          Reference ID: <code>{paymentId}</code>
        </p>
        <p className="co-deliver">
          🚚 Delivering to:<br />
          <strong>
            {user.address}, {user.city} — {user.pincode}
          </strong>
        </p>
        <button onClick={() => navigate("/dashboard")}>
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="co-page">
      <div className="co-container">

        {/* Stepper */}
        <div className="co-stepper">
          {STEPS.map((s, i) => (
            <React.Fragment key={s}>
              <div className={`co-step
                ${i <= step ? "active" : ""}
                ${i < step ? "done" : ""}`}>
                <div className="co-step-circle">
                  {i < step ? "✓" : i + 1}
                </div>
                <span>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`co-step-line ${i < step ? "done" : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="co-body">
          <div className="co-left">

            {/* STEP 0 — Cart Review */}
            {step === 0 && (
              <div className="co-section">
                <h2 className="co-section-title">📦 Review Your Order</h2>
                <div className="co-items">
                  {cartItems.map(item => (
                    <div className="co-item-card" key={item.id}>
                      <img src={item.image} alt={item.name}
                        onError={e => {
                          e.target.src =
                            "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=100"
                        }}
                      />
                      <div className="co-item-info">
                        <h4>{item.name}</h4>
                        <p>{item.brand}</p>
                        <p className="co-item-qty">Qty: {item.quantity||1}</p>
                      </div>
                      <div className="co-item-price">
                        ₹{(
                          (item.discountPrice||item.price) * (item.quantity||1)
                        ).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
                {cartItems.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"30px", color:"#94a3b8" }}>
                    <p>Your cart is empty</p>
                    <button
                      className="co-next-btn"
                      onClick={() => navigate("/dashboard")}
                    >
                      Go Shopping
                    </button>
                  </div>
                ) : (
                  <button className="co-next-btn" onClick={() => setStep(1)}>
                    Continue to Delivery →
                  </button>
                )}
              </div>
            )}

            {/* STEP 1 — Delivery */}
            {step === 1 && (
              <div className="co-section">
                <h2 className="co-section-title">🚚 Delivery Address</h2>
                <div className="co-form">
                  <div className="co-form-row">
                    <div className="co-field">
                      <label>Full Name *</label>
                      <input name="name" value={user.name}
                        onChange={handleChange}
                        placeholder="Abhigyan Pandey" />
                    </div>
                    <div className="co-field">
                      <label>Phone Number *</label>
                      <input name="phone" value={user.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  <div className="co-field">
                    <label>Email Address *</label>
                    <input name="email" type="email" value={user.email}
                      onChange={handleChange}
                      placeholder="you@example.com" />
                  </div>
                  <div className="co-field">
                    <label>Full Address *</label>
                    <textarea name="address" value={user.address}
                      onChange={handleChange}
                      placeholder="House no., Street, Landmark..."
                      rows={3} />
                  </div>
                  <div className="co-form-row">
                    <div className="co-field">
                      <label>City *</label>
                      <input name="city" value={user.city}
                        onChange={handleChange} placeholder="Mumbai" />
                    </div>
                    <div className="co-field">
                      <label>Pincode *</label>
                      <input name="pincode" value={user.pincode}
                        onChange={handleChange} placeholder="400001" />
                    </div>
                  </div>
                </div>
                <div className="co-btn-row">
                  <button className="co-back-btn" onClick={() => setStep(0)}>
                    ← Back
                  </button>
                  <button
                    className="co-next-btn"
                    disabled={!isStep1Valid}
                    onClick={() => setStep(2)}
                  >
                    Continue to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2 — Payment */}
            {step === 2 && (
              <div className="co-section">
                <h2 className="co-section-title">💳 Payment Method</h2>

                {/* Payment options */}
                <div className="co-pay-methods">
                  {[
                    {
                      id:   "razorpay",
                      icon: "💳",
                      name: "Razorpay",
                      desc: "Cards, Net Banking, Wallets, UPI",
                    },
                    {
                      id:   "upi",
                      icon: "📱",
                      name: "UPI / QR Code",
                      desc: `Pay directly to ${MY_UPI_NAME}`,
                    },
                    {
                      id:   "cod",
                      icon: "💵",
                      name: "Cash on Delivery",
                      desc: "Pay when order arrives",
                    },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPayMethod(m.id)}
                      className={`co-pay-option ${payMethod === m.id ? "selected" : ""}`}
                    >
                      <span className="co-pay-icon">{m.icon}</span>
                      <div>
                        <p className="co-pay-name">{m.name}</p>
                        <p className="co-pay-desc">{m.desc}</p>
                      </div>
                      <div className={`co-pay-radio ${payMethod === m.id ? "on" : ""}`} />
                    </button>
                  ))}
                </div>

                {/* UPI section */}
                {payMethod === "upi" && (
                  <div className="co-upi-section">
                    <div className="co-upi-qr-wrap">
                      <img
                        src={myQR}
                        alt="Scan to pay"
                        className="co-upi-qr"
                        onError={e => {
                          e.target.style.display = "none"
                        }}
                      />
                      <div className="co-upi-info">
                        <p className="co-upi-label">Scan QR Code</p>
                        <p className="co-upi-sub">
                          or pay to UPI ID:
                        </p>
                        <div className="co-upi-id-box">
                          <span>{MY_UPI_ID}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(MY_UPI_ID)
                                .catch(() => {})
                            }}
                            className="co-upi-copy"
                          >
                            📋 Copy
                          </button>
                        </div>
                        <p className="co-upi-amount">
                          Amount: <strong>
                            ₹{subtotal.toLocaleString("en-IN")}
                          </strong>
                        </p>
                      </div>
                    </div>
                    <p className="co-upi-instruct">
                      After paying, enter your UPI transaction ID below to confirm:
                    </p>
                    <div className="co-upi-input-wrap">
                      <input
                        value={upiInput}
                        onChange={e => {
                          setUpiInput(e.target.value)
                          setUpiError("")
                        }}
                        placeholder="Enter UPI ID you paid from (e.g. name@upi)"
                        className="co-upi-input"
                      />
                      {upiError && (
                        <p className="co-upi-error">{upiError}</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Delivery summary */}
                <div className="co-deliver-summary">
                  <p>📍 Delivering to:</p>
                  <p>
                    <strong>{user.name}</strong> · {user.phone}
                  </p>
                  <p>
                    {user.address}, {user.city} — {user.pincode}
                  </p>
                </div>

                <div className="co-btn-row">
                  <button className="co-back-btn" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button
                    className="co-pay-btn"
                    onClick={
                      payMethod === "razorpay" ? handleRazorpay
                      : payMethod === "upi"    ? handleUpiPay
                      : handleCOD
                    }
                  >
                    {payMethod === "razorpay"
                      ? `Pay ₹${subtotal.toLocaleString("en-IN")} →`
                      : payMethod === "upi"
                        ? "Confirm UPI Payment →"
                        : "Place COD Order →"
                    }
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Order Summary */}
          <div className="co-summary">
            <h3 className="co-summary-title">Order Summary</h3>
            <div className="co-summary-items">
              {cartItems.map(item => (
                <div className="co-summary-item" key={item.id}>
                  <img src={item.image} alt={item.name}
                    onError={e => {
                      e.target.src =
                        "https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?w=60"
                    }}
                  />
                  <div className="co-summary-item-info">
                    <p>{item.name}</p>
                    <p>Qty: {item.quantity||1}</p>
                  </div>
                  <span>
                    ₹{(
                      (item.discountPrice||item.price)*(item.quantity||1)
                    ).toLocaleString("en-IN")}
                  </span>
                </div>
              ))}
            </div>
            <div className="co-summary-rows">
              <div className="co-summary-row">
                <span>Subtotal ({totalItems} items)</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {savings > 0 && (
                <div className="co-summary-row green">
                  <span>Savings</span>
                  <span>−₹{savings.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="co-summary-row">
                <span>Delivery</span>
                <span className="free">FREE</span>
              </div>
            </div>
            <div className="co-summary-divider" />
            <div className="co-summary-total">
              <span>Total</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            {savings > 0 && (
              <div className="co-savings-tag">
                🎉 You save ₹{savings.toLocaleString("en-IN")}!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout