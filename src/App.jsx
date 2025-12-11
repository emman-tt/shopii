import './App.css'
import Homepage from './pages/HomePage'
import Products from './pages/ProductsPage'
import SPP from './pages/SingleProductPage'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
function App () {
  const [menu, showMenu] = useState(false)
  const [cart, showCart] = useState(false)
  const [recur, setRecur] = useState(0)
  const [checkout, showCheckout] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Homepage
              menu={menu}
              cart={cart}
              showCart={showCart}
              showMenu={showMenu}
              recur={recur}
              setRecur={setRecur}
              checkout={checkout}
              showCheckout={showCheckout}
            />
          }
        />
        <Route
          path='/products'
          element={
            <Products
              menu={menu}
              cart={cart}
              showCart={showCart}
              showMenu={showMenu}
              recur={recur}
              setRecur={setRecur}
              checkout={checkout}
              showCheckout={showCheckout}
            />
          }
        />
        <Route
          path='/products/:id'
          element={
            <SPP
              menu={menu}
              cart={cart}
              showCart={showCart}
              showMenu={showMenu}
              recur={recur}
              setRecur={setRecur}
              checkout={checkout}
              showCheckout={showCheckout}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
