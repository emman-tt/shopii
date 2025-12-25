import { useState, useEffect, useReducer } from 'react'
const API_URL = import.meta.env.VITE_PORT_URL
import fetchProductReducer, {
  initialState
} from '../hooks-and-reducers/fetchProducts.jsx'

export function useFetching (
  page,
  gen,
  currentCat,
  currentColor,
) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [items, setItems] = useState([])
  const [{ pageId, genderId, categoryId, colorId }, dispatch] = useReducer(
    fetchProductReducer,
    initialState
  )

  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `${API_URL}/AllProducts?page=${page}&gender=${gen}&category=${currentCat}&color=${currentColor}`,
        { method: 'GET' }
      )
      const products = await res.json()

      const use = products.products
      // console.log(use)
      if (!use || use.length < 1) {
        setIsNotFound(true)
        setIsLoaded(true)
        setItems(use)
        return
      }

      setIsLoaded(true)
      setItems(use)
    })()

    return () => {
      setIsLoaded(false)
      setIsNotFound(false)
    }
  }, [gen, currentCat, currentColor])

  return { isLoaded, items }
}
