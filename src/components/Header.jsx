export default function Header({
  cartCount,
  favoritesCount,
  page,
  query,
  setQuery,
  setPage,
  showFavorites,
  setShowFavorites,
}) {
  return (
    <header className="header">
      <button className="brand" onClick={() => { setPage('shop'); setShowFavorites(false) }}>
        <span className="brand-mark">HT</span>
        <span>HengTech <span className="brand-light">Store</span></span>
      </button>
      <nav className="nav">
        <button
          className={page === 'shop' && !showFavorites ? 'active' : ''}
          onClick={() => { setPage('shop'); setShowFavorites(false) }}
        >Products</button>
        <button className={page === 'cart' ? 'active' : ''} onClick={() => setPage('cart')}>Cart</button>
      </nav>
      <div className="header-tools">
        <label className="search-box">
          <span aria-hidden="true">⌕</span>
          <input
            aria-label="Search products"
            placeholder="Search products..."
            value={query}
            onChange={(event) => { setQuery(event.target.value); setPage('shop') }}
          />
        </label>
        <button
          className={`icon-button ${showFavorites ? 'active' : ''}`}
          aria-label="Show favorites"
          title={favoritesCount ? `${favoritesCount} saved favorites` : 'Show favorites'}
          onClick={() => { setPage('shop'); setShowFavorites(!showFavorites) }}
        >♡</button>
        <button className="icon-button cart-icon-button" aria-label="Open shopping cart" onClick={() => setPage('cart')}>
          <svg className="cart-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.6L21 8H6" />
            <path d="m10 8 2 3 2-3" />
            <circle cx="10" cy="19" r="1" />
            <circle cx="18" cy="19" r="1" />
          </svg>
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  )
}
