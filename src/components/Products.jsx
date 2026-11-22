import ProductArt from './ProductArt.jsx'

export default function Products({ products, favorites, onAdd, onToggleFavorite }) {
  return (
    <section className="shop-page">
      <div className="page-heading">
        <h1>Essential Computing Gear</h1>
      </div>
      {products.length ? <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              <ProductArt type={product.art} />
              <span className="category">{product.category}</span>
              <button
                className={`favorite-button ${favorites.includes(product.id) ? 'is-favorite' : ''}`}
                onClick={() => onToggleFavorite(product.id)}
                aria-label={`${favorites.includes(product.id) ? 'Remove' : 'Add'} ${product.name} ${favorites.includes(product.id) ? 'from' : 'to'} favorites`}
              >♡</button>
            </div>
            <div className="product-info">
              <div className="product-title">
                <h2>{product.name}</h2>
                <p className="price">${product.price}</p>
              </div>
              <button className="add-button" onClick={() => onAdd(product)}>
                <span>+</span> Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div> : <div className="no-products">No products match your search.</div>}
      <div className="delivery-benefits">
        <div><span className="benefit-icon">ϟ</span><p><strong>VET Express ($2.00)</strong><small>1–2 Business Days nationwide</small></p></div>
        <div><span className="benefit-icon">▰</span><p><strong>J&amp;T Express ($1.50)</strong><small>1–3 Business Days door-to-door</small></p></div>
        <div><span className="benefit-icon">◇</span><p><strong>1-Year Warranty</strong><small>Genuine quality guarantee</small></p></div>
      </div>
    </section>
  )
}
