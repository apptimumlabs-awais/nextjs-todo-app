"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ size: [] }],
        [{ font: [] }],
        [{ align: ["right", "center", "justify"] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{
            color: [
                "red", "blue", "yellow", "purple", "green", "white", "black", "transparent",
                "orange", "silver", "darkblue", "fuchsia", "gray", "darkcyan"
            ]
        }],
        [{ background: ["red", "#785412", "silver"] }]
    ]
};

const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font"
];

function TextEditor() {
    const [code, setCode] = useState("");

    const handleProcedureContentChange = (content, delta, source, editor) => {
        setCode(content);
    };

    const copyToClipboard = () => {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                console.log("Text copied to clipboard");
            }).catch(err => {
                console.error("Failed to copy text: ", err);
            });
        } else {
            console.error("Clipboard API not available");
        }
    };

    return (
        <div className="flex flex-col justify-center w-full">
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={code}
                onChange={handleProcedureContentChange}
                className="bg-white"
            />
            <div className="flex mt-14 justify-center">
                <button
                    className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={copyToClipboard}
                >Copy</button>
            </div>
        </div>
    );
}

export default TextEditor;
