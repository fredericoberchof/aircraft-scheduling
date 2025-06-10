import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Flight } from "../../types/aviationTypes"
import * as utilization from "../../utils/calculateUtilization"
import UtilizationBar from "../../components/aircraft/UtilizationBar"

jest.mock("../../utils/calculateUtilization")

const mockCalculateUtilization = utilization.calculateUtilization as jest.Mock

describe("UtilizationBar", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the utilization percentage and bar width", () => {
    mockCalculateUtilization.mockReturnValue(42.5)
    const rotation: Flight[] = [
      {
        ident: "F1",
        origin: "AAA",
        destination: "BBB",
        departuretime: 1000,
        arrivaltime: 2000,
        readable_departure: "",
        readable_arrival: "",
      },
    ]
  
    render(<UtilizationBar rotation={rotation} />)
  
    expect(screen.getByText("42.5%")).toBeInTheDocument()
  
    const bar = screen.getByTestId("utilization-bar")
    expect(bar).toHaveStyle("width: 42.5%")
  })

  it("renders 0% when rotation is empty", () => {
    mockCalculateUtilization.mockReturnValue(0)
    render(<UtilizationBar rotation={[]} />)
    expect(screen.getByText("0.0%")).toBeInTheDocument()
  })
})
