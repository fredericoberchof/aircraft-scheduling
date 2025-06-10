import { act } from "@testing-library/react"
import { Flight } from "../../types/aviationTypes"
import { useRotationStore } from "../../hooks/useRotationStore"

describe("useRotationStore", () => {
  beforeEach(() => {
    act(() => {
      useRotationStore.setState({
        selectedAircraftId: null,
        rotationsByDate: {},
      })
    })
  })

  it("should set and get the selected aircraft ID", () => {
    act(() => {
      useRotationStore.getState().setSelectedAircraftId("A1")
    })

    const selectedAircraftId = useRotationStore.getState().selectedAircraftId
    expect(selectedAircraftId).toBe("A1")
  })

  it("should set and get rotations by date", () => {
    const rotations: Record<string, Record<string, Flight[]>> = {
      "2025-06-10": {
        A1: [
          { ident: "F1", origin: "AAA", destination: "BBB", departuretime: 1000, arrivaltime: 2000, readable_departure: "10:00", readable_arrival: "20:00" },
        ],
      },
    }

    act(() => {
      useRotationStore.getState().setRotationsByDate(rotations)
    })

    const rotationsByDate = useRotationStore.getState().rotationsByDate
    expect(rotationsByDate).toEqual(rotations)
  })

  it("should get rotation for a specific date and aircraft ID", () => {
    const rotations: Record<string, Record<string, Flight[]>> = {
      "2025-06-10": {
        A1: [
          { ident: "F1", origin: "AAA", destination: "BBB", departuretime: 1000, arrivaltime: 2000, readable_departure: "10:00", readable_arrival: "20:00" },
        ],
      },
    }

    act(() => {
      useRotationStore.getState().setRotationsByDate(rotations)
    })

    const rotation = useRotationStore.getState().getRotation("2025-06-10", "A1")
    expect(rotation).toEqual(rotations["2025-06-10"]["A1"])
  })

  it("should return an empty array if no rotation exists for the given date and aircraft ID", () => {
    const rotation = useRotationStore.getState().getRotation("2025-06-10", "A1")
    expect(rotation).toEqual([])
  })

  it("should update rotation for a specific date and aircraft ID", () => {
    const initialRotations: Record<string, Record<string, Flight[]>> = {
      "2025-06-10": {
        A1: [
          { ident: "F1", origin: "AAA", destination: "BBB", departuretime: 1000, arrivaltime: 2000, readable_departure: "10:00", readable_arrival: "20:00" },
        ],
      },
    }

    const updatedRotation: Flight[] = [
      { ident: "F2", origin: "CCC", destination: "DDD", departuretime: 1200, arrivaltime: 2200, readable_departure: "12:00", readable_arrival: "22:00" },
    ]

    act(() => {
      useRotationStore.getState().setRotationsByDate(initialRotations)
      useRotationStore.getState().updateRotation("2025-06-10", "A1", updatedRotation)
    })

    const rotation = useRotationStore.getState().getRotation("2025-06-10", "A1")
    expect(rotation).toEqual(updatedRotation)
  })
})