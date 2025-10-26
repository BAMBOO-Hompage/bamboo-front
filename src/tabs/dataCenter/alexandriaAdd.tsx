import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import PostPapersAPI from "../../api/library-posts/postPapersAPI.tsx";

import "../../App.css";

type FormValues = {
  Title: string;
  Link: string;
  Year: string;
  Topic: string;
  Tag?: string;
  File?: FileList;
};

export default function AlexandriaAdd() {
  const [isSubmitting, setIsSubmitting] = useState(false); // 중복 방지(UI)
  const submittingRef = useRef(false); // 초고속 더블클릭 하드 가드

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);

  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);

  // 숫자만 허용 (연도)
  const autoPattern = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) return;
    input.value = input.value.replace(/[^0-9]/g, "");
  };

  // 파일 추가 (PDF 1개, 10MB 제한)
  const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const docLists = event.target.files;
    if (!docLists || docLists.length === 0) return;

    const f = docLists[0];

    // MIME/확장자 확인
    const isPdf = f.type === "application/pdf" || /\.pdf$/i.test(f.name);
    if (!isPdf) {
      alert("PDF 파일만 업로드할 수 있습니다.");
      event.target.value = "";
      return;
    }

    // 용량 제한
    const MAX_FILE_SIZE_MB = 10;
    if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert(`'${f.name}' 파일은 10MB를 초과하여 업로드할 수 없습니다.`);
      event.target.value = "";
      return;
    }

    // 단일 파일 유지
    setFiles([f]);
    setShowFiles([f.name]);
  };

  const handleDeleteFile = (id: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== id));
    setShowFiles((prev) => prev.filter((_, index) => index !== id));
  };

  const onValid = async (e: FormValues) => {
    // 하드 가드: 초고속 더블클릭 차단
    if (submittingRef.current) return;
    submittingRef.current = true;

    // UI 가드
    if (isSubmitting) return;
    setIsSubmitting(true);

    // 링크 검증
    try {
      const url = new URL(e.Link);
      if (!["http:", "https:"].includes(url.protocol)) {
        alert("링크는 http 또는 https로 시작해야 합니다.");
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      alert("유효한 링크 형식이 아닙니다.");
      submittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    // 태그 검증
    let tagList: string[] = [];
    if (e.Tag) {
      const tags = e.Tag.trim().split(/\s+/);
      const allStartWithHash = tags.every((tag) => tag.startsWith("#"));
      if (!allStartWithHash) {
        alert("모든 태그는 #으로 시작해야 합니다.");
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
      const isValid = tags.every((tag) => /^#[A-Za-z0-9_]+$/.test(tag));
      if (!isValid) {
        alert("태그는 영숫자 또는 밑줄(_)만 포함할 수 있습니다.");
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
      tagList = tags.map((tag) => tag.slice(1));
    }

    // 연도 검증
    const yearNum = parseInt(e.Year, 10);
    if (Number.isNaN(yearNum) || yearNum < 0) {
      alert("논문 작성 연도를 올바르게 입력해주세요.");
      submittingRef.current = false;
      setIsSubmitting(false);
      return;
    }

    // 파일(있다면) 최종 확인
    if (files.length > 0) {
      const f = files[0];
      const MAX_FILE_SIZE_MB = 10;
      if (f.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        alert(`'${f.name}' 파일은 10MB를 초과하여 업로드할 수 없습니다.`);
        submittingRef.current = false;
        setIsSubmitting(false);
        return;
      }
    }

    // FormData 구성
    const formData = new FormData();
    const jsonData = JSON.stringify({
      link: e.Link,
      year: yearNum,
      paperName: e.Title,
      topic: e.Topic,
      content: content,
      tagNames: tagList,
    });

    formData.append(
      "request",
      new Blob([jsonData], { type: "application/json" })
    );
    if (files.length > 0) {
      formData.append("file", files[0]);
    }

    try {
      // 멱등성 키를 서버가 지원하면 아래처럼 헤더 전달 권장
      // const idemKey = crypto?.randomUUID?.() || String(Date.now());
      // await PostPapersAPI(formData, { headers: { "Idempotency-Key": idemKey } });

      await PostPapersAPI(formData);

      // 성공 시 가드 해제하지 않고 이동 → 중복 저장 방지
      window.location.href = "/alexandria";
    } catch (err) {
      console.error(err);
      alert("오류가 발생했습니다. 다시 시도해주세요.");
      // 실패 시에만 재시도 가능하도록 가드 해제
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const onInvalid = (e: unknown) => {
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
              <form
                onSubmit={handleSubmit(onValid, onInvalid)} // ★ 폼 제출
                style={{ margin: "0 20px", paddingTop: "20px" }}
              >
                {/* 제목 */}
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

                {/* 논문 링크 */}
                <div
                  style={{
                    width: "100%",
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
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                {/* 연도 */}
                <div
                  style={{
                    width: "100%",
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
                    placeholder="논문 작성 연도를 입력해주세요. ex) 2025"
                    autoComplete="off"
                    onKeyUp={() => autoPattern("year")}
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
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                {/* 주제 */}
                <div
                  style={{
                    width: "100%",
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
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                    }}
                  />
                </div>

                {/* 태그 */}
                <div
                  style={{
                    width: "100%",
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
                    ·&emsp;태그
                  </div>
                  <input
                    id="tag"
                    type="text"
                    placeholder="태그를 추가해보세요.  ex) #zero_shot"
                    autoComplete="off"
                    {...register("Tag")}
                    style={{
                      flex: "1",
                      minWidth: "150px",
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

                {/* 파일 선택 */}
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
                      accept="application/pdf,.pdf"
                      {...register("File")}
                      onChange={handleAddFiles} // ★ input에 연결
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

                {/* 파일 리스트 */}
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
                      {showFiles.map((file, id) => {
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
                            &emsp;<span>{file}</span>&nbsp;
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

                {/* 본문 에디터 */}
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

                {/* 액션 버튼 */}
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
                      if (isSubmitting) return;
                      const deleteAdd =
                        window.confirm("작성을 취소하시겠습니까?");
                      if (deleteAdd) {
                        window.location.href = "/alexandria";
                      }
                    }}
                  />
                  <button
                    type="submit" // 네이티브 submit
                    disabled={isSubmitting} // 중복 클릭 방지
                    style={{ all: "unset", display: "inline-block" }}
                  >
                    <Button type="primary" size="small" title="작성 완료" />
                  </button>
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
