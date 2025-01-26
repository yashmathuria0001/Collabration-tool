import React from "react"
import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col items-start p-4 h-full">
      <ul className="space-y-2 w-full">
        <li>
          <Link to="/dashboard" className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/projects" className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/editor" className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
            Editor
          </Link>
        </li>
        <li>
          <Link to="/settings" className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md">
            Settings
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar

