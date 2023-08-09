import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css"; // Import the styles

export default function TextEditor({ value, onChange }: any) {
  return (
    <div>
      <ReactQuill value={value} onChange={onChange} theme="snow" />
    </div>
  );
}
