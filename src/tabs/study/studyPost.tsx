import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import MobileBlocker from "../../components/mobileBlocker.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetSubjectAPI from "../../api/subjects/getSubjectAPI.tsx";
import GetStudyAPI from "../../api/studies/getStudyAPI.tsx";

import "../../App.css";

type MyDataType = {
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
  profileImageUrl: string;
};
type cohort = {
  cohortId: number;
  batch: number;
  year: number;
  isFirstSemester: boolean;
  status: string;
  subjects: [];
};
type subject = {
  subjectId: number;
  name: string;
  isBook: boolean;
  batch: number;
  bookName: string;
  weeklyContents: [
    {
      weeklyContentId: number;
      subjectName: string;
      content: string;
      week: number;
      startDate: number[];
      endDate: number[];
    }
  ];
};
type study = {
  studyId: number;
  teamName: string;
  subjectName: string;
  cohort: cohort;
  isBook: boolean;
  section: number;
  studyMaster: {
    studentId: string;
    name: string;
  };
  studyMembers: [
    {
      studentId: string;
      name: string;
    }
  ];
  attendances: [
    {
      attendanceId: number;
      week: number;
      memberId: string;
      status: string;
    }
  ];
};

export default function StudyPost() {
  const [expandedSections, setExpandedSections] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const postId = searchParams.get("id") || "";
  const currentPage = parseInt(searchParams.get("week") || "1", 10);
  const postList = searchParams.get("post") || "Weekly Best";

  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [myData, setMyData] = useState<MyDataType>({
    studentId: "",
    email: "",
    name: "",
    major: "",
    phone: "",
    role: "",
    profileImageUrl: "",
  });
  const [postData, setPostData] = useState<study>({
    studyId: 0,
    teamName: "",
    subjectName: "",
    cohort: {
      cohortId: 0,
      batch: 0,
      year: 0,
      isFirstSemester: true,
      status: "",
      subjects: [],
    },
    isBook: true,
    section: 0,
    studyMaster: {
      studentId: "",
      name: "",
    },
    studyMembers: [
      {
        studentId: "",
        name: "",
      },
    ],
    attendances: [
      {
        attendanceId: 0,
        week: 0,
        memberId: "",
        status: "",
      },
    ],
  });
  const [selectedSubject, setSelectedSubject] = useState<subject>({
    subjectId: 0,
    name: "",
    isBook: true,
    batch: 0,
    bookName: "",
    weeklyContents: [
      {
        weeklyContentId: 0,
        subjectName: "",
        content: "",
        week: 0,
        startDate: [],
        endDate: [],
      },
    ],
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
      setMyData(data);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studyResult = await GetStudyAPI(searchParams.get("id"));
        setPostData(studyResult);
        const targetSubject = studyResult.cohort.subjects.find(
          (subject) => subject.name === studyResult.subjectName
        );
        const subjectResult = await GetSubjectAPI(targetSubject.subjectId);
        setSelectedSubject(subjectResult);
        console.log(subjectResult);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // GetNoticesAPI(postList, currentPage).then((result) => {
    //   console.log(result.content);
    //   var noticeData = result.content;
    //   setPostsToDisplay(noticeData);
    //   setTotalPages(result.totalPages);
    //   console.log(postsToDisplay, totalPages);
    // });
  }, [postList, currentPage]);

  // 모바일 제한
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 600);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile)
    return (
      <div>
        <Nav type="study" />
        <MobileBlocker />
      </div>
    );

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
              {postData.subjectName + "_" + postData.section}
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
                {postData.teamName}
              </div>
              <div
                style={{
                  marginBottom: "20px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  color: "#fff",
                }}
              >
                {postData.studyMaster.name}
                {postData.studyMembers
                  .filter(
                    (member) =>
                      member.studentId !== postData.studyMaster.studentId
                  )
                  .map((member, idx) => (
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
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: "#2cc295",
                    marginBottom: "10px",
                  }}
                >
                  #스터디 방식 및 규칙
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(14px, 2vw, 18px)",
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
                    fontSize: "clamp(14px, 2vw, 18px)",
                    color: "#fff",
                    marginBottom: "10px",
                    display: "flex",
                  }}
                >
                  장소:&emsp;<div>G303 / G309 / 스터디룸</div>
                </div>
                <div
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "clamp(14px, 2vw, 18px)",
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
                  fontSize: "clamp(14px, 2vw, 18px)",
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
                {selectedSubject.weeklyContents.map((curriculum) => {
                  return (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${
                          920 / selectedSubject.weeklyContents.length - 10
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
                <div style={{ width: "80px" }}>{postData.studyMaster.name}</div>
                {selectedSubject.weeklyContents.map((curriculum) => {
                  return (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${
                          920 / selectedSubject.weeklyContents.length - 5
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
              {postData.studyMembers
                .filter(
                  (member) =>
                    member.studentId !== postData.studyMaster.studentId
                )
                .map((studyMember) => {
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
                      {selectedSubject.weeklyContents.map((curriculum) => {
                        return (
                          <div
                            key={curriculum.weeklyContentId}
                            style={{
                              width: `${
                                920 / selectedSubject.weeklyContents.length - 5
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
                    <div
                      className="side_tabs"
                      style={
                        postList === "Weekly Best"
                          ? {
                              boxSizing: "border-box",
                              color: "#2CC295",
                              borderRight: "1px solid #2cc295",
                            }
                          : {}
                      }
                      onClick={() => {
                        setSearchParams({
                          id: postId,
                          post: "Weekly Best",
                          week: "1",
                        });
                      }}
                    >
                      Weekly Best
                    </div>
                    <div
                      className="side_tabs"
                      style={
                        postList === postData.studyMaster.studentId
                          ? {
                              boxSizing: "border-box",
                              color: "#2CC295",
                              borderRight: "1px solid #2cc295",
                            }
                          : {}
                      }
                      onClick={() => {
                        setSearchParams({
                          id: postId,
                          post: postData.studyMaster.studentId,
                          week: "1",
                        });
                      }}
                    >
                      {postData.studyMaster.name}
                    </div>
                    {postData.studyMembers
                      .filter(
                        (member) =>
                          member.studentId !== postData.studyMaster.studentId
                      )
                      .map((studyMember) => (
                        <div
                          key={studyMember.studentId}
                          className="side_tabs"
                          style={
                            postList === studyMember.studentId
                              ? {
                                  boxSizing: "border-box",
                                  color: "#2CC295",
                                  borderRight: "1px solid #2cc295",
                                }
                              : {}
                          }
                          onClick={() => {
                            setSearchParams({
                              id: postId,
                              post: studyMember.studentId,
                              week: "1",
                            });
                          }}
                        >
                          {studyMember.name}
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
                    paddingLeft: "clamp(20px, 4vw, 50px)",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Pretendard-Light",
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      color: "#fff",
                    }}
                  >
                    {selectedSubject.weeklyContents.map((curriculum) => {
                      return (
                        <div
                          key={curriculum.weeklyContentId}
                          style={{
                            maxWidth: `${
                              820 / selectedSubject.weeklyContents.length - 10
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
                              id: postId,
                              post: postList,
                              week: curriculum.week.toString(),
                            });
                          }}
                        >
                          {curriculum.week}주차
                        </div>
                      );
                    })}
                  </div>

                  <div style={{ margin: "10px 0 20px" }}>
                    {selectedSubject.weeklyContents.map((curriculum) => {
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
                                display: "flex",
                                justifyContent: "space-between",
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
                              {myData.studentId === postList ? (
                                <img
                                  src="../../img/btn/edit_enabled.png"
                                  alt="edit"
                                  style={{
                                    width: "25px",
                                    cursor: "pointer",
                                    opacity: "0.8",
                                    transition: "all 0.3s ease",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.opacity = "1";
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.opacity = "0.8";
                                  }}
                                  onClick={() => {}}
                                />
                              ) : (
                                <></>
                              )}
                            </div>
                            <div
                              style={{
                                marginTop: "10px",
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

                  <div style={{ margin: "10px 0 20px" }}>
                    {selectedSubject.weeklyContents.map((curriculum) => {
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
                          ></div>
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
