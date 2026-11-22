import ProductArt from './ProductArt.jsx'

const money = (amount) => `$${amount.toFixed(2)}`

export default function Cart({ cart, subtotal, shipping, grandTotal, updateQuantity, setPage }) {
  const count = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <section className="cart-page">
      <div className="breadcrumb"><span>Cart</span><i>›</i><span>Checkout</span><i>›</i><span>Confirmation</span></div>
      <div className="cart-layout">
        <div className="cart-section">
          <div className="cart-title-row">
            <h1>Shopping Cart</h1>
            {cart.length > 0 && <span className="items-pill">{count} {count === 1 ? 'item' : 'items'}</span>}
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="primary-button" onClick={() => setPage('shop')}>Continue Shopping</button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-art"><ProductArt type={item.art} small /></div>
                  <div className="cart-item-info">
                    <h2>{item.name}</h2>
                    <p className="cart-category">{item.category} · {item.variant}</p>
                    <p className="unit-price">Unit Price: {money(item.price)}</p>
                    <button className="remove-button" onClick={() => updateQuantity(item.id, 0)}>♧ &nbsp; Remove</button>
                  </div>
                  <strong className="item-total">{money(item.price * item.quantity)}</strong>
                  <div className="quantity-control">
                    <button
                      disabled={item.quantity <= 1}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      aria-label={`Remove one ${item.name}`}
                    >−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                </article>
              ))}
              <button className="continue-link" onClick={() => setPage('shop')}>← &nbsp; Continue Shopping</button>
            </>
          )}
        </div>
        <aside className="summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
          <div className="summary-row"><span>Delivery ({shipping.name})</span><strong>{money(shipping.price)}</strong></div>
          <div className="summary-total"><span>Grand Total</span><strong>{money(grandTotal)}</strong></div>
          <button
            className="primary-button"
            disabled={cart.length === 0}
            onClick={() => setPage('checkout')}
          >
            Proceed to Checkout
          </button>
          <p className="summary-note">Select VET Express ($2.00) or J&amp;T Express ($1.50) at checkout.</p>
        </aside>
      </div>
    </section>
  )
}
