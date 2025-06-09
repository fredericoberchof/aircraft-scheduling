import React, { useState } from "react"
import { Flight } from "../../types/aviationTypes"
import ConfirmationModal from "../common/ConfirmationModal"

interface Props {
  rotation: Flight[]
  onRemoveFlight: (flightIdent: string) => void
}

const RotationList: React.FC<Props> = ({ rotation, onRemoveFlight }) => {
  const [showModal, setShowModal] = useState(false)
  const [flightToRemove, setFlightToRemove] = useState<string | null>(null)

  const handleRemoveClick = (flightIdent: string) => {
    setFlightToRemove(flightIdent)
    setShowModal(true)
  }

  const confirmRemove = () => {
    if (flightToRemove) {
      onRemoveFlight(flightToRemove)
    }
    setShowModal(false)
    setFlightToRemove(null)
  }

  const cancelRemove = () => {
    setShowModal(false)
    setFlightToRemove(null)
  }

  return (
    <>
      <ul className="space-y-4 mb-6">
        {rotation.map((flight) => (
          <li
            key={flight.ident}
            className="border p-4 rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
          >
            <div className="min-w-[120px]">
              <div className="text-left">
                <span className="text-sm font-semibold text-gray-700">
                  Flight:{" "}
                </span>
                <span className="text-sm font-bold text-gray-900">
                  {flight.ident}
                </span>
              </div>
            </div>

            <div className="flex-1 mx-4">
              <div className="flex justify-center items-center space-x-8 mb-1">
                <div className="text-center">
                  <div className="text-base font-medium text-gray-800">
                    {flight.origin}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {flight.readable_departure}
                  </div>
                </div>

                <div className="text-gray-500">→</div>

                <div className="text-center">
                  <div className="text-base font-medium text-gray-800">
                    {flight.destination}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {flight.readable_arrival}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleRemoveClick(flight.ident)}
              className="text-red-600 hover:text-white text-xs border border-red-300 hover:border-red-600 px-3 py-1 rounded hover:bg-red-600 transition-colors duration-200 whitespace-nowrap"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <ConfirmationModal
        title="Confirm Removal"
        message="Are you sure you want to remove this flight from the rotation?"
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        isVisible={showModal}
      />
    </>
  )
}

export default RotationList