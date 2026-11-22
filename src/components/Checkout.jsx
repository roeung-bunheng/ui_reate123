import { useState } from 'react'
import ProductArt from './ProductArt.jsx'

const money = (amount) => `$${amount.toFixed(2)}`

export default function Checkout({
  cart,
  subtotal,
  shipping,
  shippingMethods,
  setShippingMethod,
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
    city: '',
    note: '',
  })
  const [errors, setErrors] = useState({})

  const updateField = (event) => {
    setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }))
  }

  const submitOrder = (event) => {
    event.preventDefault()
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city']
    const nextErrors = {}
    requiredFields.forEach((key) => {
      if (!customer[key].trim()) nextErrors[key] = 'This field is required'
    })
    if (customer.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      nextErrors.email = 'Enter a valid email'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length === 0) placeOrder(customer)
  }

  const field = (name, label, placeholder, type = 'text', className = '') => (
    <label className={className} key={name}>
      <span>{label}{name !== 'note' && <b> *</b>}</span>
      {name === 'note' ? (
        <textarea name={name} value={customer[name]} onChange={updateField} placeholder={placeholder} />
      ) : (
        <input name={name} type={type} value={customer[name]} onChange={updateField} placeholder={placeholder} />
      )}
      {errors[name] && <small>{errors[name]}</small>}
    </label>
  )

  return (
    <section className="checkout-page">
      <div className="breadcrumb"><button onClick={() => setPage('cart')}>Cart</button><i>›</i><span>Checkout</span><i>›</i><span>Confirmation</span></div>
      <div className="checkout-layout">
        <div className="checkout-form">
          <form id="checkout-form" onSubmit={submitOrder} noValidate>
            <h1>Customer &amp; Shipping Address</h1>
            <div className="form-grid">
              {field('firstName', 'First Name', 'e.g. Sopha')}
              {field('lastName', 'Last Name', 'e.g. Chan')}
              {field('email', 'Email', 'sopha@example.com', 'email')}
              {field('phone', 'Phone Number', '012 345 678', 'tel')}
              {field('address', 'Street / House Address', 'House No., Street, Sangkat / Khan', 'text', 'street-field')}
              {field('city', 'City / Province', 'Phnom Penh')}
              {field('note', 'Delivery Note (Optional)', 'Add landmark, drop-off instructions, or preferred delivery time...', 'text', 'note-field')}
            </div>
            <div className="shipping-divider" />
            <h2 className="shipping-heading">Delivery Method</h2>
            <div className="shipping-options">
              {Object.values(shippingMethods).map((method) => (
                <label className={shipping.id === method.id ? 'selected' : ''} key={method.id}>
                  <input
                    type="radio"
                    name="shipping"
                    checked={shipping.id === method.id}
                    onChange={() => setShippingMethod(method.id)}
                  />
                  <span className="shipping-option-copy">
                    <strong>{method.name}</strong>
                    <small>{method.detail}</small>
                    <small>{method.delivery}</small>
                  </span>
                  <b>{money(method.price)}</b>
                </label>
              ))}
            </div>
          </form>
          <button className="back-link" onClick={() => setPage('cart')}>← &nbsp; Back to Cart</button>
        </div>

        <aside className="summary-card checkout-summary">
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <div className="mini-cart-item" key={item.id}>
              <div className="mini-art"><ProductArt type={item.art} small /></div>
              <div><strong>{item.name}</strong><small>{money(item.price)} × {item.quantity}</small></div>
              <b>{money(item.price * item.quantity)}</b>
            </div>
          ))}
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-row"><span>Delivery ({shipping.name})</span><strong>{money(shipping.price)}</strong></div>
          <div className="summary-total"><span>Grand Total</span><strong>{money(grandTotal)}</strong></div>
          <button className="primary-button" type="submit" form="checkout-form">Place Order</button>
          <button className="back-button" onClick={() => setPage('cart')}>Back to Cart</button>
        </aside>
      </div>
    </section>
  )
}
