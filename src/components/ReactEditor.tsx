import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import styled from "styled-components";

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
        {/* <select className="ql-size" defaultValue="medium">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
          <option value="huge">Huge</option>
        </select> */}
        <button className="ql-bold" />
        <button className="ql-italic" />
        <button className="ql-underline" />
        <button className="ql-strike" />
        <select className="ql-color" />
        <select className="ql-background" />
        <select className="ql-align" />
        <button className="ql-list" value="ordered" />
        <button className="ql-list" value="bullet" />
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

const CustomQuillEditorView = styled.div`
  #toolBar {
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    border: 1px solid #343434;
    border-radius: 20px 20px 0 0;
    color: #fff;
    font-size: 32px;

    .ql-formats {
      display: inline-block;
      position: relative;
      top: -10px;

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

      .ql-editor {
        p {
          font-size: 14px;
        }
        ul,
        ol {
          padding-left: 0;
          margin-left: 0;
        }
        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-thumb {
          background: #777; /* 스크롤바의 색상 */
          border-radius: 15px;
        }
        &::-webkit-scrollbar-track {
          background: rgba(200, 200, 200, 0.1);
        }
      }
    }
  }
`;

const ReactEditor = ({ content, setContent }) => {
  const formats: string[] = [
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
  ];
  const modules: {} = useMemo(
    () => ({
      toolbar: {
        container: "#toolBar",
      },
    }),
    []
  );

  return (
    <CustomQuillEditorView>
      <div id="toolBar">{ReactModule()}</div>
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        id="quillContent"
        value={content}
        placeholder="글을 작성해주세요."
        onChange={setContent}
      />
    </CustomQuillEditorView>
  );
};

export default ReactEditor;
