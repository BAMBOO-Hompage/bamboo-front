// src/pages/study/StudyRecruitmentAdd.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx"; // htmlType="submit" 지원 필요
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import "../../App.css";

type FormValues = {
  Title: string;
  MaxMembers: number | string;
  Deadline: string; // "YYYY-MM-DD"
};

export default function StudyRecruitmentAdd() {
  const { register, handleSubmit, setFocus } = useForm<FormValues>();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "전체";

  const navigate = useNavigate();

  const [content, setContent] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [showFiles, setShowFiles] = useState<string[]>([]);

  useEffect(() => {
    setFocus("Title");
  }, [setFocus]);

  const inputBoxStyle: React.CSSProperties = {
    width: "660px",
    height: "40px",
    padding: "0 20px",
    backgroundColor: "#111015",
    boxShadow: "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
    borderRadius: "20px",
    fontFamily: "Paperozi-Light",
    fontSize: "18px",
    color: "#fff",
  };

  const handleAddFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const docLists = event.target.files;
    if (!docLists) return;

    let fileLists: File[] = [...files];
    let fileNameLists: string[] = [...showFiles];

    for (let i = 0; i < docLists.length; i++) {
      fileLists.push(docLists[i]);
      fileNameLists.push(docLists[i].name);
    }

    // 최대 4개 제한
    if (fileNameLists.length > 4) {
      fileLists = fileLists.slice(0, 4);
      fileNameLists = fileNameLists.slice(0, 4);
    }

    setFiles(fileLists);
    setShowFiles(fileNameLists);
  };

  const handleDeleteFile = (id: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== id));
    setShowFiles((prev) => prev.filter((_, index) => index !== id));
  };

  const parseDeadline = (str: string): number[] => {
    // "2025-08-11" -> [2025, 8, 11]
    const parts = str.split("-").map((d) => Number(d));
    if (parts.length === 3 && parts.every((n) => !Number.isNaN(n))) {
      return parts;
    }
    return [2025, 1, 1];
  };

  const onValid = (data: FormValues) => {
    // 더미 저장 payload
    const payload = {
      id: Date.now(),
      title: data.Title,
      content: content,
      writerName: "작성자1", // 로그인 연동 시 교체
      maxMembers: Number(data.MaxMembers),
      deadline: parseDeadline(data.Deadline),
      createdAt: [2025, 8, 7, 15, 30, 0], // 예시
      // files: files, // 실제 업로드가 필요하면 여기서 서버 업로드 후 URL 보관
    };

    alert("스터디 모집이 작성되었습니다.");

    // 목록으로 이동하며 새 글 전달
    navigate("/studyRecruitment", {
      state: { newStudy: payload },
    });
  };

  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 1 }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              margin: "100px auto",
              display: "flex",
            }}
          >
            {/* 좌측 */}
            <div
              style={{
                width: "180px",
                borderRight: "1px solid #444",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Paperozi-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                스터디 모집
              </div>
              <div style={{ marginTop: "40px", fontSize: "18px" }}>
                <div
                  className="side_tabs"
                  onClick={() => {
                    if (window.confirm("작성취소하시겠습니까?")) {
                      navigate(-1);
                    }
                  }}
                >
                  작성 취소
                </div>
              </div>
            </div>

            {/* 우측 */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
              style={{
                width: "820px",
                paddingLeft: "50px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Paperozi-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                  marginBottom: "40px",
                }}
              >
                스터디 모집 작성
              </div>

              <form onSubmit={handleSubmit(onValid)}>
                {/* 제목 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    alignItems: "center",
                  }}
                >
                  <div>제목</div>
                  <input
                    type="text"
                    placeholder="제목을 입력해주세요."
                    {...register("Title", { required: "제목을 입력해주세요." })}
                    style={inputBoxStyle}
                  />
                </div>

                {/* 최대 인원 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    alignItems: "center",
                  }}
                >
                  <div>최대 인원</div>
                  <input
                    type="number"
                    placeholder="예: 5명"
                    {...register("MaxMembers", {
                      required: "최대 인원을 입력해주세요.",
                      min: { value: 1, message: "1명 이상" },
                    })}
                    style={inputBoxStyle}
                  />
                </div>

                {/* 마감일 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    alignItems: "center",
                  }}
                >
                  <div>마감일</div>
                  <input
                    type="date"
                    {...register("Deadline", {
                      required: "마감일을 선택해주세요.",
                    })}
                    style={{ ...inputBoxStyle, color: "#2CC295" }}
                  />
                </div>

                {/* 파일 첨부 */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "25px",
                    alignItems: "center",
                  }}
                >
                  <div>파일 첨부</div>
                  <label
                    htmlFor="fileInput"
                    style={{
                      ...inputBoxStyle,
                      width: "615px",
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                      color: "#2CC295",
                    }}
                  >
                    <input
                      type="file"
                      id="fileInput"
                      style={{ display: "none" }}
                      multiple
                      onChange={handleAddFiles}
                    />
                    첨부 파일 선택 (최대 4개)
                  </label>
                </div>

                {/* 파일 리스트 */}
                {showFiles.length > 0 && (
                  <div style={{ marginBottom: "20px" }}>
                    {showFiles.map((file, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "16px",
                          marginBottom: "5px",
                        }}
                      >
                        <span>{file}</span>
                        <button
                          type="button"
                          onClick={() => handleDeleteFile(idx)}
                          style={{
                            marginLeft: "10px",
                            background: "none",
                            border: "none",
                            color: "red",
                            cursor: "pointer",
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* 내용 */}
                <div style={{ marginBottom: "20px" }}>
                  <div>내용</div>
                  <div
                    style={{
                      backgroundColor: "#111015",
                      boxShadow:
                        "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                      borderRadius: "20px",
                      padding: "20px",
                      marginTop: "10px",
                      height: "300px",
                    }}
                  >
                    <ReactEditor content={content} setContent={setContent} />
                  </div>
                </div>

                <div style={{ textAlign: "right" }}>
                  {/* Button 컴포넌트가 htmlType을 실제 <button type>으로 전달해야 submit 동작 */}
                  <Button
                    htmlType="submit"
                    variant="primary"
                    size="small"
                    title="작성 완료"
                  />
                  {/* 만약 위 Button이 아직 htmlType 지원 안 하면 아래 네이티브 버튼을 사용하세요:
                  <button type="submit" className="btn primary small">작성 완료</button>
                  */}
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
