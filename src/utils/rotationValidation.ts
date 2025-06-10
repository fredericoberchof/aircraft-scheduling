import { Flight } from "../types/aviationTypes"

function isAfterMidnight(departure: number, arrival: number): boolean {
  const depDate = new Date(departure * 1000)
  const arrDate = new Date(arrival * 1000)
  return (
    arrDate.getUTCFullYear() > depDate.getUTCFullYear() ||
    arrDate.getUTCMonth() > depDate.getUTCMonth() ||
    arrDate.getUTCDate() > depDate.getUTCDate() ||
    (arrDate.getUTCHours() === 0 && arrDate.getUTCMinutes() === 0)
  )
}

export const validateFlightAddition = (
  newFlight: Flight,
  rotation: Flight[]
): string | null => {
  if (isAfterMidnight(newFlight.departuretime, newFlight.arrivaltime)) {
    const arrivalDate = new Date(newFlight.arrivaltime * 1000)
    const arrivalHour = arrivalDate.getUTCHours()
    const arrivalMinute = arrivalDate.getUTCMinutes()
    return `All aircraft must be on the ground by midnight. This flight arrives at ${arrivalHour
      .toString()
      .padStart(2, "0")}:${arrivalMinute.toString().padStart(2, "0")}.`
  }

  if (rotation.length === 0) {
    return null
  }

  const lastFlight = rotation[rotation.length - 1]

  if (lastFlight.destination !== newFlight.origin) {
    return `Flight origin (${newFlight.origin}) does not match last destination (${lastFlight.destination}). Aircraft cannot teleport.`
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