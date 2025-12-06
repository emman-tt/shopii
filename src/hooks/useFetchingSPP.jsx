import { useState, useEffect } from 'react'
// const PORT = 'https://shopii-backend.onrender.com'
import { useParams } from 'react-router-dom'
export default function useFecthingSPP (setColor, recur) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [data, setData] = useState([])
  const { id } = useParams()


const PORT = 'http://localhost:3000'

  useEffect(() => {
    const split = id.split(':')[1]
    ;(async function FetchSPP () {
      const res = await fetch(`${PORT}/api/getSPP?ID=${split}`, {
        method: 'GET'
      })

      const items = await res.json()
      const details = items.product

      if (details) {
        setIsNotFound(true)
        setIsLoaded(true)
        setColor(details.colours[0])
        setData([details])
        return
      }
    })()
  }, [recur])

  return { isLoaded, data }
}
