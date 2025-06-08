import { useState, useEffect } from "react"
import { Flight } from "../types/flight"
import { validateFlightAddition } from "../utils/rotationValidation"
import { useSnackbar } from "../hooks/useSnackbar"
import { format } from "date-fns"
import { saveToLocalStorage, getFromLocalStorage } from "../utils/localStorageUtils"
import AircraftList from "../components/AircraftList"
import FlightList from "../components/FlightList"
import RotationTimeline from "../components/RotationTimeline"
import DateNavigator from "../components/DateNavigator"
import RotationList from "../components/RotationList"
import EmptyState from "../components/EmptyState"

function Home() {
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(
    () => getFromLocalStorage<string>("selectedAircraftId") || null
  )
  const { showMessage } = useSnackbar()
  const [date, setDate] = useState(new Date())
  const [rotationsByDate, setRotationsByDate] = useState<
    Record<string, Record<string, Flight[]>>
  >(() => getFromLocalStorage<Record<string, Record<string, Flight[]>>>("rotationsByDate") || {})

  const dateKey = format(date, "yyyy-MM-dd")
  const rotation = selectedAircraftId
    ? rotationsByDate[dateKey]?.[selectedAircraftId] || []
    : []

  useEffect(() => {
    saveToLocalStorage("selectedAircraftId", selectedAircraftId || "")
  }, [selectedAircraftId])

  useEffect(() => {
    saveToLocalStorage("rotationsByDate", rotationsByDate)
  }, [rotationsByDate])

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
            <h2 className="text-xl text-center mb-6 font-semibold text-gray-700">
              Rotation: {selectedAircraftId}
            </h2>

            {rotation.length > 0 ? (
              <>
                <RotationList
                  rotation={rotation}
                  onRemoveFlight={handleRemoveFlight}
                />
                <RotationTimeline rotation={rotation} />
              </>
            ) : (
              <EmptyState message="No flights assigned yet." />
            )}
          </>
        ) : (
          <EmptyState message="Select an aircraft to begin scheduling." />
        )}
      </div>

      <FlightList onAddFlight={handleAddFlight} rotation={rotation || []} />
    </div>
  )
}

export default Home