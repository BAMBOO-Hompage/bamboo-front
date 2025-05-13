import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import PostPapersAPI from "../../api/library-posts/postPapersAPI.tsx";

import "../../App.css";

export default function AlexandriaAdd() {
  const {
    register,
    getValues,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);

  const handleAddFiles = (event) => {
    const docLists = event.target.files; // 선택한 파일들
    let fileLists: File[] = [...files];
    let fileNameLists: string[] = [...showFiles]; // 기존 저장된 파일명들

    for (let i = 0; i < docLists.length; i++) {
      const currentFileName: string = docLists[i].name; // 파일명 가져오기
      fileLists.push(docLists[i]);
      fileNameLists.push(currentFileName);
    }

    if (fileNameLists.length > 1) {
      fileLists = fileLists.slice(0, 1);
      fileNameLists = fileNameLists.slice(0, 1); // 최대 4개 제한
    }

    setFiles(fileLists);
    setShowFiles(fileNameLists); // 파일명 리스트 저장
  };
  const handleDeleteFile = (id) => {
    setShowFiles(showFiles.filter((_, index) => index !== id));
  };

  const onValid = (e) => {
    console.log(
      e.Title +
        "\n" +
        e.Link +
        "\n" +
        e.Year +
        "\n" +
        e.Topic +
        "\n" +
        e.Tag +
        "\n" +
        content,
      "onValid"
    );
    var tagList = [];
    if (e.Tag) {
      const tags = e.Tag.split(/\s+/);
      const allStartWithHash = tags.every((tag: string) => tag.startsWith("#"));
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
      console.log("유효한 태그 목록:", tagList);
    }

    const formData = new FormData();
    const jsonData = JSON.stringify({
      link: e.Link,
      year: parseInt(e.Year),
      paperName: e.Title,
      topic: e.Topic,
      content: content,
      tagNames: tagList,
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

    PostPapersAPI(formData);
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="dataCenter" />
      <div id="background" className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{
            ease: "easeInOut",
            duration: 1,
          }}
          style={{
            width: "100%",
            maxHeight: "1250px",
          }}
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
            <div
              style={{
                marginBottom: "40px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
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
                  fontFamily: "Pretendard-Regular",
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
              <form
                style={{
                  margin: "0 20px",
                  paddingTop: "20px",
                }}
              >
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
                    placeholder="제목을 입력해주세요."
                    autoComplete="off"
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "100%",
                      height: "40px",
                      backgroundColor: "transparent",
                      borderRadius: "10px",
                      fontFamily: "Pretendard-Bold",
                      fontSize: "28px",
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
                    fontFamily: "Pretendard-Regular",
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
                    placeholder="논문 링크를 입력해주세요."
                    autoComplete="off"
                    {...register("Link", {
                      required: "논문 링크를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
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
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                    gap: "40px",
                  }}
                >
                  <div style={{ width: "100px", color: "#aaa" }}>
                    ·&emsp;연도<span style={{ color: "#FF5005" }}>*</span>
                  </div>
                  <input
                    id="year"
                    type="number"
                    placeholder="논문 작성 연도를 입력해주세요."
                    autoComplete="off"
                    {...register("Year", {
                      required: "논문 작성 연도를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
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
                    fontFamily: "Pretendard-Regular",
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
                    placeholder="논문 주제를 입력해주세요."
                    autoComplete="off"
                    {...register("Topic", {
                      required: "논문 주제를 입력해주세요.",
                    })}
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
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
                    fontFamily: "Pretendard-Regular",
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
                    placeholder="태그를 추가해보세요.  ex) #zero_shot"
                    autoComplete="off"
                    {...register("Tag", {})}
                    style={{
                      flex: "1",
                      minWidth: "150px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
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
                    fontFamily: "Pretendard-Regular",
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
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#2CC295",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                    }}
                    onChange={handleAddFiles}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{
                        display: "none",
                      }}
                      accept=".pdf"
                      {...register("File", {})}
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
                  {showFiles.length !== 0 ? (
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
                            fontFamily: "Pretendard-Light",
                            fontSize: "16px",
                          }}
                        >
                          <img
                            src="../../img/btn/delete_disabled.png"
                            alt="delete"
                            style={{ width: "20px", cursor: "pointer" }}
                            onClick={() => {
                              handleDeleteFile(id);
                            }}
                            onMouseEnter={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_enabled.png";
                            }}
                            onMouseLeave={(e) => {
                              (e.target as HTMLImageElement).src =
                                "../../img/btn/delete_disabled.png";
                            }}
                          />
                          &emsp;{file}
                        </div>
                      ))}
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
                    type="primary"
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
