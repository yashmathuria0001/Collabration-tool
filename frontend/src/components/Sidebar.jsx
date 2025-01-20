import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/4 bg-gray-800 text-white flex flex-col items-start p-4">
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      <ul className="space-y-2 w-full">
        <li>
          <a
            href="#dashboard"
            className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
          >
            Dashboard
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#settings"
            className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
          >
            Settings
          </a>
        </li>
        <li>
          <a
            href="#help"
            className="block w-full px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-md"
          >
            Help
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
