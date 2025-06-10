
/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react"
import { useRotationActions } from "../../hooks/useRotationActions"
import * as rotationStore from "../../hooks/useRotationStore"
import * as snackbar from "../../hooks/useSnackbar"
import * as validation from "../../utils/rotationValidation"
import * as utilization from "../../utils/calculateUtilization"
import { Flight } from "../../types/aviationTypes"

const mockShowMessage = jest.fn()
jest.spyOn(snackbar, "useSnackbar").mockReturnValue({ showMessage: mockShowMessage })

const mockUpdateRotation = jest.fn()
const mockGetRotation = jest.fn()
jest.spyOn(rotationStore, "useRotationStore").mockReturnValue({
  selectedAircraftId: "A1",
  getRotation: mockGetRotation,
  updateRotation: mockUpdateRotation,
})

const mockFlight: Flight = {
  ident: "F1",
  origin: "AAA",
  destination: "BBB",
  departuretime: 1000,
  arrivaltime: 2000,
  readable_departure: "",
  readable_arrival: "",
}

describe("useRotationActions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockGetRotation.mockReturnValue([])
    jest.spyOn(utilization, "calculateUtilization").mockReturnValue(40)
  })

  it("should add a flight when valid", () => {
    jest.spyOn(validation, "validateFlightAddition").mockReturnValue(null)
    const { result } = renderHook(() => useRotationActions(new Date("2025-06-07T12:00:00Z")))

    act(() => {
      result.current.handleAddFlight(mockFlight)
    })

    expect(mockUpdateRotation).toHaveBeenCalledWith(
      "2025-06-07",
      "A1",
      [mockFlight]
    )
    expect(mockShowMessage).toHaveBeenCalledWith(
      "Warning: Aircraft has 60.0% idle time. Consider optimizing the schedule.",
      "info"
    )
  })

  it("should show warning if validation fails", () => {
    jest.spyOn(validation, "validateFlightAddition").mockReturnValue("Some error")
    const { result } = renderHook(() => useRotationActions(new Date("2025-06-07T00:00:00Z")))

    act(() => {
      result.current.handleAddFlight(mockFlight)
    })

    expect(mockShowMessage).toHaveBeenCalledWith("Some error", "warning")
    expect(mockUpdateRotation).not.toHaveBeenCalled()
  })

  it("should not add flight if no aircraft is selected", () => {
    jest.spyOn(rotationStore, "useRotationStore").mockReturnValue({
      selectedAircraftId: null,
      getRotation: mockGetRotation,
      updateRotation: mockUpdateRotation,
    } as any)
    jest.spyOn(validation, "validateFlightAddition").mockReturnValue(null)
    const { result } = renderHook(() => useRotationActions(new Date("2025-06-07T00:00:00Z")))

    act(() => {
      result.current.handleAddFlight(mockFlight)
    })

    expect(mockUpdateRotation).not.toHaveBeenCalled()
    expect(mockShowMessage).not.toHaveBeenCalled()
  })

it("should remove a flight", () => {
  mockGetRotation.mockReturnValue([mockFlight])
  jest.spyOn(rotationStore, "useRotationStore").mockReturnValue({
    selectedAircraftId: "A1",
    getRotation: mockGetRotation,
    updateRotation: mockUpdateRotation,
  } as any)
  const { result } = renderHook(() => useRotationActions(new Date("2025-06-07T12:00:00Z")))

  act(() => {
    result.current.handleRemoveFlight("F1")
  })

  expect(mockUpdateRotation).toHaveBeenCalledWith(
    "2025-06-07",
    "A1",
    []
  )
})

  it("should not remove flight if no aircraft is selected", () => {
    jest.spyOn(rotationStore, "useRotationStore").mockReturnValue({
      selectedAircraftId: null,
      getRotation: mockGetRotation,
      updateRotation: mockUpdateRotation,
    } as any)
    const { result } = renderHook(() => useRotationActions(new Date("2025-06-07T00:00:00Z")))

    act(() => {
      result.current.handleRemoveFlight("F1")
    })

    expect(mockUpdateRotation).not.toHaveBeenCalled()
  })
})