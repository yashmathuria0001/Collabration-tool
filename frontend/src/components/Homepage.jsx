import React from "react";
import DocumentEditor from "./DocumentEditor";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content (Editor on the Right) */}
        <div className="flex-grow p-4">
          <DocumentEditor />
        </div>
      </div>
    </>
  );
};

export default Homepage;
