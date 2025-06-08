import { useEffect, useState } from "react"
import { getAircrafts } from "../services/api"
import { Aircraft } from "../types/aviationTypes"

export function useAircrafts() {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAircrafts() {
      const data = await getAircrafts()
      setAircrafts(data)
      setLoading(false)
    }
    fetchAircrafts()
  }, [])

  return { aircrafts, loading }
}
