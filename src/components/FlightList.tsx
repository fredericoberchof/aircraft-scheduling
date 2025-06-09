import React, { useState } from "react"
import { useFlights } from "../hooks/useFlights"
import { Flight } from "../types/aviationTypes"
import { formatTime } from "../utils/formatTime"
import SearchInput from "./SearchInput"

interface Props {
  onAddFlight: (flight: Flight) => void
  rotation: Flight[]
}

const FlightList: React.FC<Props> = ({ onAddFlight, rotation = [] }) => {
  const { flights, loading } = useFlights()
  const [search, setSearch] = useState("")

  const filteredFlights = flights.filter(
    (flight) =>
      flight.ident.toLowerCase().includes(search.toLowerCase()) ||
      flight.origin.toLowerCase().includes(search.toLowerCase()) ||
      flight.destination.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-4 border-l border-gray-300 w-64 h-full overflow-y-auto bg-white">
      <h2 className="text-lg text-center font-bold mb-4 text-gray-800">
        Flights
      </h2>
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
      ) : filteredFlights.length === 0 ? (
        <p className="text-gray-500 text-sm">No flights found.</p>
      ) : (
        <ul className="space-y-3">
          {filteredFlights.map((flight) => {
            const isSelected = rotation.some(
              (rotatedFlight) => rotatedFlight.ident === flight.ident
            )
            return (
              <li
                key={flight.ident}
                className={`border rounded-lg p-3 cursor-pointer shadow-sm transition-all duration-300 ${
                  isSelected
                    ? "bg-green-500 text-white shadow-md"
                    : "hover:bg-blue-100"
                }`}
                onClick={() => !isSelected && onAddFlight(flight)}
              >
                <div className="text-center mb-2">
                  <div className="text-sm font-medium">{flight.ident}</div>
                </div>
                <div className="flex justify-between">
                  <div className="text-left">
                    <div className="text-xs">{flight.origin}</div>
                    <div className="text-xs mt-1">
                      {formatTime(flight.departuretime)}
                    </div>
                  </div>
                  <div className="mx-2 text-gray-500">→</div>
                  <div className="text-right">
                    <div className="text-xs">{flight.destination}</div>
                    <div className="text-xs mt-1">
                      {formatTime(flight.arrivaltime)}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
          {filteredFlights.length === 0 && (
            <li className="text-center text-gray-400 text-sm">
              No flights found.
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default FlightList
