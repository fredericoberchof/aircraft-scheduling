import { useCallback } from "react"
import { Flight } from "../types/aviationTypes"
import { validateFlightAddition } from "../utils/rotationValidation"
import { calculateUtilization } from "../utils/calculateUtilization"
import { useSnackbar } from "./useSnackbar"
import { useRotationStore } from "./useRotationStore"
import { format } from "date-fns"

export function useRotationActions(date: Date) {
  const { selectedAircraftId, getRotation, updateRotation } =
    useRotationStore()
  const { showMessage } = useSnackbar()
  const dateKey = format(date, "yyyy-MM-dd")
  const rotation = selectedAircraftId
    ? getRotation(dateKey, selectedAircraftId)
    : []

  const handleAddFlight = useCallback(
    (flight: Flight) => {
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
          `Warning: Aircraft has ${idleTime.toFixed(
            1
          )}% idle time. Consider optimizing the schedule.`,
          "info"
        )
      }
    },
    [selectedAircraftId, rotation, updateRotation, dateKey, showMessage]
  )

  const handleRemoveFlight = useCallback(
    (flightIdent: string) => {
      if (!selectedAircraftId) return

      const updatedRotation = rotation.filter((f) => f.ident !== flightIdent)
      updateRotation(dateKey, selectedAircraftId, updatedRotation)
    },
    [selectedAircraftId, rotation, updateRotation, dateKey]
  )

  return { handleAddFlight, handleRemoveFlight }
}
