import './App.css'
import Homepage from './pages/HomePage'
import Products from './pages/ProductsPage'
import SPP from './pages/SingleProductPage'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'
import { createContext, useReducer } from 'react'
import fetchProductReducer, {
  initialState
} from './hooks-and-reducers/fetchProducts'
export const FilterContext = createContext()
function App () {
  const [menu, showMenu] = useState(false)
  const [cart, showCart] = useState(false)
  // const [recur, setRecur] = useState(1)
  const [checkout, showCheckout] = useState(false)
  const [state, dispatch] = useReducer(fetchProductReducer, initialState)

  return (
    <FilterContext.Provider value={{ state, dispatch }}>
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
                // recur={recur}
                // setRecur={setRecur}
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
                // recur={recur}
                // setRecur={setRecur}
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
                // recur={recur}
                // setRecur={setRecur}
                checkout={checkout}
                showCheckout={showCheckout}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </FilterContext.Provider>
  )
}

export default App
