import { Flight } from "../types/aviationTypes"

export const validateFlightAddition = (
  newFlight: Flight,
  rotation: Flight[]
): string | null => {
  if (rotation.length === 0) {
    // Ensure the first flight starts at the aircraft's base (optional)
    return null
  }

  const lastFlight = rotation[rotation.length - 1]

  // Rule 1: Aircraft cannot teleport (origin must match last destination)
  if (lastFlight.destination !== newFlight.origin) {
    return `Flight origin (${newFlight.origin}) does not match last destination (${lastFlight.destination}). Aircraft cannot teleport.`
  }

  const lastArrival = lastFlight.arrivaltime
  const nextDeparture = newFlight.departuretime

  const turnaroundMinutes = (nextDeparture - lastArrival) / 60

  // Rule 2: Turnaround time must be valid
  if (turnaroundMinutes < 0) {
    return `The chosen flight departs before the previous flight ends. Turnaround time is invalid.`
  }

  if (turnaroundMinutes < 20) {
    return `Minimum turnaround time is 20 minutes. Got ${Math.floor(turnaroundMinutes)} mins.`
  }

  // Rule 3: Aircraft must be on the ground by midnight
  const arrivalDate = new Date(newFlight.arrivaltime * 1000)
  const arrivalHour = arrivalDate.getUTCHours()
  const arrivalMinute = arrivalDate.getUTCMinutes()
  if (arrivalHour >= 24 || (arrivalHour === 0 && arrivalDate.getUTCDate() > 7)) {
    return `All aircraft must be on the ground by midnight. This flight arrives at ${arrivalHour.toString().padStart(2, "0")}:${arrivalMinute.toString().padStart(2, "0")}.`
  }

  return null
}