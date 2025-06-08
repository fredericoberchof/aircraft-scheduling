import { useState } from "react"
import AircraftList from "../components/AircraftList"
import FlightList from "../components/FlightList"
import { Flight } from "../types/flight"
import RotationTimeline from "../components/RotationTimeline"
import { validateFlightAddition } from "../utils/rotationValidation"
import { useSnackbar } from "../hooks/useSnackbar"
import { useRotationStore } from "../hooks/useRotationStore"
import DateNavigator from "../components/DateNavigator"
import { format } from "date-fns"

function Home() {
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(null)
  const { showMessage } = useSnackbar()
  const [date, setDate] = useState(new Date()) 
  const [rotationsByDate, setRotationsByDate] = useState<Record<string, Record<string, Flight[]>>>({})

  const dateKey = format(date, "yyyy-MM-dd") 
  const { getRotation, updateRotation } = useRotationStore()

  const rotation = selectedAircraftId
    ? rotationsByDate[dateKey]?.[selectedAircraftId] || []
    : []

  const handleAddFlight = (flight: Flight) => {
    if (!selectedAircraftId) return

    const error = validateFlightAddition(flight, rotation)
    if (error) {
      showMessage(error, "warning")
      return
    }

    const updatedRotation = [...rotation, flight]
    setRotationsByDate((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [selectedAircraftId]: updatedRotation,
      },
    }))
  }

  const handleRemoveFlight = (flightIdent: string) => {
    if (!selectedAircraftId) return

    const updatedRotation = rotation.filter((f) => f.ident !== flightIdent)
    setRotationsByDate((prev) => ({
      ...prev,
      [dateKey]: {
        ...prev[dateKey],
        [selectedAircraftId]: updatedRotation,
      },
    }))
  }

  const handleDateChange = (newDate: Date) => {
    setDate(newDate)
  }

  return (
    <div className="flex h-screen bg-blue-50">
      <AircraftList
        selectedAircraftId={selectedAircraftId}
        onSelect={setSelectedAircraftId}
        getRotation={(aircraftId) =>
          rotationsByDate[dateKey]?.[aircraftId] || []
        }
      />

      <div
        className={`flex-1 p-6 bg-white shadow-md ${
          rotation.length > 0 ? "overflow-y-auto" : ""
        }`}
      >
        {selectedAircraftId ? (
          <>
            <DateNavigator currentDate={date} onChange={handleDateChange} />
            <h2 className="text-xl text-center font-bold mb-6 text-gray-800">
              Rotation: {selectedAircraftId}
            </h2>

            {rotation.length > 0 ? (
              <>
                <ul className="space-y-4 mb-6">
                  {rotation.map((flight) => (
                    <li
                      key={flight.ident}
                      className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                    >
                      {/* Flight ID (left-aligned) */}
                      <div className="min-w-[120px]">
                        <div className="text-left">
                          <span className="text-sm font-semibold text-gray-700">
                            Flight:{" "}
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            {flight.ident}
                          </span>
                        </div>
                      </div>

                      <div className="flex-1 mx-4">
                        <div className="flex justify-center items-center space-x-8 mb-1">
                          <div className="text-center">
                            <div className="text-base font-medium text-gray-800">
                              {flight.origin}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {flight.readable_departure}
                            </div>
                          </div>

                          <div className="text-gray-500">→</div>

                          <div className="text-center">
                            <div className="text-base font-medium text-gray-800">
                              {flight.destination}
                            </div>
                            <div className="text-xs text-gray-600 mt-1">
                              {flight.readable_arrival}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleRemoveFlight(flight.ident)}
                        className="text-red-600 hover:text-white text-xs border border-red-300 hover:border-red-600 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>

                <RotationTimeline rotation={rotation} />
              </>
            ) : (
              <div className="flex h-full items-center justify-center">
                <p className="text-gray-600">No flights assigned yet.</p>
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center">
            <p className="text-gray-600 text-lg">
              Select an aircraft to begin scheduling.
            </p>
          </div>
        )}
      </div>

      <FlightList onAddFlight={handleAddFlight} rotation={rotation || []} />
    </div>
  )
}

export default Home