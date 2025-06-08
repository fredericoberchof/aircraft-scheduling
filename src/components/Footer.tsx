import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-4 px-6 shadow-inner mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between text-white text-sm">
        <span>
          &copy; {new Date().getFullYear()} Aircraft Scheduling. All rights reserved.
        </span>
        <span className="mt-2 md:mt-0">
          Made with <span className="text-pink-500">♥</span> by Frederico Berchof
        </span>
      </div>
    </footer>
  )
}

export default Footer