import { useState } from "react"
import { Flight } from "../types/aviationTypes"
import { validateFlightAddition } from "../utils/rotationValidation"
import { useSnackbar } from "../hooks/useSnackbar"
import { format } from "date-fns"
import { calculateUtilization } from "../utils/calculateUtilization"
import { useRotationStore } from "../hooks/useRotationStore"
import AircraftList from "../components/aircraft/AircraftList"
import FlightList from "../components/flight/FlightList"
import RotationTimeline from "../components/flight/RotationTimeline"
import DateNavigator from "../components/common/DateNavigator"
import RotationList from "../components/flight/RotationList"
import EmptyState from "../components/common/EmptyState"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

function Home() {
    const {
      selectedAircraftId,
      setSelectedAircraftId,
      getRotation,
      updateRotation,
    } = useRotationStore()
    const { showMessage } = useSnackbar()
    const [date, setDate] = useState(new Date())

  const dateKey = format(date, "yyyy-MM-dd")
  const rotation = selectedAircraftId
    ? getRotation(dateKey, selectedAircraftId)
    : []

  const handleAddFlight = (flight: Flight) => {
    if (!selectedAircraftId) return

    const error = validateFlightAddition(flight, rotation)
    if (error) {
      showMessage(error, "warning")
      return
    }

    const updatedRotation = [...rotation, flight]
    updateRotation(dateKey, selectedAircraftId, updatedRotation)

    const utilization = calculateUtilization(updatedRotation)
    const idleTime = 100 - utilization
    if (idleTime > 50) {
      showMessage(
        `Warning: Aircraft has ${idleTime.toFixed(1)}% idle time. Consider optimizing the schedule.`,
        "info"
      )
    }
  }

  const handleRemoveFlight = (flightIdent: string) => {
    if (!selectedAircraftId) return

    const updatedRotation = rotation.filter((f) => f.ident !== flightIdent)
    updateRotation(dateKey, selectedAircraftId, updatedRotation)
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
            getRotation(dateKey, aircraftId)
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