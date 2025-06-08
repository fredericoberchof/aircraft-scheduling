import React from "react"
import { useFlights } from "../hooks/useFlights"
import { Flight } from "../types/flight"

interface Props {
  onAddFlight: (flight: Flight) => void
  rotation: Flight[] 
}

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0")
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0")
  return `${h}:${m}`
}

const FlightList: React.FC<Props> = ({ onAddFlight, rotation = [] }) => {
  const { flights, loading } = useFlights()

  if (loading) return <div className="p-4 text-gray-600">Loading flights...</div>

  return (
    <div className="p-4 border-l border-gray-300 w-64 h-full overflow-y-auto bg-white">
      <h2 className="text-lg text-center font-bold mb-4 text-gray-800">Flights</h2>
      <ul className="space-y-3">
        {flights.map((flight) => {
          
          const isSelected = rotation.some((rotatedFlight) => rotatedFlight.ident === flight.ident)

          return (
            <li
              key={flight.ident}
              className={`border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-300 ${
                isSelected ? "bg-green-500 text-white shadow-md" : "hover:bg-blue-100"
              }`}
              onClick={() => !isSelected && onAddFlight(flight)}
            >
              <div className="text-center mb-2">
                <div className="text-sm font-medium">{flight.ident}</div>
              </div>
          
              <div className="flex justify-between">
                <div className="text-left">
                  <div className="text-xs">{flight.origin}</div>
                  <div className="text-xs mt-1">{formatTime(flight.departuretime)}</div>
                </div>

                <div className="mx-2 text-gray-500">→</div>
          
                <div className="text-right">
                  <div className="text-xs">{flight.destination}</div>
                  <div className="text-xs mt-1">{formatTime(flight.arrivaltime)}</div>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default FlightList