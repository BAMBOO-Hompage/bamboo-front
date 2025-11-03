import React, { useMemo, useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ImageActions } from "@xeger/quill-image-actions";
import styled from "styled-components";
import ImageAPI from "../api/imageAPI";

/* ✅ iframe src 및 blob URL sanitize 허용 */
const sanitize = Quill.import("formats/link").sanitize;
const Link = Quill.import("formats/link");

Link.sanitize = function (url: string) {
  if (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("data:") ||
    url.startsWith("blob:")
  ) {
    return url;
  }
  return sanitize(url);
};

/* ✅ clipboard 확장: iframe 붙여넣기 허용 */
const Clipboard = Quill.import("modules/clipboard");
const Delta = Quill.import("delta");

class IframeClipboard extends Clipboard {
  onPaste(e: any) {
    e.preventDefault();
    const range = this.quill.getSelection();
    const text = e.clipboardData.getData("text/plain");
    const html = e.clipboardData.getData("text/html");

    if (html && html.includes("<iframe")) {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = html;
      const iframes = tempDiv.getElementsByTagName("iframe");

      Array.from(iframes).forEach((iframe) => {
        const src = iframe.getAttribute("src");
        if (src) {
          this.quill.insertEmbed(range.index, "iframe", src, "user");
        }
      });
    } else {
      const delta = new Delta().insert(text);
      this.quill.updateContents(delta, "user");
    }

    this.quill.root.dispatchEvent(new Event("input", { bubbles: true }));
  }
}
Quill.register("modules/clipboard", IframeClipboard, true);

/* ✅ iframe 블롯 정의 */
const BlockEmbed = Quill.import("blots/block/embed");

class IframeBlot extends BlockEmbed {
  static create(value: string) {
    const node = super.create();
    node.setAttribute("src", value);
    node.setAttribute("frameborder", "0");
    node.setAttribute("allowfullscreen", "true");
    node.setAttribute("width", "100%");
    node.setAttribute("height", "500");
    node.setAttribute("style", "display:block; border:none;");
    return node;
  }
  static value(node: HTMLElement) {
    return node.getAttribute("src");
  }
}

IframeBlot.blotName = "iframe";
IframeBlot.tagName = "iframe";

Quill.register(IframeBlot);
Quill.register("modules/imageActions", ImageActions);

/* ---------------------- 스타일 ---------------------- */
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
      font-family: Suit-Light;
      font-size: 16px;

      .ql-editor {
        line-height: 1.4;

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

        iframe {
          width: 100%;
          height: auto;
          min-height: 300px;
          display: block;
          border: none;
          background: transparent;
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

/* ---------------------- 툴바 ---------------------- */
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

/* ---------------------- 에디터 본체 ---------------------- */
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
      const notionMatch = content.match(/https:\/\/[^\s"]+/);
      console.log("🔍 Content:", content);
      console.log("🔗 Notion match:", notionMatch);

      if (notionMatch) {
        const range = editor.getSelection();
        console.log("🧩 Inserting iframe...");
        editor.insertEmbed(
          range ? range.index : editor.getLength() - 1,
          "iframe",
          notionMatch[0]
        );
        console.log("✅ iframe insert attempted:", notionMatch[0]);
      }
    }
  }, [content]);

  const handleTextChange = (value: string) => {
    console.log("📦 content:", value);
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
  ];

  const modules = useMemo(
    () => ({
      imageActions: {},
      toolbar: {
        container: "#toolBar",
        handlers: { image: imageHandler },
      },
      clipboard: { matchVisual: false },
    }),
    []
  );

  // ✅ Quill 인스턴스 직접 iframe 허용 설정
  useEffect(() => {
    if (!quillRef.current || !content) return;
    const editor = quillRef.current.getEditor();
    const notionMatch = content.match(/https:\/\/[^\s"]+/);
    console.log("🔍 Content:", content);
    console.log("🔗 Notion match:", notionMatch);

    if (notionMatch) {
      // 💡 0ms 지연으로 렌더 후 실행 (DOM 반영 이후)
      setTimeout(() => {
        const range = editor.getSelection();
        console.log("🧩 Inserting iframe...");
        editor.insertEmbed(
          range ? range.index : editor.getLength() - 1,
          "iframe",
          notionMatch[0]
        );
        console.log("✅ iframe insert attempted:", notionMatch[0]);
      }, 0);
    }
  }, [content]);

  return (
    <CustomQuillEditorView>
      <div id="toolBar">{ReactModule()}</div>

      {/* @ts-ignore */}
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
        dangerouslyPasteHTML={true} // ✅ iframe이 제거되지 않게
      />
    </CustomQuillEditorView>
  );
};

export default ReactEditor;
