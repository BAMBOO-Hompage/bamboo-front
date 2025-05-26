import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import ReactEditor from "../../components/ReactEditor.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetSubjectAPI from "../../api/subjects/getSubjectAPI.tsx";
import PostInventoriesAPI from "../../api/inventories/postInventoriesAPI.tsx";

import "../../App.css";

type WeeklyContent = {
  weeklyContentId: number;
  subjectName: string;
  content: string;
  week: number;
  startDate: number[];
  endDate: number[];
};

export default function StudyAdd() {
  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedWeeklyContents, setSelectedWeeklyContents] =
    useState<WeeklyContent>({
      weeklyContentId: 0,
      subjectName: "",
      content: "",
      week: 0,
      startDate: [],
      endDate: [],
    });
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
    setFiles(files.filter((_, index) => index !== id));
    setShowFiles(showFiles.filter((_, index) => index !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectResult = await GetSubjectAPI(searchParams.get("subject"));
        if (subjectResult?.weeklyContents) {
          const selectedContent = subjectResult.weeklyContents.find(
            (content) =>
              content.weeklyContentId.toString() === searchParams.get("week")
          );

          setSelectedWeeklyContents(selectedContent || null);
        }
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  const onValid = (e) => {
    const studyId = searchParams.get("study");
    if (studyId) {
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
        studyId: parseInt(studyId),
        title: selectedWeeklyContents.content,
        content: content,
        week: selectedWeeklyContents.week,
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

      PostInventoriesAPI(formData);
    } else {
      console.error("error");
    }
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
                marginBottom: "30px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                  marginBottom: "10px",
                }}
              >
                스터디 정리본
              </div>
              <div
                style={{
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                  color: "#2cc295",
                }}
              >
                {selectedWeeklyContents.content}
              </div>
            </div>

            <div
              style={{
                width: "100%",
                minHeight: "560px",
                borderRadius: "20px",
              }}
            >
              <form>
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
                        marginBottom: "10px",
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
                        window.history.back();
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
