import React, { useMemo, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageActions } from "@xeger/quill-image-actions";
import styled from "styled-components";
import ImageAPI from "../api/imageAPI";

Quill.register("modules/imageActions", ImageActions);

const CustomQuillEditorView = styled.div`
  #toolBar {
    box-sizing: border-box;
    min-height: 40px;
    width: 100%;
    padding: 0;
    border: 1px solid #343434;
    border-radius: 20px 20px 0 0;
    color: #fff;
    font-size: 32px;

    .ql-formats {
      display: inline-block;
      position: relative;

      svg {
        width: 18px;
      }

      .image-btn {
        font-size: 14px;
        cursor: pointer;

        .icon-custom {
          margin-right: 3px;
          font-size: 18px;
        }
      }
    }
  }

  #quillContent {
    border: 1px solid #343434;
    border-radius: 0 0 15px 15px;
    background-color: transparent;

    .ql-container {
      box-sizing: border-box;
      height: 420px;
      width: 100%;
      border: none;
      font-family: Paperozi-Light;
      font-size: 16px;

      .ql-editor {
        line-height: 1.4;

        /* --- Editor.module.css 내용 통합 --- */
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin: 16px 0 8px;
        }
        p {
          margin-bottom: 8px;
          line-height: 1.5;
        }
        ol,
        ul {
          margin-bottom: 8px;
          line-height: 1.5;
          padding-left: 20px;
        }
        img {
          max-width: 80%;
        }
        li {
          margin: 8px 0;
          padding-left: 15px !important;
        }
        .ql-indent-1 {
          padding-left: 45px !important;
        }
        .ql-indent-1::before {
          content: "৹  ";
        }
        .ql-indent-2 {
          padding-left: 75px !important;
        }
        .ql-indent-2::before {
          content: "▪  ";
        }
        .ql-indent-3 {
          padding-left: 105px !important;
        }
        .ql-indent-3::before {
          content: "•  ";
        }

        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background: #777;
          border-radius: 15px;
        }
        &::-webkit-scrollbar-track {
          background: rgba(200, 200, 200, 0.1);
        }
      }

      .ql-editor.ql-blank::before {
        color: #777 !important;
      }
    }
  }
`;

function ReactModule() {
  return (
    <>
      <div className="ql-formats">
        <select className="ql-font" defaultValue="sans-serif" />
        <select className="ql-header" defaultValue="7">
          <option value="1">Header 1</option>
          <option value="2">Header 2</option>
          <option value="3">Header 3</option>
          <option value="4">Header 4</option>
          <option value="5">Header 5</option>
          <option value="6">Header 6</option>
          <option value="7">Normal</option>
        </select>
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <select className="ql-align" />
        <select className="ql-color" />
        <select className="ql-background" />
        <button className="ql-list" value="bullet" />
        <button className="ql-list" value="ordered" />
      </div>
      <div className="ql-formats">
        <button className="ql-blockquote" />
        <button className="ql-code-block" />
        <button className="ql-link" />
        <button className="ql-image" />
      </div>
    </>
  );
}

const ReactEditor = ({ content, setContent }) => {
  const quillRef = useRef<ReactQuill | null>(null);
  const [image, setImage] = useState<File | null>(null);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.addEventListener("change", async () => {
      const file = input.files?.[0];
      if (!file) return;
      setImage(file);

      try {
        const formData = new FormData();
        formData.append("image", file);
        const data = await ImageAPI(formData);
        const imageUrl = data.result;

        if (quillRef.current) {
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection();
          if (range) {
            editor.insertEmbed(range.index, "image", imageUrl);
            editor.setSelection({ index: range.index + 1, length: 0 });
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  };

  useEffect(() => {
    if (quillRef.current && content) {
      const editor = quillRef.current.getEditor();
      const regex = /https?:\/\/[^\s]+|(?:www\.)[^\s]+/g;
      const ops = editor.getContents().ops;

      if (ops) {
        ops.forEach((op) => {
          if (typeof op.insert === "string") {
            const matches = op.insert.match(regex);
            if (matches) {
              matches.forEach((match) => {
                const index = editor.getText().indexOf(match);
                editor.formatText(index, match.length, "link", match);
              });
            }
          }
        });
      }
    }
  }, [content]);

  const handleTextChange = (value: string) => {
    if (value !== content) setContent(value);
  };

  const formats = [
    "header",
    "size",
    "font",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "background",
    "align",
    "script",
    "code-block",
    "clean",
    "height",
    "width",
  ];

  const modules = useMemo(
    () => ({
      imageActions: {},
      toolbar: {
        container: "#toolBar",
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  return (
    <CustomQuillEditorView>
      <div id="toolBar">{ReactModule()}</div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        id="quillContent"
        className="editor"
        value={content}
        placeholder="내용을 작성해주세요."
        onChange={handleTextChange}
      />
    </CustomQuillEditorView>
  );
};

export default ReactEditor;
