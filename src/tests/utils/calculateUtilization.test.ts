import { Flight } from "../../types/aviationTypes"
import { calculateUtilization, SECONDS_IN_DAY } from "../../utils/calculateUtilization"

describe("calculateUtilization", () => {
  it("should return 0 for an empty rotation", () => {
    expect(calculateUtilization([])).toBe(0)
  })

  it("should calculate utilization for a single flight", () => {
    const flights: Flight[] = [
      {
        ident: "AB123",
        departuretime: 0,
        arrivaltime: 3600,
        origin: "AAA",
        destination: "BBB",
        readable_departure: "00:00",
        readable_arrival: "01:00"
      }
    ]

    const expectedUtilization = (3600 / SECONDS_IN_DAY) * 100
    expect(calculateUtilization(flights)).toBeCloseTo(expectedUtilization, 2)
  })

  it("should include turnaround time between flights", () => {
    const flights: Flight[] = [
      {
        ident: "AB123",
        departuretime: 0,
        arrivaltime: 3600,
        origin: "AAA",
        destination: "BBB",
        readable_departure: "00:00",
        readable_arrival: "01:00"
      },
      {
        ident: "CD456",
        departuretime: 4800,
        arrivaltime: 7200,
        origin: "BBB",
        destination: "CCC",
        readable_departure: "01:20",
        readable_arrival: "02:00"
      },
    ]

    const flightTime = (3600 - 0) + (7200 - 4800)
    const turnaround = 1200
    const expectedUtilization = ((flightTime + turnaround) / SECONDS_IN_DAY) * 100

    expect(calculateUtilization(flights)).toBeCloseTo(expectedUtilization, 2)
  })
})
