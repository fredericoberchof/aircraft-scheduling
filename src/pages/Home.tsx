import { useState, useEffect } from "react"
import { Flight } from "../types/aviationTypes"
import { validateFlightAddition } from "../utils/rotationValidation"
import { useSnackbar } from "../hooks/useSnackbar"
import { format } from "date-fns"
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../utils/localStorageUtils"
import AircraftList from "../components/AircraftList"
import FlightList from "../components/FlightList"
import RotationTimeline from "../components/RotationTimeline"
import DateNavigator from "../components/DateNavigator"
import RotationList from "../components/RotationList"
import EmptyState from "../components/EmptyState"
import Header from "../components/Header"
import Footer from "../components/Footer"

function Home() {
  const [selectedAircraftId, setSelectedAircraftId] = useState<string | null>(
    () => getFromLocalStorage<string>("selectedAircraftId") || null
  )
  const { showMessage } = useSnackbar()
  const [date, setDate] = useState(new Date())
  const [rotationsByDate, setRotationsByDate] = useState<
    Record<string, Record<string, Flight[]>>
  >(
    () =>
      getFromLocalStorage<Record<string, Record<string, Flight[]>>>(
        "rotationsByDate"
      ) || {}
  )

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
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="sticky top-0 z-10 shadow bg-white">
        <Header />
      </header>

      <div className="flex flex-1 bg-blue-50 overflow-hidden">
        <AircraftList
          selectedAircraftId={selectedAircraftId}
          onSelect={setSelectedAircraftId}
          getRotation={(aircraftId) =>
            rotationsByDate[dateKey]?.[aircraftId] || []
          }
        />

        <div className={`flex-1 p-6 bg-white shadow-md overflow-y-auto`}>
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

        <div className="max-w-sm border-l overflow-y-auto h-full">
          <FlightList onAddFlight={handleAddFlight} rotation={rotation || []} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home