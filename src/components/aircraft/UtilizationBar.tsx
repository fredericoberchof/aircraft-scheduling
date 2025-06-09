import React from "react"
import { Flight } from "../../types/aviationTypes"
import { calculateUtilization } from "../../utils/calculateUtilization"

interface UtilizationBarProps {
  rotation: Flight[]
}

const UtilizationBar: React.FC<UtilizationBarProps> = ({ rotation }) => {
  const utilization = calculateUtilization(rotation)

  return (
    <div className="relative mt-4 w-full h-6 bg-gray-300 rounded-lg">
      <div
        className="absolute top-0 left-0 h-full bg-blue-600 rounded-lg shadow-md transition-all duration-500"
        style={{ width: `${utilization}%` }}
      />

      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
        {utilization.toFixed(1)}%
      </div>
    </div>
  )
}

export default UtilizationBar
