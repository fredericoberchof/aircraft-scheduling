import { Flight } from "../../types/aviationTypes"
import { validateFlightAddition } from "../../utils/rotationValidation"

const mockFlight = (
  origin: string,
  destination: string,
  departure: string,
  arrival: string
): Flight => ({
  ident: "TEST",
  origin,
  destination,
  departuretime: Math.floor(Date.parse(departure) / 1000),
  arrivaltime: Math.floor(Date.parse(arrival) / 1000),
  readable_departure: "",
  readable_arrival: "",
})

describe("validateFlightAddition - business rules", () => {
  // Rule 1: Aircraft must be on the ground by midnight (applies to all flights)
  it("should return error if first flight arrives after midnight", () => {
    const newFlight = mockFlight("AAA", "BBB", "2025-06-07T23:30:00Z", "2025-06-08T00:30:00Z")
    expect(validateFlightAddition(newFlight, [])).toBe(
      "All aircraft must be on the ground by midnight. This flight arrives at 00:30."
    )
  })

  it("should return error if subsequent flight arrives after midnight", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T20:00:00Z", "2025-06-07T21:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T23:30:00Z", "2025-06-08T00:30:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBe(
      "All aircraft must be on the ground by midnight. This flight arrives at 00:30."
    )
  })

  it("should return error if flight arrives exactly at midnight (00:00)", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T21:00:00Z", "2025-06-07T22:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T23:30:00Z", "2025-06-08T00:00:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBe(
      "All aircraft must be on the ground by midnight. This flight arrives at 00:00."
    )
  })

  it("should return null if flight arrives before midnight (e.g., 23:59)", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T21:00:00Z", "2025-06-07T22:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T23:30:00Z", "2025-06-07T23:59:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBeNull()
  })

  // Rule 2: First flight is always valid (assuming it starts at base)
  it("should return null for first flight if it arrives before midnight", () => {
    const newFlight = mockFlight("AAA", "BBB", "2025-06-07T10:00:00Z", "2025-06-07T11:00:00Z")
    expect(validateFlightAddition(newFlight, [])).toBeNull()
  })

  // Rule 3: Aircraft cannot teleport (origin must match last destination)
  it("should return error if new flight origin does not match last destination", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("CCC", "DDD", "2025-06-07T10:00:00Z", "2025-06-07T11:00:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBe(
      "Flight origin (CCC) does not match last destination (BBB). Aircraft cannot teleport."
    )
  })

  // Rule 4: Turnaround time must be valid (minimum 20 minutes)
  it("should return error if turnaround time is negative", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T08:30:00Z", "2025-06-07T09:30:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBe(
      "The chosen flight departs before the previous flight ends. Turnaround time is invalid."
    )
  })

  it("should return error if turnaround time is less than 20 minutes", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T09:10:00Z", "2025-06-07T10:00:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBe(
      "Minimum turnaround time is 20 minutes. Got 10 mins."
    )
  })

  it("should return null if turnaround time is exactly 20 minutes", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T09:20:00Z", "2025-06-07T10:00:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBeNull()
  })

  it("should return null when all rules are satisfied", () => {
    const lastFlight = mockFlight("AAA", "BBB", "2025-06-07T08:00:00Z", "2025-06-07T09:00:00Z")
    const newFlight = mockFlight("BBB", "CCC", "2025-06-07T09:30:00Z", "2025-06-07T10:30:00Z")
    expect(validateFlightAddition(newFlight, [lastFlight])).toBeNull()
  })
})