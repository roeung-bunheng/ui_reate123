export default function Cart({ cart, subtotal, shipping, grandTotal, updateQuantity, setPage }) {
  return (
    <section className="cart-page">
      <div className="breadcrumb">Shop <span>/</span> Shopping Cart</div>
      <div className="cart-layout">
        <div className="cart-section">
          <h1>Shopping Cart</h1>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="primary-button" onClick={() => setPage('shop')}>Continue Shopping</button>
            </div>
          ) : (
            cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <p className="cart-category">{item.category}</p>
                  <h2>{item.name}</h2>
                  <p>${item.price}</p>
                </div>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Remove one ${item.name}`}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Add one ${item.name}`}>+</button>
                </div>
                <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
                <button className="remove-button" onClick={() => updateQuantity(item.id, 0)} aria-label={`Remove ${item.name}`}>×</button>
              </article>
            ))
          )}
        </div>
        <aside className="summary-card">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
          <div className="summary-row"><span>Shipping</span><strong>${shipping.toFixed(2)}</strong></div>
          <div className="summary-total"><span>Grand Total</span><strong>${grandTotal.toFixed(2)}</strong></div>
          <button
            className="primary-button"
            disabled={cart.length === 0}
            onClick={() => setPage('checkout')}
          >
            Proceed to Checkout
          </button>
        </aside>
      </div>
    </section>
  )
}
