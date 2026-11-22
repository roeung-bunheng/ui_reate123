export default function Header({ cartCount, page, setPage }) {
  return (
    <header className="header">
      <button className="brand" onClick={() => setPage('shop')}>
        <span className="brand-mark">T</span>
        <span>Techy</span>
      </button>
      <nav className="nav">
        <button className={page === 'shop' ? 'active' : ''} onClick={() => setPage('shop')}>Shop</button>
        <button className={page === 'cart' ? 'active' : ''} onClick={() => setPage('cart')}>
          Cart
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>
    </header>
  )
}
