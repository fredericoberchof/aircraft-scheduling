import { Flight } from "../types/flight"

export const validateFlightAddition = (
  newFlight: Flight,
  rotation: Flight[]
): string | null => {
  if (rotation.length === 0) {
    return null
  }

  const lastFlight = rotation[rotation.length - 1]

  if (lastFlight.destination !== newFlight.origin) {
    return `Flight origin (${newFlight.origin}) does not match last destination (${lastFlight.destination}).`
  }

  const lastArrival = lastFlight.arrivaltime
  const nextDeparture = newFlight.departuretime

  const turnaroundMinutes = (nextDeparture - lastArrival) / 60

  if (turnaroundMinutes < 0) {
    return `The chosen flight departs before the previous flight ends. Turnaround time is invalid.`
  }

  if (turnaroundMinutes < 20) {
    return `Minimum turnaround time is 20 minutes. Got ${Math.floor(turnaroundMinutes)} mins.`
  }

  return null
}