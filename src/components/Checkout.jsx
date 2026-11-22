import { useState } from 'react'

export default function Checkout({
  cart,
  subtotal,
  shipping,
  setShipping,
  grandTotal,
  placeOrder,
  setPage,
}) {
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  })
  const [errors, setErrors] = useState({})

  const updateField = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value })
  }

  const submitOrder = (event) => {
    event.preventDefault()
    const nextErrors = {}
    Object.entries(customer).forEach(([key, value]) => {
      if (!value.trim()) nextErrors[key] = 'This field is required'
    })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email) && customer.email) {
      nextErrors.email = 'Enter a valid email'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) placeOrder(customer)
  }

  return (
    <section className="checkout-page">
      <div className="breadcrumb">Shop <span>/</span> Shopping Cart <span>/</span> Checkout</div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder} noValidate>
          <h1>Shipping Address</h1>
          <div className="form-grid">
            <label>First Name
              <input name="firstName" value={customer.firstName} onChange={updateField} placeholder="John" />
              {errors.firstName && <small>{errors.firstName}</small>}
            </label>
            <label>Last Name
              <input name="lastName" value={customer.lastName} onChange={updateField} placeholder="Doe" />
              {errors.lastName && <small>{errors.lastName}</small>}
            </label>
            <label>Email
              <input name="email" type="email" value={customer.email} onChange={updateField} placeholder="john@email.com" />
              {errors.email && <small>{errors.email}</small>}
            </label>
            <label>Phone Number
              <input name="phone" value={customer.phone} onChange={updateField} placeholder="+855 12 345 678" />
              {errors.phone && <small>{errors.phone}</small>}
            </label>
            <label className="full-width">Address
              <textarea name="address" value={customer.address} onChange={updateField} placeholder="Street address" />
              {errors.address && <small>{errors.address}</small>}
            </label>
          </div>

          <h2 className="shipping-heading">Shipping Method</h2>
          <div className="shipping-options">
            <label className={shipping === 12 ? 'selected' : ''}>
              <input type="radio" name="shipping" checked={shipping === 12} onChange={() => setShipping(12)} />
              <span><strong>Standard Shipping</strong><small>3–5 business days</small></span>
              <b>$12</b>
            </label>
            <label className={shipping === 25 ? 'selected' : ''}>
              <input type="radio" name="shipping" checked={shipping === 25} onChange={() => setShipping(25)} />
              <span><strong>Express Shipping</strong><small>1–2 business days</small></span>
              <b>$25</b>
            </label>
          </div>
        </form>

        <aside className="summary-card checkout-summary">
          <h2>Your Cart</h2>
          {cart.map((item) => (
            <div className="mini-cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div><strong>{item.name}</strong><small>Qty: {item.quantity}</small></div>
              <b>${(item.price * item.quantity).toFixed(2)}</b>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="summary-row"><span>Shipping</span><strong>${shipping.toFixed(2)}</strong></div>
          <div className="summary-total"><span>Total</span><strong>${grandTotal.toFixed(2)}</strong></div>
          <button className="primary-button" onClick={submitOrder}>Place Order</button>
          <button className="back-button" onClick={() => setPage('cart')}>Back to Cart</button>
        </aside>
      </div>
    </section>
  )
}
