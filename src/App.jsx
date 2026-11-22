import { useState } from 'react'
import Header from './components/Header.jsx'
import Products from './components/Products.jsx'
import Cart from './components/cart.jsx'
import Checkout from './components/Checkout.jsx'
import Confirmation from './components/Confirmation.jsx'

export const products = [
  { id: 1, name: 'Laptop', price: 650, category: 'Computer', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop' },
  { id: 2, name: 'Mouse', price: 15, category: 'Accessories', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop' },
  { id: 3, name: 'Keyboard', price: 25, category: 'Accessories', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop' },
  { id: 4, name: 'Monitor', price: 120, category: 'Computer', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop' },
]

export default function App() {
  const [page, setPage] = useState('shop')
  const [cart, setCart] = useState([])
  const [shipping, setShipping] = useState(12)
  const [order, setOrder] = useState(null)

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0)
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const grandTotal = subtotal + shipping

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

  const placeOrder = (customer) => {
    setOrder({
      id: 'ORD-0001',
      customer,
      date: new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date()),
      items: cart,
      total: grandTotal,
    })
    setPage('confirmation')
  }

  return (
    <div className="app-shell">
      <Header cartCount={cartCount} page={page} setPage={setPage} />
      <main>
        {page === 'shop' && <Products onAdd={addToCart} setPage={setPage} />}
        {page === 'cart' && (
          <Cart
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            grandTotal={subtotal + shipping}
            updateQuantity={updateQuantity}
            setPage={setPage}
          />
        )}
        {page === 'checkout' && (
          <Checkout
            cart={cart}
            subtotal={subtotal}
            shipping={shipping}
            setShipping={setShipping}
            grandTotal={grandTotal}
            placeOrder={placeOrder}
            setPage={setPage}
          />
        )}
        {page === 'confirmation' && order && (
          <Confirmation order={order} setPage={setPage} />
        )}
      </main>
    </div>
  )
}
