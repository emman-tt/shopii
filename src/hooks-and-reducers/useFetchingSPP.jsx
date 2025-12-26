import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_PORT_URL
import { FilterContext } from '../App'

export default function useFecthingSPP (setColor, recur) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isNotFound, setIsNotFound] = useState(false)
  const [data, setData] = useState([])
  const { id } = useParams()
  const { state, dispatch } = useContext(FilterContext)

  useEffect(() => {
    const controller = new AbortController()
    const split = id.split(':')[1]
    ;(async function FetchSPP () {
      const res = await fetch(`${API_URL}/getSPP?ID=${split}`, {
        method: 'GET',
        credentials: 'include',
        signal: controller.signal
      })

      const items = await res.json()
      const details = items.product

      if (details) {
        setIsNotFound(true)
        setIsLoaded(true)
        setColor(details.colours[0])
        setData([details])
        dispatch({ type: 'changeSPP', payload: details.description })
        return
      }
    })()

    return () => controller.abort()
  }, [recur])

  return { isLoaded, data }
}
