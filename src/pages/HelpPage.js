import React, { useState } from "react"
import "../styles/helppage.css"

const FAQS = [
  {
    q: "How do I track my order?",
    a: "Go to Dashboard → My Orders to see real-time status of all your orders including shipping and delivery updates.",
  },
  {
    q: "Can I return or exchange a product?",
    a: "Yes! We offer a 7-day return and exchange policy. Contact support with your order ID and we'll arrange a pickup.",
  },
  {
    q: "How do I use a coupon code?",
    a: "During checkout, enter your coupon code in the 'Apply Coupon' field in the Order Summary section.",
  },
  {
    q: "Is my payment information secure?",
    a: "Yes, all payments are processed securely through Razorpay which is PCI-DSS compliant. We never store your card details.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 3-5 business days. Express delivery (1-2 days) is available at checkout for select pincodes.",
  },
]

const CONTACT_CARDS = [
  {
    icon: "📧",
    title: "Email Us",
    value: "support@inventoryapp.com",
    sub: "Reply within 24 hours",
    color: "#eff6ff",
    textColor: "#1d4ed8",
  },
  {
    icon: "📞",
    title: "Call Us",
    value: "+91 98765 43210",
    sub: "Mon–Sat, 9am–6pm IST",
    color: "#f0fdf4",
    textColor: "#16a34a",
  },
  {
    icon: "💬",
    title: "Live Chat",
    value: "Start a chat",
    sub: "Available 9am–9pm IST",
    color: "#faf5ff",
    textColor: "#7c3aed",
  },
]

export default function HelpPage() {
  const [openFaq,   setOpenFaq]   = useState(null)
  const [form,      setForm]      = useState({ name:"", email:"", subject:"", message:"" })
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="help-page">
      {/* HERO */}
      <div className="help-hero">
        <h1>Help & Support</h1>
        <p>How can we help you today?</p>
      </div>

      <div className="help-body">

        {/* CONTACT CARDS */}
        <div className="help-contact-grid">
          {CONTACT_CARDS.map(c => (
            <div
              className="help-contact-card"
              key={c.title}
              style={{ background: c.color }}
            >
              <span className="help-contact-icon">{c.icon}</span>
              <h3 className="help-contact-title">{c.title}</h3>
              <p style={{ color: c.textColor, fontWeight: 700, fontSize: 14 }}>
                {c.value}
              </p>
              <p className="help-contact-sub">{c.sub}</p>
            </div>
          ))}
        </div>

        <div className="help-two-col">

          {/* FAQ */}
          <div className="help-faq">
            <h2 className="help-section-title">
              ❓ Frequently Asked Questions
            </h2>
            <div className="help-faq-list">
              {FAQS.map((faq, i) => (
                <div
                  key={i}
                  className={`help-faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    className="help-faq-q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <span className="help-faq-chevron">
                      {openFaq === i ? "▲" : "▼"}
                    </span>
                  </button>
                  {openFaq === i && (
                    <p className="help-faq-a">{faq.a}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="help-form-wrap">
            <h2 className="help-section-title">✉️ Send us a Message</h2>

            {submitted ? (
              <div className="help-success">
                <div className="help-success-icon">🎉</div>
                <h3>Message Sent!</h3>
                <p>
                  Thanks <strong>{form.name}</strong>! We'll reply to{" "}
                  <strong>{form.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false)
                    setForm({ name:"", email:"", subject:"", message:"" })
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form className="help-form" onSubmit={handleSubmit}>
                <div className="help-form-row">
                  <div className="help-field">
                    <label>Your Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="help-field">
                    <label>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                <div className="help-field">
                  <label>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Brief subject"
                  />
                </div>
                <div className="help-field">
                  <label>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Describe your issue..."
                    rows={5}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`help-submit-btn ${loading ? "loading" : ""}`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}