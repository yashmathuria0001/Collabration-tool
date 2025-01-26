import React from "react";
import DocumentEditor from "./DocumentEditor/DocumentEditor";
import Navbar from "./shared/Navbar";
import Sidebar from "./shared/Sidebar";
import Footer from "../components/shared/Footer";
const Homepage = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar/>

        {/* Main Content */}
        <div className="flex-grow flex flex-col">
          <div className="flex-grow p-4">
            <DocumentEditor />
          </div>
          {/* Footer */}
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Homepage;
