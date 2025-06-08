import { Flight } from "../types/flight"

export const SECONDS_IN_DAY = 86400
const TURNAROUND_TIME = 20 * 60

export const calculateUtilization = (rotation: Flight[]) => {
  if (rotation.length === 0) return 0

  const totalFlightTime = rotation.reduce(
    (acc, flight) => acc + (flight.arrivaltime - flight.departuretime),
    0
  )

  const totalTurnaroundTime = Math.max(rotation.length - 1, 0) * TURNAROUND_TIME

  const utilizedTime = totalFlightTime + totalTurnaroundTime
  
  return (utilizedTime / SECONDS_IN_DAY) * 100
}
