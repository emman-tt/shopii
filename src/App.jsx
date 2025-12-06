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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
