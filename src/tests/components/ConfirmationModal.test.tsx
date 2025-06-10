import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import ConfirmationModal from "../../components/common/ConfirmationModal"

describe("ConfirmationModal", () => {
  const defaultProps = {
    title: "Delete Flight",
    message: "Are you sure you want to delete this flight?",
    onConfirm: jest.fn(),
    onCancel: jest.fn(),
    isVisible: true,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders title and message when visible", () => {
    render(<ConfirmationModal {...defaultProps} />)
    expect(screen.getByText("Delete Flight")).toBeInTheDocument()
    expect(screen.getByText("Are you sure you want to delete this flight?")).toBeInTheDocument()
    expect(screen.getByText("Cancel")).toBeInTheDocument()
    expect(screen.getByText("Confirm")).toBeInTheDocument()
  })

  it("does not render content when not visible", () => {
    render(<ConfirmationModal {...defaultProps} isVisible={false} />)
    const overlay = screen.getByText("Delete Flight").closest(".fixed")
    expect(overlay).toHaveClass("opacity-0")
    expect(overlay).toHaveClass("pointer-events-none")
  })

  it("calls onCancel when Cancel button is clicked", () => {
    render(<ConfirmationModal {...defaultProps} />)
    fireEvent.click(screen.getByText("Cancel"))
    expect(defaultProps.onCancel).toHaveBeenCalled()
  })

  it("calls onConfirm when Confirm button is clicked", () => {
    render(<ConfirmationModal {...defaultProps} />)
    fireEvent.click(screen.getByText("Confirm"))
    expect(defaultProps.onConfirm).toHaveBeenCalled()
  })
})