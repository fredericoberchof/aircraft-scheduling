import { Flight } from "../types/aviationTypes"
import { validateFlightAddition } from "../utils/rotationValidation"

describe("validateFlightAddition", () => {
  const mockFlight = (origin: string, destination: string, departuretime: string, arrivaltime: string): Flight => ({
    ident: "TEST123",
    origin,
    destination,
    departuretime: Math.floor(Date.parse(departuretime) / 1000),
    arrivaltime: Math.floor(Date.parse(arrivaltime) / 1000),
    readable_departure: "",
    readable_arrival: "",
  })

  it("should return null when rotation is empty", () => {
    const newFlight = mockFlight("EGKK", "EGLL", "2025-06-07T10:00:00Z", "2025-06-07T11:00:00Z")
    const rotation: Flight[] = []
    expect(validateFlightAddition(newFlight, rotation)).toBeNull()
  })

  it("should return error when flight origin does not match last destination", () => {
    const lastFlight = mockFlight("EGKK", "EGLL", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("EGKK", "EGLL", "2025-06-07T10:00:00Z", "2025-06-07T11:00:00Z")
    const rotation: Flight[] = [lastFlight]
    expect(validateFlightAddition(newFlight, rotation)).toBe(
      "Flight origin (EGKK) does not match last destination (EGLL). Aircraft cannot teleport."
    )
  })

  it("should return error when turnaround time is less than 20 minutes", () => {
    const lastFlight = mockFlight("EGKK", "EGLL", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("EGLL", "EGKK", "2025-06-07T09:10:00Z", "2025-06-07T10:00:00Z")
    const rotation: Flight[] = [lastFlight]
    expect(validateFlightAddition(newFlight, rotation)).toBe(
      "Minimum turnaround time is 20 minutes. Got 10 mins."
    )
  })

  it("should return null when flight addition is valid", () => {
    const lastFlight = mockFlight("EGKK", "EGLL", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("EGLL", "EGKK", "2025-06-07T09:30:00Z", "2025-06-07T10:30:00Z")
    const rotation: Flight[] = [lastFlight]
    expect(validateFlightAddition(newFlight, rotation)).toBeNull()
  })

  it("should return error when new flight in rotation arrives after midnight", () => {
    const lastFlight = mockFlight("EGKK", "EGLL", "2025-06-07T21:00:00Z", "2025-06-07T22:00:00Z")
    const newFlight = mockFlight("EGLL", "EGKK", "2025-06-07T23:30:00Z", "2025-06-08T00:30:00Z")
    const rotation: Flight[] = [lastFlight]
    expect(validateFlightAddition(newFlight, rotation)).toBe(
      "All aircraft must be on the ground by midnight. This flight arrives at 00:30."
    )
  })

  it("should return error when new flight in rotation arrives after midnight", () => {
    const lastFlight = mockFlight("EGKK", "EGLL", "2025-06-07T22:00:00Z", "2025-06-07T23:00:00Z")
    const newFlight = mockFlight("EGLL", "EGKK", "2025-06-07T23:30:00Z", "2025-06-08T00:30:00Z")
    const rotation: Flight[] = [lastFlight]
    expect(validateFlightAddition(newFlight, rotation)).toBe(
      "All aircraft must be on the ground by midnight. This flight arrives at 00:30."
    )
  })
})