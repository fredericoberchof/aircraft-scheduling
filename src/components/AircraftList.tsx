import { useEffect, useState } from "react"
import { Aircraft, Flight } from "../types/aviationTypes"
import { getAircrafts } from "../services/api"
import { calculateUtilization } from "../utils/calculateUtilization"
import UtilizationBar from "./UtilizationBar"
import SearchInput from "./SearchInput"

type Props = {
  selectedAircraftId: string | null
  onSelect: (id: string) => void
  getRotation: (aircraftId: string) => Flight[] 
}

export default function AircraftList({ selectedAircraftId, onSelect, getRotation }: Props) {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAircrafts()
      setAircrafts(data)
      setLoading(false)
    }

    fetchData()
  }, [])

  const filteredAircrafts = aircrafts.filter(aircraft =>
    aircraft.ident.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="w-64 border-r border-gray-300 p-4 overflow-y-auto bg-white">
      <h2 className="font-semibold text-center text-lg mb-4 text-gray-800">Aircrafts</h2>
      
      <div className="relative mb-4">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search..."
          className="mb-4"
        />
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : filteredAircrafts.length === 0 ? (
        <p className="text-gray-500 text-sm">No aircrafts found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredAircrafts.map((aircraft) => {
            const rotation = getRotation(aircraft.ident) 

            return (
              <li
                key={aircraft.ident}
                className={`p-3 rounded-lg cursor-pointer text-sm border transition-all duration-300 ${
                  selectedAircraftId === aircraft.ident
                    ? "bg-green-500 text-white shadow-md"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => onSelect(aircraft.ident)}
              >
                <div className="font-medium text-center">{aircraft.ident}</div>
                <div className="mt-2">
                  <UtilizationBar rotation={rotation} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}