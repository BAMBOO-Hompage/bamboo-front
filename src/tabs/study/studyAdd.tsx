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

type weeklyContent = {
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
    useState<weeklyContent>({
      weeklyContentId: 0,
      subjectName: "",
      content: "",
      week: 0,
      startDate: [],
      endDate: [],
    });
  const [content, setContent] = useState<string>("");

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
    console.log(content);
    const studyId = searchParams.get("study");
    if (studyId !== null) {
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
      // if (files && files.length > 0) {
      //   files.forEach((file) => {
      //     formData.append("files", file);
      //   });
      // }

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
