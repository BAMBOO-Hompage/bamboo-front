import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
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

const itemsPerPage = 8;

export default function StudyPost() {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const postId = searchParams.get("id") || "";
  const currentPage = parseInt(searchParams.get("week") || "1", 10);
  const postList = searchParams.get("member") || "Weekly Best";

  const [expandedSections, setExpandedSections] = useState(false);
  const [isAttendancePopupOpen, setIsAttendancePopupOpen] =
    useState<boolean>(false);
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
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
  const [displayWeeks, setDisplayWeeks] = useState([0, itemsPerPage]);
  const [indexStart, setIndexStart] = useState(0);
  const [emptySlots, setEmptySlots] = useState(0);

  const totalWeeks = selectedSubject.weeklyContents.length;

  const handlePrev1 = () => {
    if (displayWeeks[0] === 0) {
      alert("첫 번째 페이지입니다.");
      return;
    }
    setDisplayWeeks([
      displayWeeks[0] - itemsPerPage,
      displayWeeks[1] - itemsPerPage,
    ]);
  };

  const handleNext1 = () => {
    if (displayWeeks[1] >= totalWeeks) {
      alert("마지막 페이지입니다.");
      return;
    }
    setDisplayWeeks([
      displayWeeks[0] + itemsPerPage,
      displayWeeks[1] + itemsPerPage,
    ]);
  };
  const handlePrev2 = () => {
    if (indexStart === 0) {
      alert("첫 페이지입니다.");
      return;
    }
    setIndexStart((prev) => Math.max(prev - itemsPerPage, 0));
  };
  const handleNext2 = () => {
    if (indexStart + itemsPerPage >= totalWeeks) {
      alert("마지막 페이지입니다.");
      return;
    }
    setIndexStart((prev) => prev + itemsPerPage);
  };

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
        const remainder = subjectResult.weeklyContents.length % itemsPerPage;
        setEmptySlots(remainder === 0 ? 0 : itemsPerPage - remainder);
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

  const onValid = async (e) => {};

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const handleCheckboxChange = (studentId: string) => {
    setCheckedMembers((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const getCurrentWeek = (selectedSubject) => {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );

    const currentWeek = selectedSubject.weeklyContents.find(
      ({ startDate, endDate }) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        return today >= start && today <= end;
      }
    );

    return currentWeek ? currentWeek : null;
  };

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
                x="-200%"
                y="-200%"
                width="400%"
                height="400%"
              >
                <feGaussianBlur stdDeviation="80" />
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
                  gap: "5px",
                }}
              >
                <div style={{ width: "80px" }}>이름</div>
                <button
                  onClick={handlePrev1}
                  style={{
                    width: "20px",
                    height: "15px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: displayWeeks[0] === 0 ? 0.3 : 1,
                  }}
                >
                  <img
                    src="../img/btn/pagePrev.png"
                    alt="pageNext"
                    style={{
                      height: "15px",
                    }}
                  />
                </button>
                {selectedSubject.weeklyContents
                  .slice(displayWeeks[0], displayWeeks[1])
                  .map((curriculum) => (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${770 / 8}px`,
                      }}
                    >
                      {curriculum.week}주차
                    </div>
                  ))}
                {displayWeeks[1] >= totalWeeks ? (
                  Array(emptySlots)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        style={{
                          width: `${770 / 8}px`,
                        }}
                      >
                        &emsp;&emsp;
                      </div>
                    ))
                ) : (
                  <></>
                )}
                <button
                  onClick={handleNext1}
                  style={{
                    width: "20px",
                    height: "15px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    opacity: displayWeeks[1] >= totalWeeks ? 0.3 : 1,
                  }}
                >
                  <img
                    src="../img/btn/pageNext.png"
                    alt="pageNext"
                    style={{
                      height: "15px",
                    }}
                  />
                </button>
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
                <div style={{ width: "20px" }}></div>
                {selectedSubject.weeklyContents
                  .slice(displayWeeks[0], displayWeeks[1])
                  .map((curriculum) => (
                    <div
                      key={curriculum.weeklyContentId}
                      style={{
                        width: `${770 / 8}px`,
                        height: "16px",
                      }}
                    >
                      {postData.attendances.find(
                        (att) =>
                          att.week === curriculum.week &&
                          att.memberId === postData.studyMaster.studentId
                      )?.status === "출석" ? (
                        <img
                          src="../img/icon/attendance_enabled.png"
                          alt="attendance"
                          style={{ width: `100%` }}
                        />
                      ) : (
                        <img
                          src="../img/icon/attendance_disabled.png"
                          alt="attendance"
                          style={{ width: `100%` }}
                        />
                      )}
                    </div>
                  ))}
                {displayWeeks[1] >= totalWeeks ? (
                  Array(emptySlots)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={`empty-${i}`}
                        style={{
                          width: `${770 / 8}px`,
                        }}
                      >
                        &emsp;&emsp;
                      </div>
                    ))
                ) : (
                  <></>
                )}
                <div style={{ width: "20px" }}></div>
              </div>
              {postData.studyMembers
                .filter(
                  (member) =>
                    member.studentId !== postData.studyMaster.studentId
                )
                .map((studyMember) => (
                  <div
                    key={studyMember.studentId}
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
                    <div style={{ width: "20px" }}></div>
                    {selectedSubject.weeklyContents
                      .slice(displayWeeks[0], displayWeeks[1])
                      .map((curriculum) => (
                        <div
                          key={curriculum.weeklyContentId}
                          style={{
                            width: `${770 / 8}px`,
                            height: "16px",
                          }}
                        >
                          {postData.attendances.find(
                            (att) =>
                              att.week === curriculum.week &&
                              att.memberId === postData.studyMaster.studentId
                          )?.status === "출석" ? (
                            <img
                              src="../img/icon/attendance_enabled.png"
                              alt="attendance"
                              style={{ width: `100%` }}
                            />
                          ) : (
                            <img
                              src="../img/icon/attendance_disabled.png"
                              alt="attendance"
                              style={{ width: `100%` }}
                            />
                          )}
                        </div>
                      ))}
                    {displayWeeks[1] >= totalWeeks ? (
                      Array(emptySlots)
                        .fill(null)
                        .map((_, i) => (
                          <div
                            key={`empty-${i}`}
                            style={{
                              width: `${770 / 8}px`,
                            }}
                          >
                            &emsp;&emsp;
                          </div>
                        ))
                    ) : (
                      <></>
                    )}
                    <div style={{ width: "20px" }}></div>
                  </div>
                ))}
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "10px",
                  display: "flex",
                  justifyContent: "right",
                }}
              >
                {myData.studentId === postData.studyMaster.studentId ? (
                  <button
                    type="button"
                    style={{
                      width: "70px",
                      minWidth: "70px",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "12px",
                      backgroundColor: "#2CC295",
                      color: "#fff",
                      textAlign: "center",
                      borderRadius: "20px",
                      border: "none",
                      padding: "5px",
                      cursor: "pointer",
                      zIndex: "0",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = "0.8";
                    }}
                    onClick={() => {
                      setIsAttendancePopupOpen(true);
                    }}
                  >
                    출석하기
                  </button>
                ) : (
                  <></>
                )}
              </div>
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
                          member: "Weekly Best",
                          week: currentPage.toString(),
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
                          member: postData.studyMaster.studentId,
                          week: currentPage.toString(),
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
                              member: studyMember.studentId,
                              week: currentPage.toString(),
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Pretendard-Light",
                      fontSize: "clamp(10px, 1.5vw, 14px)",
                      color: "#fff",
                    }}
                  >
                    <button
                      onClick={handlePrev2}
                      style={{
                        height: "15px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        opacity: indexStart === 0 ? 0.3 : 1,
                      }}
                    >
                      <img
                        src="../img/btn/pagePrev.png"
                        alt="pageNext"
                        style={{
                          height: "15px",
                        }}
                      />
                    </button>
                    {selectedSubject.weeklyContents
                      .slice(indexStart, indexStart + itemsPerPage)
                      .map((curriculum) => {
                        return (
                          <div
                            key={curriculum.weeklyContentId}
                            style={{
                              maxWidth: `${820 / itemsPerPage - 10}px`,
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
                                id: postData.studyId.toString(),
                                member: postList,
                                week: curriculum.week.toString(),
                              });
                            }}
                          >
                            {curriculum.week}주차
                          </div>
                        );
                      })}
                    {indexStart + itemsPerPage >= totalWeeks ? (
                      Array(emptySlots)
                        .fill(null)
                        .map((_, i) => (
                          <div
                            key={`empty-${i}`}
                            style={{
                              maxWidth: `${820 / itemsPerPage - 10}px`,
                              padding: "5px 15px",
                            }}
                          >
                            &emsp;&emsp;
                          </div>
                        ))
                    ) : (
                      <></>
                    )}
                    <button
                      onClick={handleNext2}
                      style={{
                        height: "15px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        opacity:
                          indexStart + itemsPerPage >= totalWeeks ? 0.3 : 1,
                      }}
                    >
                      <img
                        src="../img/btn/pageNext.png"
                        alt="pageNext"
                        style={{
                          height: "15px",
                        }}
                      />
                    </button>
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
                                height: "25px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
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
                              {postList === "Weekly Best" &&
                              myData.studentId ===
                                postData.studyMaster.studentId ? (
                                <div
                                  style={{
                                    textDecoration: "none",
                                    width: "25px",
                                    height: "25px",
                                  }}
                                >
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
                                </div>
                              ) : (
                                <></>
                              )}
                              {myData.studentId === postList ? (
                                <Link
                                  to={`/studyAdd?study=${postData.studyId}&subject=${selectedSubject.subjectId}&week=${curriculum.weeklyContentId}`}
                                  style={{
                                    textDecoration: "none",
                                    width: "25px",
                                    height: "25px",
                                  }}
                                >
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
                                  />
                                </Link>
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

        {isAttendancePopupOpen && (
          <form
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflowY: "auto",
              backgroundColor: "#111015",
              padding: "30px 30px 20px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              textAlign: "left",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "40px",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                {getCurrentWeek(selectedSubject).week}주차 출석 체크
                <span
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                    marginLeft: "10px",
                  }}
                >
                  (
                  {getCurrentWeek(selectedSubject).startDate[0] +
                    "/" +
                    getCurrentWeek(selectedSubject).startDate[1] +
                    "/" +
                    getCurrentWeek(selectedSubject).startDate[2] +
                    " ~ " +
                    getCurrentWeek(selectedSubject).endDate[0] +
                    "/" +
                    getCurrentWeek(selectedSubject).endDate[1] +
                    "/" +
                    getCurrentWeek(selectedSubject).endDate[2]}
                  )
                </span>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "Pretendard-Regular",
                fontSize: "18px",
                gap: "10px",
              }}
            >
              <div style={{ display: "flex", alignContent: "center" }}>
                {postData.studyMaster.name}
                <label
                  style={{
                    marginLeft: "20px",
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    borderRadius: "4px",
                    border: "2px solid #2cc295",
                    backgroundColor: checkedMembers.includes(
                      postData.studyMaster.studentId
                    )
                      ? "#2cc295"
                      : "transparent",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={checkedMembers.includes(
                      postData.studyMaster.studentId
                    )}
                    onChange={() =>
                      handleCheckboxChange(postData.studyMaster.studentId)
                    }
                    style={{
                      opacity: 0,
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      cursor: "pointer",
                    }}
                  />
                  {checkedMembers.includes(postData.studyMaster.studentId) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      ✔
                    </span>
                  )}
                </label>
              </div>
              {postData.studyMembers
                .filter(
                  (member) =>
                    member.studentId !== postData.studyMaster.studentId
                )
                .map((studyMember) => (
                  <div style={{ display: "flex", alignContent: "center" }}>
                    {studyMember.name}
                    <label
                      style={{
                        marginLeft: "20px",
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        border: "2px solid #2cc295",
                        backgroundColor: checkedMembers.includes(
                          studyMember.studentId
                        )
                          ? "#2cc295"
                          : "transparent",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={checkedMembers.includes(studyMember.studentId)}
                        onChange={() =>
                          handleCheckboxChange(studyMember.studentId)
                        }
                        style={{
                          opacity: 0,
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
                      />
                      {checkedMembers.includes(studyMember.studentId) && (
                        <span
                          style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            color: "white",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          ✔
                        </span>
                      )}
                    </label>
                  </div>
                ))}
            </div>
            <div
              style={{
                width: "100%",
                marginTop: "20px",
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
                  const deleteEnd = window.confirm(
                    "출석 체크를 취소하시겠습니까?\n(변경 사항은 저장되지 않습니다.)"
                  );
                  if (deleteEnd) {
                    setIsAttendancePopupOpen(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={handleSubmit(onValid, onInvalid)}
              />
            </div>
          </form>
        )}
        {isAttendancePopupOpen && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              padding: "0 20px",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 999,
            }}
          />
        )}

        <BottomInfo />
      </div>
    </div>
  );
}
