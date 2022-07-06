import React from "react";

import "react-quill/dist/quill.snow.css";
import ReactQuill from 'react-quill'; // ES6

export default function WrappedEditor({ editorRef, ...props }) {
  return <ReactQuill {...props} ref={editorRef} />
}