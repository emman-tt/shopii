import { useState, useEffect } from 'react'
  const API_URL = import.meta.env.VITE_PORT_URL

export function useFetching (page, gen, currentCat, currentColor) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `${API_URL}/AllProducts?page=${page}&gender=${gen}&category=${currentCat}&color=${currentColor}`,
        { method: 'GET' }
      )
      const products = await res.json()

      const use = products.products
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
