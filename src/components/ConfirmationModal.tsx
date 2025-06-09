import React from "react"

interface Props {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  isVisible: boolean
}

const ConfirmationModal: React.FC<Props> = ({
  title,
  message,
  onConfirm,
  onCancel,
  isVisible,
}) => {
  return (
    <div
      className={`
        fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300 ease-in-out
        ${isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      <div
        className={`
          bg-white p-6 rounded-lg shadow-xl w-80 max-w-[95vw]
          transition-all duration-300 ease-out
          ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
        `}
      >
        <h3 className="text-lg font-semibold mb-4 text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm
              transition-colors duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm
              transition-colors duration-200 ease-in-out"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal
