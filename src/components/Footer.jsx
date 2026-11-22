export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-about">
          <div className="footer-brand"><span className="brand-mark">HT</span><strong>HengTech <span>Store</span></strong></div>
          <p>Your trusted destination for reliable, modern tech gear and computing essentials across Cambodia.</p>
        </div>
        <div className="footer-column">
          <h2>Quick Links</h2>
          <a href="#products">Products</a>
          <a href="#cart">Shopping Cart</a>
          <a href="#checkout">Checkout</a>
        </div>
        <div className="footer-column footer-delivery">
          <h2>Delivery Partners</h2>
          <div><span>ϟ <strong>VET Express</strong><small>1–2 Business Days</small></span><b>$2.00</b></div>
          <div><span>▰ <strong>J&amp;T Express</strong><small>1–3 Business Days</small></span><b>$1.50</b></div>
        </div>
        <div className="footer-column footer-contact">
          <h2>Contact Information</h2>
          <p>⌖ &nbsp; Phnom Penh, Cambodia</p>
          <p>♧ &nbsp; +855 12 345 678</p>
          <p>✉ &nbsp; support@hengtechstore.com</p>
          <p>◷ &nbsp; Mon–Sun, 8:00 AM – 8:00 PM</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 HengTech Store. All rights reserved.</span>
        <span>Nationwide Delivery via VET Express &amp; J&amp;T Express</span>
      </div>
    </footer>
  )
}
