import React, { useState } from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
            color: ["red", "blue", "yellow", "perpl"
                , "green", "yellow", "quarter", "white", "black", "transparent", "ital", "orange", "purple", "aqua", "silver", "darkblue", "fuchsia", "gray", "darkcyan", ""
            ]
        }],
        [{ background: ["red", "#785412", "silver"] }]
    ]
};

const formats = [
    "header",
    "bold",
    "emphasis",
    "quotes",
    "italic",
    "resizable",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "video",
    "background",
    "align",
    "size",
    "font"
];

function TextEditor() {

    const [code, setCode] = useState("");
    const handleProcedureContentChange = (content, delta, source, editor) => {
        setCode(content);
        // send the content to parent component
        // callbackCode(content)
        //let has_attribues = delta.ops[1].attributes || "";
        //console.log(has_attribues);
        //const cursorPosition = e.quill.getSelection().index;
        // this.quill.insertText(cursorPosition, "★");
        //this.quill.setSelection(cursorPosition + 1);
    };

    return (
        <div className="flex flex-col justify-center w-full">
            {/* {console.log(code)} */}
            <ReactQuill
                // theme="snow"
                modules={modules}
                formats={formats}
                value={code}
                onChange={handleProcedureContentChange}
                className="bg-white"
            />
            <div className="flex mt-14 justify-center">
                <button
                    className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={() => {
                        // aftr click copy code into clipboard
                        navigator.clipboard.writeText(code)
                    }}
                >Copy</button>
            </div>
        </div>
    );
}

export default TextEditor;

