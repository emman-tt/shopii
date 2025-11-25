import './App.css'
import Homepage from './pages/HomePage'
import Products from './pages/ProductsPage'
import SPP from './pages/SingleProductPage'
import { BrowserRouter } from 'react-router-dom'
import { Route ,Routes} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/products/:id' element={<SPP/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App