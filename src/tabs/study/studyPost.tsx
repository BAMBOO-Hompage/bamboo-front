import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import MobileBlocker from "../../components/mobileBlocker.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetNoticesAPI from "../../api/notices/getNoticesAPI.tsx";

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
    { studentNum: "202010756", name: "김명건" },
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
        "01장 파이썬이란 무엇인가?02장 파이썬 프로그래밍의 기초, 자료형 -1",
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

const maxVisiblePages = 5;

export default function StudyPost() {
  const [expandedSections, setExpandedSections] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("week") || "1", 10);
  const postList = searchParams.get("post") || "Weekly Best";

  const [checkAuth, setCheckAuth] = useState<number>(1);
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

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_ADMIN") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    // GetPaperAPI(searchParams.get("id")).then((data) => {
    //   setPaperData(data);
    // });
  }, [searchParams]);

  useEffect(() => {
    // GetNoticesAPI(postList, currentPage).then((result) => {
    //   console.log(result.content);
    //   var noticeData = result.content;
    //   setPostsToDisplay(noticeData);
    //   setTotalPages(result.totalPages);
    //   console.log(postsToDisplay, totalPages);
    // });
  }, [postList, currentPage]);
  return (
    <div>
      <Nav type="study" />
      <div className="background">
        <MobileBlocker />
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
            height="700px"
            viewBox="0 0 1000 1000"
            preserveAspectRatio="none"
            style={{
              maxWidth: "1000px",
              borderRadius: "20px",
              aspectRatio: "1 / 1",
              overflow: "visible",
            }}
          >
            <defs>
              <filter
                id="blurFilter"
                x="-250%"
                y="-250%"
                width="500%"
                height="500%"
              >
                <feGaussianBlur stdDeviation="90" />
              </filter>
            </defs>
            {[
              { cx: 150, cy: 220, r: 70, fill: "#2CC295" },
              { cx: 150, cy: 720, r: 70, fill: "#2CC295" },
              { cx: 650, cy: 600, r: 70, fill: "#2CC295" },
              { cx: 650, cy: 750, r: 70, fill: "#2CC295" },
              { cx: 650, cy: 900, r: 70, fill: "#2CC295" },
              { cx: 330, cy: 950, r: 70, fill: "#2CC295" },
              { cx: 550, cy: 50, r: 70, fill: "#2CC295" },
              { cx: 440, cy: 280, r: 90, fill: "#297FB8" },
              { cx: 850, cy: 150, r: 70, fill: "#297FB8" },
              { cx: 200, cy: 850, r: 70, fill: "#297FB8" },
              { cx: 300, cy: 550, r: 60, fill: "#297FB8" },
              { cx: 800, cy: 500, r: 100, fill: "#297FB8" },
            ].map((circle, index) => (
              <circle key={index} {...circle} filter="url(#blurFilter)" />
            ))}
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
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
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
                height: "1450px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  maxWidth: "1000px",
                  height: "1300px",
                  margin: "0 auto",
                  marginTop: "20px",
                  display: "flex",
                }}
              >
                <div
                  style={{
                    boxSizing: "border-box",
                    width: "clamp(120px, 20vw, 180px)",
                    height: "100%",
                    borderRight: "1px solid #444",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: "18px",
                    }}
                  >
                    {[
                      "Weekly Best",
                      study_data.studyMaster.name,
                      ...study_data.studyMembers.map(
                        (studyMember) => studyMember.name
                      ),
                    ].map((category) => (
                      <div
                        key={category}
                        className="side_tabs"
                        style={
                          postList === category
                            ? {
                                boxSizing: "border-box",
                                color: "#2CC295",
                                borderRight: "1px solid #2cc295",
                              }
                            : {}
                        }
                        onClick={() => {
                          setSearchParams({
                            post: category,
                            week: "1",
                            size: "8",
                          });
                        }}
                      >
                        {category}
                      </div>
                    ))}
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
                  key={postList}
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: "820px",
                    height: "100%",
                    textAlign: "left",
                    paddingLeft: "clamp(20px, 4vw, 50px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Pretendard-Light",
                      fontSize: "14px",
                      color: "#fff",
                    }}
                  >
                    {subject_data.weeklyContents.map((curriculum) => {
                      return (
                        <div
                          key={curriculum.weeklyContentId}
                          style={{
                            maxWidth: `${
                              820 / subject_data.weeklyContents.length - 10
                            }px`,
                            padding: "5px 15px",
                            backgroundColor:
                              curriculum.week.toString() ===
                              searchParams.get("week")
                                ? "#2cc295"
                                : "rgba(17, 16, 21, 0.5)",
                            borderRadius: "15px",
                            cursor: "pointer",
                          }}
                          onClick={() => {
                            setSearchParams({
                              post: postList,
                              week: curriculum.week.toString(),
                              size: "8",
                            });
                          }}
                        >
                          {curriculum.week}주차
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ margin: "10px 0 100px" }}>
                    {subject_data.weeklyContents.map((curriculum) => {
                      if (
                        curriculum.week.toString() === searchParams.get("week")
                      ) {
                        return (
                          <div
                            key={curriculum.weeklyContentId}
                            style={{
                              maxHeight: "300px",
                              padding: "20px",
                              transition: "max-height 0.5s ease",
                              backgroundColor: "rgba(17, 16, 21, 0.5)",
                              borderRadius: "20px",
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                fontFamily: "Pretendard-SemiBold",
                                fontSize: "clamp(14px, 2vw, 18px)",
                                color: "#2cc295",
                              }}
                            >
                              📖 {curriculum.week}주차 학습내용
                            </div>
                            <div
                              style={{
                                marginTop: "5px",
                                fontFamily: "Pretendard-Light",
                                fontSize: "clamp(14px, 2vw, 18px)",
                                color: "#fff",
                              }}
                            >
                              {curriculum.content}
                            </div>
                          </div>
                        );
                      } else {
                        return <></>;
                      }
                    })}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
