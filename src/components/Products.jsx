import { products } from '../App.jsx'

export default function Products({ onAdd, setPage }) {
  return (
    <section className="shop-page">
      <div className="page-heading">
        <div>
          <p className="eyebrow">NEW COLLECTION</p>
          <h1>Computer Accessories</h1>
        </div>
        <button className="outline-button" onClick={() => setPage('cart')}>View Cart</button>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article className="product-card" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
              <span className="category">{product.category}</span>
            </div>
            <div className="product-info">
              <div>
                <h2>{product.name}</h2>
                <p className="price">${product.price}</p>
              </div>
              <button className="add-button" onClick={() => onAdd(product)}>
                <span>+</span> Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
