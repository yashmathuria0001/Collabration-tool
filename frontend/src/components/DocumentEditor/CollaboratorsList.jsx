import React from "react"

const CollaboratorsList = ({ collaborators }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Collaborators</h2>
      <ul className="space-y-2">
        {collaborators.map((collaborator, index) => (
          <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
            <span>{collaborator.email}</span>
            <span className="text-sm text-gray-500 capitalize">{collaborator.role}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CollaboratorsList

