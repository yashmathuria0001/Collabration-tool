import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const DocumentEditor = () => {
  const quillRef = useRef(null); // Reference to the editor container
  const quillInstance = useRef(null); // Store the Quill instance

  useEffect(() => {
    // Initialize Quill only once
    if (quillRef.current && !quillInstance.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            ["blockquote", "code-block"],
            [{ align: [] }],
            ["link", "image"],
            ["clean"],
          ],
        },
      });
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Text Editor</h1>
      <div
        ref={quillRef}
        className="bg-white border-2 border-gray-300 rounded-md min-h-[300px] p-4"
      ></div>
    </div>
  );
};

export default DocumentEditor;
