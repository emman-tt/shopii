import { useState, useEffect, useRef } from 'react'
import './App.css'
import Homepage from './pages/HomePage'
import Products from './pages/ProductsPage'
import { BrowserRouter } from 'react-router-dom'
import { Route ,Routes} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/shopii/' element={<Homepage/>}/>
      <Route path='/shopii/products' element={<Products/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App