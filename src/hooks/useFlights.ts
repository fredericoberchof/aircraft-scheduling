import { useEffect, useState } from "react"
import { getFlights } from "../services/api"
import { Flight } from "../types/aviationTypes"

export function useFlights() {
  const [flights, setFlights] = useState<Flight[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    async function fetchFlights() {
      const data = await getFlights()
      setFlights(data)
      setLoading(false)
    }
    fetchFlights()
  }, [])

  return { flights, loading }
}
