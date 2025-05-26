import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetNoticeAPI from "../../api/notices/getNoticeAPI.tsx";
import PatchNoticesAPI from "../../api/notices/patchNoticesAPI.tsx";

import "../../App.css";

type Post = {
  noticeId: number;
  member: { studentId: string; name: string };
  title: string;
  content: string;
  type: string;
  images: string[];
  files: string[];
  comments: string[];
  createdAt: number[];
  updatedAt: number[];
};

export default function PostEdit() {
  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    setFocus,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [postData, setPostData] = useState<Post>({
    noticeId: 0,
    member: { studentId: "", name: "" },
    title: "",
    content: "",
    type: "",
    images: [],
    files: [],
    comments: [],
    createdAt: [],
    updatedAt: [],
  });
  const [selectedCategory, setSelectedCategory] =
    useState<string>("카테고리 선택");
  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);
  const [showNewFiles, setShowNewFiles] = useState<string[]>([]);

  useEffect(() => {
    GetNoticeAPI(searchParams.get("id")).then((data) => {
      setPostData(data);
      setContent(data.content);
      setShowFiles(data.files || []);
      setSelectedCategory(data.type);
    });
  }, [searchParams]);

  useEffect(() => {
    if (postData.type) {
      setValue("Category", postData.type);
    }
    if (postData.title) {
      setValue("Title", postData.title);
    }
  }, [postData, setValue]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleAddFiles = (event) => {
    const docLists = event.target.files; // 선택한 파일들
    let fileLists: File[] = [...files];
    let fileNameLists: string[] = [...showNewFiles]; // 기존 저장된 파일명들
    const currentImageCount = showFiles.length + fileLists.length;

    for (let i = 0; i < docLists.length; i++) {
      if (currentImageCount + i >= 4) {
        break;
      }
      const currentFileName: string = docLists[i].name; // 파일명 가져오기
      fileLists.push(docLists[i]);
      fileNameLists.push(currentFileName);
    }

    setFiles(fileLists);
    setShowNewFiles(fileNameLists); // 파일명 리스트 저장
  };
  const handleDeleteFile = (id) => {
    setShowFiles(showFiles.filter((_, index) => index !== id));
  };
  const handleDeleteNewFile = (id) => {
    setFiles(files.filter((_, index) => index !== id));
    setShowNewFiles(showNewFiles.filter((_, index) => index !== id));
  };

  const onValid = (e) => {
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
      title: e.Title,
      content: content,
      type: e.Category,
    });
    formData.append(
      "request",
      new Blob([jsonData], { type: "application/json" })
    );
    if (files && files.length > 0) {
      files.forEach((file) => {
        formData.append("newFiles", file);
      });
    }

    PatchNoticesAPI(searchParams.get("id"), showFiles, formData);
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="community" />
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
            height: "1250px",
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              height: "1100px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "180px",
                height: "100%",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                공지 사항
              </div>
              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                <div
                  className="side_tabs"
                  onClick={() => {
                    const deleteAdd =
                      window.confirm("작성을 취소하시겠습니까?");
                    if (deleteAdd) {
                      window.history.back();
                    }
                  }}
                >
                  작성 취소
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                ease: "easeInOut",
                duration: 0.5,
                y: { duration: 0.5 },
              }}
              style={{
                position: "relative",
                width: "820px",
                height: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                공지 작성
              </div>

              <form style={{ width: "100%", marginTop: "40px" }}>
                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>분류</div>
                  <div
                    style={{
                      width: "620px",
                      height: "40px",
                      padding: "0 20px",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <select
                      defaultValue={postData.type}
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "transparent",
                        borderRadius: "20px",
                        border: "none",
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color:
                          selectedCategory === "카테고리 선택"
                            ? "#777"
                            : "#2CC295",
                        cursor: "pointer",
                      }}
                      {...register("Category", {
                        required: "카테고리를 선택해주세요.",
                        validate: (value) =>
                          value !== "전체" || "카테고리를 선택해주세요.",
                        onChange: handleCategoryChange,
                      })}
                    >
                      <option
                        disabled
                        value="전체"
                        style={{ background: "#111015", color: "#ddd" }}
                      >
                        카테고리 선택
                      </option>
                      <option
                        value="대회 및 세미나"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        대회 및 세미나
                      </option>
                      <option
                        value="동아리 공지"
                        style={{
                          background: "#111015",
                          color: "#2CC295",
                          cursor: "pointer",
                        }}
                      >
                        동아리 공지
                      </option>
                    </select>
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "18px",
                  }}
                >
                  <div>제목</div>
                  <input
                    id="title"
                    type="text"
                    defaultValue={postData.title}
                    placeholder="제목을 입력해주세요."
                    {...register("Title", {
                      required: "제목을 입력해주세요.",
                    })}
                    style={{
                      width: "660px",
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
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontFamily: "Pretendard-Regular",
                    fontSize: "16px",
                  }}
                >
                  <div>파일 첨부</div>
                  <label
                    htmlFor="fileInput"
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
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
                      multiple
                      accept=".pdf, .hwp, .pptx, .docx, .doc, .xlsx, .txt"
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
                    &emsp;첨부 파일 선택 (최대 4개)
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
                        width: "620px",
                        height: "110px",
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
                            fontSize: "14px",
                            marginBottom: "10px",
                          }}
                        >
                          <img
                            src="../../img/btn/delete_disabled.png"
                            alt="delete"
                            style={{ width: "16px", cursor: "pointer" }}
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
                              fontFamily: "Pretendard-Light",
                              fontSize: "16px",
                              marginBottom: "10px",
                            }}
                          >
                            <img
                              src="../../img/btn/delete_disabled.png"
                              alt="delete"
                              style={{ width: "20px", cursor: "pointer" }}
                              onClick={() => {
                                handleDeleteNewFile(id);
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
                    width: "100%",
                    marginBottom: "20px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                  }}
                >
                  <div>내용</div>
                  <div
                    style={{
                      boxSizing: "border-box",
                      width: "660px",
                      height: "500px",
                      borderRadius: "20px",
                      border: "none",
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      padding: "20px",
                    }}
                  >
                    <ReactEditor content={content} setContent={setContent} />
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "right",
                  }}
                >
                  <Button
                    type="primary"
                    size="small"
                    title="작성 완료"
                    onClick={handleSubmit(onValid, onInvalid)}
                  />
                </div>
              </form>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
