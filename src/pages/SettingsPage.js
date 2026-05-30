import React, { useState } from "react"
import "../styles/settingspage.css"

const TABS = [
  { id:"profile",       label:"Profile",       icon:"👤" },
  { id:"notifications", label:"Notifications", icon:"🔔" },
  { id:"security",      label:"Security",      icon:"🔒" },
  { id:"addresses",     label:"Addresses",     icon:"📍" },
  { id:"preferences",   label:"Preferences",   icon:"⚙️" },
]

export default function SettingsPage() {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
  const [activeTab, setActiveTab] = useState("profile")
  const [form, setForm] = useState({
    name:    storedUser.name || "",
    email:   storedUser.email || "",
    phone:   "",
    address: "",
    city:    "",
    pincode: "",
  })
  const [saved,   setSaved]   = useState(false)
  const [pwForm,  setPwForm]  = useState({ current:"", newPw:"", confirm:"" })
  const [notifs,  setNotifs]  = useState({
    orders: true, deals: true, wishlist: false, newsletter: true,
  })

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value })

  const handleSave = () => {
    localStorage.setItem("user", JSON.stringify({ ...storedUser, name: form.name, email: form.email }))
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const initials = form.name
    ? form.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "U"

  return (
    <div className="sp-page">
      <div className="sp-container">
        <div className="sp-header">
          <h1>Settings</h1>
          <p>Manage your account preferences</p>
        </div>

        <div className="sp-body">
          {/* SIDEBAR */}
          <aside className="sp-sidebar">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`sp-tab-btn ${activeTab === tab.id ? "active" : ""}`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </aside>

          {/* CONTENT */}
          <div className="sp-content">

            {/* Profile */}
            {activeTab === "profile" && (
              <div className="sp-section">
                <h2>Profile Information</h2>

                {/* Avatar */}
                <div className="sp-avatar-row">
                  <div className="sp-avatar">{initials}</div>
                  <div>
                    <p className="sp-avatar-name">{form.name || "Your Name"}</p>
                    <p className="sp-avatar-email">{form.email}</p>
                    <button className="sp-avatar-change">Change Photo</button>
                  </div>
                </div>

                <div className="sp-form">
                  <div className="sp-form-row">
                    <div className="sp-field">
                      <label>Full Name</label>
                      <input name="name" value={form.name}
                        onChange={handleChange} placeholder="Your full name" />
                    </div>
                    <div className="sp-field">
                      <label>Email Address</label>
                      <input name="email" type="email" value={form.email}
                        onChange={handleChange} placeholder="you@example.com" />
                    </div>
                  </div>
                  <div className="sp-field">
                    <label>Phone Number</label>
                    <input name="phone" value={form.phone}
                      onChange={handleChange} placeholder="+91 98765 43210" />
                  </div>
                  <div className="sp-btn-row">
                    <button className="sp-save-btn" onClick={handleSave}>
                      Save Changes
                    </button>
                    {saved && (
                      <span className="sp-saved-msg">✓ Saved successfully!</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeTab === "notifications" && (
              <div className="sp-section">
                <h2>Notification Preferences</h2>
                <div className="sp-notif-list">
                  {[
                    { key:"orders",     label:"Order updates",         desc:"Shipping, delivery, and order confirmations" },
                    { key:"deals",      label:"Deal alerts",           desc:"Summer deals, week deals and flash sales" },
                    { key:"wishlist",   label:"Wishlist restocks",     desc:"When wishlisted items come back in stock" },
                    { key:"newsletter", label:"Newsletter",            desc:"Weekly product recommendations" },
                  ].map(n => (
                    <div className="sp-notif-item" key={n.key}>
                      <div>
                        <p className="sp-notif-label">{n.label}</p>
                        <p className="sp-notif-desc">{n.desc}</p>
                      </div>
                      <button
                        className={`sp-toggle ${notifs[n.key] ? "on" : ""}`}
                        onClick={() =>
                          setNotifs({ ...notifs, [n.key]: !notifs[n.key] })
                        }
                      >
                        <span className="sp-toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeTab === "security" && (
              <div className="sp-section">
                <h2>Security</h2>
                <div className="sp-form">
                  {[
                    { key:"current", label:"Current Password",  ph:"Enter current password" },
                    { key:"newPw",   label:"New Password",      ph:"Min 6 characters" },
                    { key:"confirm", label:"Confirm Password",  ph:"Repeat new password" },
                  ].map(f => (
                    <div className="sp-field" key={f.key}>
                      <label>{f.label}</label>
                      <input
                        type="password"
                        value={pwForm[f.key]}
                        placeholder={f.ph}
                        onChange={e =>
                          setPwForm({ ...pwForm, [f.key]: e.target.value })
                        }
                      />
                    </div>
                  ))}
                  <button className="sp-save-btn">Update Password</button>
                </div>

                <div className="sp-danger-zone">
                  <h3>Danger Zone</h3>
                  <p>Once you delete your account, there is no going back.</p>
                  <button className="sp-delete-btn">Delete Account</button>
                </div>
              </div>
            )}

            {/* Addresses */}
            {activeTab === "addresses" && (
              <div className="sp-section">
                <h2>Saved Addresses</h2>
                <div className="sp-form">
                  <div className="sp-field">
                    <label>Full Address</label>
                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House no., Street, Landmark"
                      rows={3}
                    />
                  </div>
                  <div className="sp-form-row">
                    <div className="sp-field">
                      <label>City</label>
                      <input name="city" value={form.city}
                        onChange={handleChange} placeholder="Mumbai" />
                    </div>
                    <div className="sp-field">
                      <label>Pincode</label>
                      <input name="pincode" value={form.pincode}
                        onChange={handleChange} placeholder="400001" />
                    </div>
                  </div>
                  <button className="sp-save-btn" onClick={handleSave}>
                    Save Address
                  </button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeTab === "preferences" && (
              <div className="sp-section">
                <h2>App Preferences</h2>
                <div className="sp-notif-list">
                  {[
                    { label:"Dark Mode",          desc:"Switch to dark theme" },
                    { label:"Save search history", desc:"Remember recent searches" },
                    { label:"Auto-apply coupons",  desc:"Apply best coupon at checkout" },
                  ].map((p, i) => (
                    <div className="sp-notif-item" key={i}>
                      <div>
                        <p className="sp-notif-label">{p.label}</p>
                        <p className="sp-notif-desc">{p.desc}</p>
                      </div>
                      <button className="sp-toggle">
                        <span className="sp-toggle-knob" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}