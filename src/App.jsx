import { useMemo, useState } from 'react'
import Header from './components/Header.jsx'
import Products from './components/Products.jsx'
import Cart from './components/cart.jsx'
import Checkout from './components/Checkout.jsx'
import Confirmation from './components/Confirmation.jsx'
import Footer from './components/Footer.jsx'

export const products = [
  { id: 1, name: 'Laptop', price: 650, category: 'Computers', variant: 'Space Silver', art: 'laptop' },
  { id: 2, name: 'Mouse', price: 15, category: 'Accessories', variant: 'Matte Graphite', art: 'mouse' },
  { id: 3, name: 'Keyboard', price: 25, category: 'Accessories', variant: 'Obsidian Grey', art: 'keyboard' },
  { id: 4, name: 'Monitor', price: 120, category: 'Displays', variant: 'Midnight Black', art: 'monitor' },
]

export default function App() {
  const [page, setPage] = useState('shop')
  const [cart, setCart] = useState([])
  const [shippingMethod, setShippingMethod] = useState('vet')
  const [order, setOrder] = useState(null)
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState([])
  const [showFavorites, setShowFavorites] = useState(false)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shippingMethods = {
    vet: { id: 'vet', name: 'VET Express', detail: 'Vireak Buntham Express', delivery: '1–2 Business Days', price: 2 },
    jat: { id: 'jat', name: 'J&T Express', detail: 'Nationwide Door-to-Door Courier', delivery: '1–3 Business Days', price: 1.5 },
  }
  const shipping = shippingMethods[shippingMethod]
  const grandTotal = subtotal + shipping.price
  const visibleProducts = useMemo(() => products.filter((product) => {
    const matchesSearch = `${product.name} ${product.category} ${product.variant}`
      .toLowerCase()
      .includes(query.trim().toLowerCase())
    return matchesSearch && (!showFavorites || favorites.includes(product.id))
  }), [query, showFavorites, favorites])

  const addToCart = (product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) {
      setCart((current) => current.filter((item) => item.id !== id))
      return
    }
    setCart((current) =>
      current.map((item) => (item.id === id ? { ...item, quantity } : item)),
    )
  }

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((itemId) => itemId !== id) : [...current, id],
    )
  }

  const placeOrder = (customer) => {
    setOrder({
      id: `ORD-${Date.now().toString().slice(-6)}`,
      customer,
      date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
      items: cart,
      subtotal,
      shipping,
      total: grandTotal,
    })
    setPage('confirmation')
    setCart([])
  }

  return (
    <div className="app-shell">
      <Header
        cartCount={cartCount}
        favoritesCount={favorites.length}
        page={page}
        query={query}
        setQuery={setQuery}
        setPage={setPage}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <main className="main-content">
        {page === 'shop' && (
          <Products
            products={visibleProducts}
            favorites={favorites}
            onAdd={addToCart}
            onToggleFavorite={toggleFavorite}
          />
        )}
        {page === 'cart' && (
          <Cart
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            grandTotal={grandTotal}
            updateQuantity={updateQuantity}
            setPage={setPage}
          />
        )}
        {page === 'checkout' && (
          <Checkout
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            shippingMethods={shippingMethods}
            setShippingMethod={setShippingMethod}
            grandTotal={grandTotal}
            placeOrder={placeOrder}
            setPage={setPage}
          />
        )}
        {page === 'confirmation' && order && (
          <Confirmation order={order} setPage={setPage} />
        )}
      </main>
      <Footer />
    </div>
  )
}
