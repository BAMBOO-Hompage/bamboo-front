import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import StudyCard from "../../components/studyCard.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import "../../App.css";

const study_data = {
  studyId: 1,
  subjectName: "PY",
  cohort: 6,
  isBook: true,
  section: 1,
  teamName: "에그타르트",
  studyMaster: { studentNum: "202010770", name: "맹의현" },
  studyMembers: [
    { studentNum: "202110856", name: "맹현성" },
    { studentNum: "202010766", name: "김재관" },
  ],
};

const subject_data = {
  subjectId: 1,
  name: "PY",
  isBook: true,
  batch: 6,
  weeklyContents: [
    {
      weeklyContentId: 1,
      subjectName: "PY",
      content: "OT(스터디 방식,개발환경 설정)",
      week: 1,
      startDate: [2025, 3, 11],
      endDate: [2025, 3, 11],
    },
    {
      weeklyContentId: 2,
      subjectName: "PY",
      content:
        "01장 파이썬이란 무엇인가?\n02장 파이썬 프로그래밍의 기초, 자료형 -1",
      week: 2,
      startDate: [2025, 3, 18],
      endDate: [2025, 3, 18],
    },
    {
      weeklyContentId: 3,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 3,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 4,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 4,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 5,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 5,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 6,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 6,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 7,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 7,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 8,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 8,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
    {
      weeklyContentId: 9,
      subjectName: "PY",
      content: "02장 파이썬 프로그래밍의 기초, 자료형 - 2",
      week: 9,
      startDate: [2025, 3, 25],
      endDate: [2025, 3, 25],
    },
  ],
};

export default function StudyPost() {
  const [expandedSections, setExpandedSections] = useState(false);

  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <div
          style={{
            boxSizing: "border-box",
            width: "100%",
            padding: "0 20px",
            margin: "0 auto",
            position: "absolute",
            top: "86px",
          }}
        >
          <svg
            width="100%"
            height="1000px"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            style={{
              maxWidth: "1000px",
              borderRadius: "20px",
              aspectRatio: "1 / 1",
            }}
          >
            <defs>
              <filter
                id="blurFilter"
                x="-300%"
                y="-300%"
                width="600%"
                height="600%"
              >
                <feGaussianBlur stdDeviation="110" />
              </filter>
            </defs>
            <circle
              cx="150"
              cy="220"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="150"
              cy="720"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="650"
              cy="600"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="650"
              cy="750"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="650"
              cy="900"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="330"
              cy="950"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />
            <circle
              cx="550"
              cy="50"
              r="70"
              fill="#2CC295"
              filter="url(#blurFilter)"
            />

            <circle
              cx="440"
              cy="280"
              r="90"
              fill="#297FB8"
              filter="url(#blurFilter)"
            />
            <circle
              cx="850"
              cy="150"
              r="70"
              fill="#297FB8"
              filter="url(#blurFilter)"
            />
            <circle
              cx="200"
              cy="850"
              r="70"
              fill="#297FB8"
              filter="url(#blurFilter)"
            />
            <circle
              cx="300"
              cy="550"
              r="60"
              fill="#297FB8"
              filter="url(#blurFilter)"
            />
            <circle
              cx="800"
              cy="500"
              r="100"
              fill="#297FB8"
              filter="url(#blurFilter)"
            />
          </svg>
        </div>

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
          }}
        >
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              minHeight: "1000px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              padding: "0 20px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "50px",
                fontFamily: "Pretendard-Bold",
                fontSize: "30px",
                color: "#2cc295",
                textAlign: "left",
              }}
            >
              {study_data.subjectName + "_" + study_data.section}
            </div>

            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                minHeight: "250px",
                marginBottom: "20px",
                padding: "30px 30px 20px",
                borderRadius: "20px",
                backgroundColor: "rgba(17, 16, 21, 0.5)",
              }}
            >
              <div
                style={{
                  marginBottom: "10px",
                  fontFamily: "Pretendard-SemiBold",
                  fontSize: "30px",
                  color: "#fff",
                }}
              >
                {study_data.teamName}
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                {study_data.studyMaster.name}
                {study_data.studyMembers.map((member, idx) => (
                  <div key={idx} style={{ display: "inline-block" }}>
                    &emsp;{member.name}
                  </div>
                ))}
              </div>
              <div
                style={{
                  maxWidth: "940px",
                  padding: "20px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(17, 16, 21, 0.5)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "#2cc295",
                    marginBottom: "10px",
                  }}
                >
                  #스터디 방식 및 규칙
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "#fff",
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  일시:&emsp;<div>{`매주 목요일`}</div>
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "#fff",
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  장소:&emsp;<div>G303</div>
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(16px, 2vw, 18px)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  내용:&emsp;
                  <div>
                    개별 파트 분배 후 발표 형식의 스터디 진행
                    <br />
                    지각비 5만원, 3회 이상 불참시 퇴출.
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                padding: "20px 30px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                borderBottomLeftRadius: expandedSections ? "0" : "20px",
                borderBottomRightRadius: expandedSections ? "0" : "20px",
                backgroundColor: "rgba(17, 16, 21, 0.5)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setExpandedSections(!expandedSections);
              }}
            >
              <div
                style={{
                  fontFamily: "Pretendard-Light",
                  fontSize: "clamp(16px, 2vw, 18px)",
                  color: "#2cc295",
                }}
              >
                #출석부
              </div>
              <div
                style={{
                  transition: "transform 0.3s ease",
                  transform: expandedSections
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                }}
              >
                <img
                  src="../img/btn/upDown_enabled.png"
                  alt="upDown"
                  style={{ width: "20px", opacity: "0.8" }}
                />
              </div>
            </div>

            <div
              style={{
                maxHeight: expandedSections ? "300px" : "0",
                padding: "0 30px",
                overflow: "hidden",
                transition: "max-height 0.5s ease",
                backgroundColor: "rgba(17, 16, 21, 0.5)",
                borderTopLeftRadius: "0px",
                borderTopRightRadius: "0px",
                borderBottomLeftRadius: "15px",
                borderBottomRightRadius: "15px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Pretendard-Light",
                  fontSize: "14px",
                  color: "#2cc295",
                  gap: "10px",
                }}
              >
                <div style={{ width: "80px" }}>이름</div>
                {subject_data.weeklyContents.map((curriculum) => {
                  return (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${
                          920 / subject_data.weeklyContents.length - 10
                        }px`,
                      }}
                    >
                      {curriculum.week}주차
                    </div>
                  );
                })}
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "space-between",
                  fontFamily: "Pretendard-Light",
                  fontSize: "14px",
                  color: "#fff",
                  gap: "5px",
                }}
              >
                <div style={{ width: "80px" }}>
                  {study_data.studyMaster.name}
                </div>
                {subject_data.weeklyContents.map((curriculum) => {
                  return (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${
                          920 / subject_data.weeklyContents.length - 5
                        }px`,
                      }}
                    >
                      <img
                        src="../img/icon/attendance_disabled.png"
                        alt="attendance"
                        style={{ width: "100%" }}
                      />
                    </div>
                  );
                })}
              </div>
              {study_data.studyMembers.map((studyMember) => {
                return (
                  <div
                    style={{
                      width: "100%",
                      marginBottom: "10px",
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "Pretendard-Light",
                      fontSize: "14px",
                      color: "#fff",
                      gap: "5px",
                    }}
                  >
                    <div style={{ width: "80px" }}>{studyMember.name}</div>
                    {subject_data.weeklyContents.map((curriculum) => {
                      return (
                        <div
                          key={curriculum.weeklyContentId}
                          style={{
                            width: `${
                              920 / subject_data.weeklyContents.length - 5
                            }px`,
                          }}
                        >
                          <img
                            src="../img/icon/attendance_disabled.png"
                            alt="attendance"
                            style={{ width: "100%" }}
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              })}
              <div style={{ height: "20px" }}></div>
            </div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
