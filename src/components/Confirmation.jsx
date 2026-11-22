export default function Confirmation({ order, setPage }) {
  return (
    <section className="confirmation-page">
      <div className="success-icon">✓</div>
      <p className="eyebrow">THANK YOU</p>
      <h1>Order Placed Successfully!</h1>
      <p className="confirmation-copy">Your order has been confirmed and will be processed soon.</p>
      <div className="confirmation-card">
        <div className="confirmation-details">
          <div><span>Order ID</span><strong>{order.id}</strong></div>
          <div><span>Customer Name</span><strong>{order.customer.firstName} {order.customer.lastName}</strong></div>
          <div><span>Order Date</span><strong>{order.date}</strong></div>
          <div><span>Order Status</span><strong className="status">Pending</strong></div>
        </div>
        <div className="confirmed-products">
          <h2>Ordered Products</h2>
          {order.items.map((item) => (
            <div className="confirmed-product" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div><strong>{item.name}</strong><small>Qty: {item.quantity}</small></div>
              <b>${(item.price * item.quantity).toFixed(2)}</b>
            </div>
          ))}
          <div className="confirmed-total"><span>Total Amount</span><strong>${order.total.toFixed(2)}</strong></div>
        </div>
      </div>
      <button className="primary-button confirmation-button" onClick={() => setPage('shop')}>Continue Shopping</button>
    </section>
  )
}
