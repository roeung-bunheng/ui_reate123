import ProductArt from './ProductArt.jsx'

const money = (amount) => `$${amount.toFixed(2)}`

export default function Confirmation({ order, setPage }) {
  const { customer, shipping } = order
  const customerName = `${customer.firstName} ${customer.lastName}`

  return (
    <section className="receipt-page">
      <div className="breadcrumb"><span>Cart</span><i>›</i><span>Checkout</span><i>›</i><strong>Confirmation</strong></div>
      <article className="receipt-card">
        <header className="receipt-heading">
          <div className="receipt-check">✓</div>
          <p className="eyebrow">HENGTECH STORE RECEIPT</p>
          <h1>Order Placed Successfully!</h1>
          <p>Thank you for shopping at HengTech Store. Your order has<br className="desktop-break" /> been recorded and is now pending processing.</p>
        </header>
        <section className="receipt-meta">
          <div><span>Order ID</span><strong>{order.id}</strong></div>
          <div><span>Order Date</span><strong>{order.date}</strong></div>
          <div><span>Order Status</span><strong className="status">● Pending</strong></div>
        </section>
        <section className="receipt-meta receipt-address">
          <div><span>Customer Information</span><strong>♙ &nbsp; {customerName}</strong><strong>✉ &nbsp; {customer.email}</strong><strong>♧ &nbsp; {customer.phone}</strong></div>
          <div><span>Shipping &amp; Delivery</span><strong>⌖ &nbsp; {customer.address}, {customer.city}</strong><strong>♧ &nbsp; {shipping.name} ({shipping.delivery})</strong>{customer.note && <small>Note: {customer.note}</small>}</div>
        </section>
        <section className="receipt-products">
          <h2>◎ &nbsp; Ordered Products</h2>
          <div className="receipt-table-head"><span>Product</span><span>Qty</span><span>Unit Price</span><span>Line Total</span></div>
          {order.items.map((item) => (
            <div className="receipt-product" key={item.id}>
              <div className="receipt-product-name">
                <span className="receipt-art"><ProductArt type={item.art} small /></span>
                <span><strong>{item.name}</strong><small>{item.category}</small></span>
              </div>
              <span>{item.quantity}</span>
              <span>{money(item.price)}</span>
              <strong>{money(item.price * item.quantity)}</strong>
            </div>
          ))}
        </section>
        <section className="receipt-totals">
          <div><span>Subtotal</span><strong>{money(order.subtotal)}</strong></div>
          <div><span>Delivery Fee ({shipping.name})</span><strong>{money(shipping.price)}</strong></div>
          <div className="receipt-grand-total"><span>Total Amount</span><strong>{money(order.total)}</strong></div>
        </section>
        <footer className="receipt-footer">
          <button className="primary-button" onClick={() => setPage('shop')}>Continue Shopping &nbsp; →</button>
        </footer>
      </article>
    </section>
  )
}
