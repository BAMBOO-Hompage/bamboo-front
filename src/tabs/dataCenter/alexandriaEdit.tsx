import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetPaperAPI from "../../api/library-posts/getPaperAPI.tsx";
import PutPapersAPI from "../../api/library-posts/putPapersAPI.tsx";

import "../../App.css";

type Paper = {
  libraryPostId: number;
  member: { studentId: string; name: string };
  paperName: string;
  link: string;
  year: string;
  topic: string;
  tagNames: string[];
  content: string;
  fileUrl: string;
  commentCount: number;
};

export default function AlexandriaEdit() {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);

  const [searchParams] = useSearchParams();

  const [paperData, setPaperData] = useState<Paper>({
    libraryPostId: 0,
    paperName: "",
    link: "",
    year: "",
    member: { studentId: "", name: "" },
    topic: "",
    tagNames: [],
    content: "",
    fileUrl: "",
    commentCount: 0,
  });
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);
  const [showNewFiles, setShowNewFiles] = useState<string[]>([]);

  // ✅ 중복 제출 방지
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const docLists = event.target.files; // 선택한 파일들
    if (!docLists || docLists.length === 0) return;

    let fileLists: File[] = [...files];
    let fileNameLists: string[] = [...showNewFiles]; // 기존 저장된 파일명들
    const currentFileCount = showFiles.length + fileLists.length;

    for (let i = 0; i < docLists.length; i++) {
      if (currentFileCount + i >= 1) break; // 최대 1개
      const currentFileName: string = docLists[i].name; // 파일명 가져오기
      fileLists.push(docLists[i]);
      fileNameLists.push(currentFileName);
    }

    setFiles(fileLists);
    setShowNewFiles(fileNameLists); // 파일명 리스트 저장

    // 같은 파일 다시 선택 가능하도록 리셋
    event.target.value = "";
  };

  const handleDeleteFile = (id: number) => {
    setShowFiles([]);
  };
  const handleDeleteNewFile = (id: number) => {
    setFiles(files.filter((_, index) => index !== id));
    setShowNewFiles(showNewFiles.filter((_, index) => index !== id));
  };

  useEffect(() => {
    GetPaperAPI(searchParams.get("id")).then((data) => {
      setPaperData(data);
      setContent(data.content);
      if (data.fileUrl) {
        setShowFiles([data.fileUrl]);
      }
    });
  }, [searchParams]);

  useEffect(() => {
    if (paperData.paperName) {
      setValue("Title", paperData.paperName);
    }
    if (paperData.link) {
      setValue("Link", paperData.link);
    }
    if (paperData.year) {
      setValue("Year", paperData.year);
    }
    if (paperData.topic) {
      setValue("Topic", paperData.topic);
    }
    if (paperData.tagNames) {
      setValue("Tag", paperData.tagNames.map((tag) => `#${tag}`).join(" "));
    }
  }, [paperData, setValue]);

  const onValid = async (e: any) => {
    // ✅ 중복 제출 가드
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      // 링크 유효성 (기존 alert 유지)
      try {
        const url = new URL(e.Link);
        if (!["http:", "https:"].includes(url.protocol)) {
          alert("링크는 http 또는 https로 시작해야 합니다.");
          return;
        }
      } catch (err) {
        alert("유효한 링크 형식이 아닙니다.");
        return;
      }

      // 태그 유효성 (기존 alert 유지)
      let tagList: string[] = [];
      if (e.Tag) {
        const tags = e.Tag.split(/\s+/);
        const allStartWithHash = tags.every((tag: string) =>
          tag.startsWith("#")
        );
        if (!allStartWithHash) {
          alert("모든 태그는 #으로 시작해야 합니다.");
          return;
        }
        const isValid = tags.every((tag: string) => /^#\w+$/.test(tag));
        if (!isValid) {
          alert("태그는 '_'를 제외한 특수문자를 포함할 수 없습니다.");
          return;
        }
        tagList = tags.map((tag: string) => tag.slice(1));
      }

      // 파일 크기 체크 (기존 alert 유지)
      const MAX_FILE_SIZE_MB = 10;
      const oversizedFile = files.find(
        (file) => file.size > MAX_FILE_SIZE_MB * 1024 * 1024
      );
      if (oversizedFile) {
        alert(
          `'${oversizedFile.name}' 파일은 10MB를 초과하여 업로드할 수 없습니다.`
        );
        return;
      }

      const formData = new FormData();
      const jsonData = JSON.stringify({
        link: e.Link,
        year: parseInt(e.Year),
        paperName: e.Title,
        topic: e.Topic,
        content: content,
        tagNames: tagList,
        fileUrl: showFiles.length === 1 ? showFiles[0] : "",
      });

      formData.append(
        "request",
        new Blob([jsonData], { type: "application/json" })
      );
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("file", file);
        });
      }

      await PutPapersAPI(searchParams.get("id"), formData);
    } finally {
      // ✅ 항상 해제 (추가 alert 없음)
      setIsSubmitting(false);
    }
  };

  const onInvalid = (e: unknown) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const autoPattern = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    input.value = inputValue;
  };

  return (
    <div>
      <Nav type="dataCenter" />
      <div id="background" className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ ease: "easeInOut", duration: 1 }}
          style={{ width: "100%", maxHeight: "1250px" }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              margin: "100px auto",
              padding: "0 20px",
              textAlign: "left",
            }}
          >
            <div style={{ marginBottom: "40px", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "Suit-Regular",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                  marginBottom: "8px",
                }}
              >
                알렉산드리아 도서관
              </div>
              <div
                style={{
                  fontFamily: "Suit-Regular",
                  fontSize: "12px",
                  color: "#888",
                }}
              >
                알렉산드리아 도서관은 이집트 알렉산드리아에 있었던 고대에 가장
                크고 영향력 있는 도서관으로,
                <br />
                세상의 모든 지식을 수집한다는 의미를 가지고 있습니다.
              </div>
            </div>

            <div
              style={{
                width: "100%",
                minHeight: "860px",
                backgroundColor: "#171717",
                borderRadius: "20px",
              }}
            >
              <form style={{ margin: "0 20px", paddingTop: "20px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <input
                    id="title"
                    className="title"
                    type="text"
                    defaultValue={paperData.paperName}
                    placeholder="제목을 입력해주세요."
                    autoComplete="off"
                    {...register("Title", { required: "제목을 입력해주세요." })}
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      fontFamily: "Suit-Semibold",
                      fontSize: "28px",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;논문<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="link"
                    type="text"
                    defaultValue={paperData.link}
                    placeholder="논문 링크를 입력해주세요."
                    autoComplete="off"
                    {...register("Link", {
                      required: "논문 링크를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;연도<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="year"
                    type="text"
                    defaultValue={paperData.year}
                    placeholder="논문 작성 연도를 입력해주세요. ex) 2025"
                    autoComplete="off"
                    onKeyUp={() => {
                      autoPattern("year");
                    }}
                    {...register("Year", {
                      required: "논문 작성 연도를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxWidth: "920px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;주제<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="topic"
                    type="text"
                    defaultValue={paperData.topic}
                    placeholder="논문 주제를 입력해주세요."
                    autoComplete="off"
                    {...register("Topic", {
                      required: "논문 주제를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      width: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxWidth: "920px",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;태그
                  </div>
                  <input
                    id="tag"
                    type="text"
                    defaultValue={paperData.tagNames
                      .map((tag) => `#${tag}`)
                      .join(" ")}
                    placeholder="태그를 추가해보세요.  ex) #zero_shot"
                    autoComplete="off"
                    {...register("Tag", {})}
                    style={{
                      flex: "1",
                      width: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Suit-Regular",
                    fontSize: "16px",
                  }}
                >
                  <label
                    htmlFor="fileInput"
                    style={{
                      boxSizing: "border-box",
                      width: "100%",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      border: "none",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      accept=".pdf"
                      {...register("File", {})}
                      onChange={handleAddFiles} // ← input에 연결
                      onClick={(e) => {
                        (e.target as HTMLInputElement).value = "";
                      }}
                    />
                    <img
                      src="../../img/btn/search_enabled.png"
                      alt="search"
                      style={{ width: "25px" }}
                    />
                    &emsp;첨부 파일 선택 (PDF파일 1개)
                  </label>
                  <input type="text" style={{ display: "none" }} />
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  {showFiles.length !== 0 || showNewFiles.length !== 0 ? (
                    <div
                      style={{
                        width: "100%",
                        padding: "20px",
                        marginBottom: "20px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        overflow: "auto",
                      }}
                    >
                      {showFiles.map((file, id) => (
                        <div
                          key={id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            fontFamily: "Suit-Light",
                            fontSize: "16px",
                          }}
                        >
                          <img
                            src="../../img/btn/delete_disabled.png"
                            alt="delete"
                            style={{ width: "20px", cursor: "pointer" }}
                            onClick={() => handleDeleteFile(id)}
                            onMouseEnter={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_enabled.png";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_disabled.png";
                            }}
                          />
                          &emsp;<div>{file}</div>
                        </div>
                      ))}
                      {showNewFiles.map((file, id) => {
                        const sizeMB = (files[id]?.size || 0) / (1024 * 1024);
                        return (
                          <div
                            key={id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              fontFamily: "Suit-Light",
                              fontSize: "16px",
                            }}
                          >
                            <img
                              src="../../img/btn/delete_disabled.png"
                              alt="delete"
                              style={{ width: "20px", cursor: "pointer" }}
                              onClick={() => handleDeleteNewFile(id)}
                              onMouseEnter={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "../../img/btn/delete_enabled.png";
                              }}
                              onMouseLeave={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "../../img/btn/delete_disabled.png";
                              }}
                            />
                            &emsp;
                            <span>{file}</span>
                            &nbsp;
                            <span style={{ color: "#aaa", fontSize: "13px" }}>
                              ({sizeMB.toFixed(2)} MB)
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>

                <div
                  style={{
                    boxSizing: "border-box",
                    width: "100%",
                    minHeight: "500px",
                    marginBottom: "20px",
                    borderRadius: "30px",
                    border: "none",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                    padding: "20px",
                  }}
                >
                  <ReactEditor content={content} setContent={setContent} />
                </div>

                <div
                  style={{
                    maxWidth: "1000px",
                    paddingBottom: "20px",
                    display: "flex",
                    justifyContent: "right",
                    gap: "10px",
                  }}
                >
                  <Button
                    type="destructive"
                    size="small"
                    title="취소"
                    onClick={() => {
                      const deleteAdd =
                        window.confirm("작성을 취소하시겠습니까?");
                      if (deleteAdd) {
                        window.location.href = "/alexandria";
                      }
                    }}
                  />
                  <Button
                    type={isSubmitting ? "disabled" : "primary"} // 중복 제출 방지
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
