import { useState } from "react"
import { format } from "date-fns"
import { useRotationStore } from "../hooks/useRotationStore"
import { useRotationActions } from "../hooks/useRotationActions"
import AircraftList from "../components/aircraft/AircraftList"
import FlightList from "../components/flight/FlightList"
import RotationTimeline from "../components/flight/RotationTimeline"
import DateNavigator from "../components/common/DateNavigator"
import RotationList from "../components/flight/RotationList"
import EmptyState from "../components/common/EmptyState"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

function Home() {
  const [date, setDate] = useState(new Date())
  const dateKey = format(date, "yyyy-MM-dd")
  const { handleAddFlight, handleRemoveFlight } = useRotationActions(date)

  const { selectedAircraftId, setSelectedAircraftId, getRotation } =
    useRotationStore()

  const rotation = selectedAircraftId
    ? getRotation(dateKey, selectedAircraftId)
    : []

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
          getRotation={(aircraftId) => getRotation(dateKey, aircraftId)}
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
