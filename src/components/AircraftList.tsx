import { useEffect, useState } from "react"
import { Aircraft, Flight } from "../types/flight"
import { getAircrafts } from "../services/api"
import UtilizationBar from "./UtilizationBar"
import { calculateUtilization } from "../utils/calculateUtilization"

type Props = {
  selectedAircraftId: string | null
  onSelect: (id: string) => void
  getRotation: (aircraftId: string) => Flight[] 
}

export default function AircraftList({ selectedAircraftId, onSelect, getRotation }: Props) {
  const [aircrafts, setAircrafts] = useState<Aircraft[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAircrafts()
      setAircrafts(data)
    }

    fetchData()
  }, [])

  return (
    <div className="w-64 border-r border-gray-300 p-4 overflow-y-auto bg-white">
      <h2 className="font-semibold text-center text-lg mb-4 text-gray-800">Aircrafts</h2>

      {aircrafts.length === 0 ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : (
        <ul className="space-y-3">
          {aircrafts.map((aircraft) => {
            const rotation = getRotation(aircraft.ident) 
            const utilization = calculateUtilization(rotation) 

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