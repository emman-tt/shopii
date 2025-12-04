import { useState, useEffect } from 'react'
export function useFetching ( page, gen, currentCat, currentColor ) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [items, setItems] = useState([])
  //  const PORT = 'https://shopii-backend.onrender.com/'
 
  const PORT = 'http://localhost:3000'
  useEffect(() => {
    ;(async function GetProducts () {
      const res = await fetch(
        `${PORT}/api/AllProducts?page=${page}&gender=${gen}&category=${currentCat}&color=${currentColor}`,
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

  return {isLoaded,items}
}
