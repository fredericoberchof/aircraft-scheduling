import React from "react"

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md py-4 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="inline-block bg-white rounded-full p-2 shadow">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <path
              d="M2 16l20-5-9-4-3-5-2 6-6 2 6 6z"
              fill="#6366f1"
              stroke="#1e293b"
              strokeWidth="1"
            />
          </svg>
        </span>
        <span className="text-white text-xl md:text-2xl font-bold tracking-tight">
          Aircraft Scheduling
        </span>
      </div>
    </header>
  )
}

export default Header
