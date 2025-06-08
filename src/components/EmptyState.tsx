import React from "react"

interface Props {
  message: string
}

const EmptyState: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
      <p className="text-gray-600 text-lg">{message}</p>
    </div>
  )
}

export default EmptyState