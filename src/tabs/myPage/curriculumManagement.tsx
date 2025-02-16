import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetCohortAPI from "../../api/cohorts/GetCohortAPI.tsx";
import GetCohortsAPI from "../../api/cohorts/GetCohortsAPI.tsx";
import PostCohortsAPI from "../../api/cohorts/PostCohortsAPI.tsx";
import PostSubjectsAPI from "../../api/subjects/postSubjectsAPI.tsx";
import PostWeeklyContentsAPI from "../../api/subjects/postWeelyContentsAPI.tsx";

import SubjectData from "../../mockup_data/subject_data.tsx";

import "../../App.css";

const subject_data = SubjectData();
const cohort_data = {
  cohortId: 1,
  batch: 6,
  year: 2025,
  isFirstSemester: true,
  isActive: true,
  subjects: SubjectData(),
};

export default function CurriculumManagement() {
  const currentDate = new Date();

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [isEndActive, setIsEndActive] = useState(true);
  const [confirmationText, setConfirmationText] = useState("");
  const [cohort, setCohort] = useState(0);
  const [isFirstSemester, setIsFirstSemester] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEndPopupOpen, setIsEndPopupOpen] = useState(false);

  useEffect(() => {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    GetCohortsAPI().then((result) => {
      result = result[0];
      setIsEndActive(
        result.isActive === true &&
          (month === 2 || month === 8) &&
          (year !== result.year ||
            (result.isFirstSemester === true && month === 8))
      );
      setCohort(result.batch);
    });
  }, []);

  const handleEnd = () => {
    if (confirmationText === `${cohort}기 활동 종료`) {
      // PatchCohortsAPI(false).then(() => {
      //   const newCohort = cohort + 1;
      //   setCohort(newCohort);
      //   setIsFirstSemester(currentDate.getMonth() + 1 === 2);
      //   PostCohortsAPI(cohort, currentDate.getFullYear(), isFirstSemester).then(
      //     () => {
      //       reset({ End: "" });
      //       setConfirmationText("");
      //       setIsEndPopupOpen(!isEndPopupOpen);
      //     }
      //   );
      // });
      alert(`${cohort}기 활동 종료`);
    } else {
      alert("다시 입력해주세요.");
    }
  };

  const [curriculumList, setCurriculumList] = useState([
    {
      week: 1,
      content: "",
      startDate: undefined,
      endDate: undefined,
      startPage: null,
      endPage: null,
    },
  ]);

  const addCurriculum = () => {
    const updatedSubjects = [...curriculumList];
    updatedSubjects.push({
      week: updatedSubjects.length + 1,
      content: "",
      startDate: undefined,
      endDate: undefined,
      startPage: null,
      endPage: null,
    });
    setCurriculumList(updatedSubjects);
  };

  const onValid = async (e) => {
    // try {
    //   const subjectResponse = await PostSubjectsAPI({
    //     subject: e.Subject,
    //     book: e.Book,
    //     isCurriculum: e.Category==="커리큘럼",
    //     cohort: cohort,
    //   });
    //   if (!subjectResponse) {
    //     alert("과목 생성에 실패했습니다.");
    //     return;
    //   }
    // console.log(subjectResponse)
    //   const subjectId = subjectResponse.subjectId;
    //   for (const curriculum of curriculumList) {
    //     await PostWeeklyContentsAPI({
    //       subjectId: subjectId,
    //       week: curriculum.week,
    //       startDate: e[`StartDate${curriculum.week}`],
    //       endDate: e[`EndDate${curriculum.week}`],
    //       startPage: e[`Startpage${curriculum.week}`],
    //       endPage: e[`EndPage${curriculum.week}`],
    //       content: e[`Content${curriculum.week}`],
    //     });
    //   }
    //   alert("커리큘럼이 성공적으로 등록되었습니다.");
    //   setIsAddPopupOpen(false);
    // } catch (error) {
    //   console.error("커리큘럼 등록 오류:", error);
    //   alert("커리큘럼 등록 중 오류가 발생했습니다.");
    // }
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="myPage" />
      <div className="background">
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
              padding: "0 20px",
              minHeight: "600px",
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "150px",
              display: "flex",
            }}
          >
            <div
              style={{
                boxSizing: "border-box",
                width: "clamp(120px, 20vw, 180px)",
                minHeight: "100%",
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
                마이페이지
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
                    window.location.href = "/personalInfo";
                  }}
                >
                  개인 정보
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href =
                      "/membershipManagement?page=1&size=10";
                  }}
                >
                  회원 관리
                </div>
                <div
                  className="side_tabs"
                  style={{
                    boxSizing: "border-box",
                    color: "#2CC295",
                    borderRight: "1px solid #2cc295",
                  }}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  커리큘럼 관리
                </div>
                <div
                  className="side_tabs"
                  onClick={() => {
                    window.location.href = "/studyManagement";
                  }}
                >
                  스터디 관리
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
                width: "100%",
                maxWidth: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "clamp(20px, 4vw, 50px)",
              }}
            >
              <div
                style={{
                  width: "100%",
                }}
              >
                <div
                  style={{
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  커리큘럼 관리
                  <span
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#FF5005",
                    }}
                  >
                    test 기간동안만 개방합니다. (활동 종료 제한)
                  </span>
                </div>
              </div>

              <div
                style={{
                  width: "100%",
                  marginTop: "40px",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginBottom: "30px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Pretendard-SemiBold",
                      fontSize: "22px",
                      color: "#2CC295",
                    }}
                  >
                    {cohort}기 커리큘럼
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Pretendard-Light",
                      fontSize: "18px",
                      color: "#777",
                    }}
                  >
                    커리큘럼 추가&emsp;
                    <img
                      src="../../img/btn/edit_enabled.png"
                      alt="edit"
                      style={{
                        width: "30px",
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
                      onClick={() => {
                        setIsAddPopupOpen(!isAddPopupOpen);
                      }}
                    />
                  </div>
                </div>

                {subject_data.map((subject, index) => (
                  <div
                    key={index}
                    style={{
                      marginBottom: "30px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        marginBottom: "20px",
                        fontFamily: "Pretendard-SemiBold",
                        fontSize: "22px",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div>
                        <img
                          src="../img/icon/leaf_list.png"
                          alt="leaf_list"
                          style={{ width: "9px" }}
                        />
                        &emsp;{subject.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Pretendard-Light",
                          fontSize: "14px",
                          color: "#777",
                        }}
                      >
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.fontWeight = "600";
                            e.currentTarget.style.textDecoration =
                              "underline #777";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.fontWeight = "300";
                            e.currentTarget.style.textDecoration = "none";
                          }}
                          onClick={() => {}}
                        >
                          수정
                        </span>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        <span
                          style={{
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.fontWeight = "600";
                            e.currentTarget.style.textDecoration =
                              "underline #777";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.fontWeight = "300";
                            e.currentTarget.style.textDecoration = "none";
                          }}
                          onClick={() => {}}
                        >
                          삭제
                        </span>
                      </div>
                    </div>
                    {subject.weeklyContents.map((curriculum, weekIndex) => (
                      <div
                        key={weekIndex}
                        style={{
                          marginBottom: "10px",
                          fontFamily: "Pretendard-Light",
                          fontSize: "16px",
                          color: "#fff",
                          display: "flex",
                        }}
                      >
                        <div style={{ width: "60px" }}>
                          {curriculum.week}주차
                        </div>
                        <div>{curriculum.content}</div>
                      </div>
                    ))}
                  </div>
                ))}

                {isEndActive && (
                  <div
                    style={{
                      width: "100%",
                      marginTop: "100px",
                      display: "flex",
                      justifyContent: "right",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Pretendard-SemiBold",
                        fontSize: "20px",
                        width: "280px",

                        padding: "12px",
                        backgroundColor: "#111015",
                        borderRadius: "25px",
                        boxShadow:
                          "-10px -10px 30px #242424, 15px 15px 30px #000",
                        color: "#FF5005",
                        cursor: "pointer",
                        transition: "all 0.3s ease",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLDivElement).style.transform =
                          "scale(1.05)"; // 살짝 확대
                        (e.target as HTMLDivElement).style.boxShadow =
                          "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLDivElement).style.transform =
                          "scale(1)";
                        (e.target as HTMLDivElement).style.boxShadow =
                          "-10px -10px 30px #242424, 15px 15px 30px #000";
                      }}
                      onClick={() => {
                        setIsEndPopupOpen(!isEndPopupOpen);
                      }}
                    >
                      활동 종료
                    </div>
                  </div>
                )}

                {/* 커리큘럼 추가 팝업*/}
                {isAddPopupOpen && (
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
                      <input
                        id="subject"
                        className="title"
                        type="text"
                        placeholder="과목을 입력해주세요."
                        autoComplete="off"
                        {...register("Subject", {
                          required: "과목을 입력해주세요.",
                        })}
                        style={{
                          width: "80%",
                          height: "40px",
                          backgroundColor: "transparent",
                          borderRadius: "10px",
                          fontFamily: "Pretendard-Bold",
                          fontSize: "28px",
                        }}
                      />
                      <img
                        src="../img/btn/plus_enabled.png"
                        alt="plus"
                        style={{
                          width: "30px",
                          height: "30px",
                          paddingRight: "10px",
                          opacity: "0.8",
                          transition: "all 0.3s ease",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.opacity = "1";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.opacity = "0.8";
                        }}
                        onClick={() => {
                          addCurriculum();
                        }}
                      />
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
                      <div style={{ width: "80px", color: "#fff" }}>
                        ·&emsp;분류
                      </div>
                      <div style={{ width: "100%" }}>
                        <select
                          defaultValue="커리큘럼"
                          style={{
                            width: "100%",
                            height: "40px",
                            padding: "0 20px",
                            backgroundColor: "#171717",
                            borderRadius: "20px",
                            border: "none",
                            fontFamily: "Pretendard-Light",
                            fontSize: "18px",
                            color: "#2CC295",
                            cursor: "pointer",
                          }}
                          {...register("Category", {
                            required: "분류를 선택해주세요.",
                          })}
                        >
                          <option
                            value="커리큘럼"
                            style={{ background: "#111015", color: "#ddd" }}
                          >
                            커리큘럼
                          </option>
                          <option
                            value="자율"
                            style={{
                              background: "#111015",
                              color: "#2CC295",
                              cursor: "pointer",
                            }}
                          >
                            자율
                          </option>
                        </select>
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
                      <div style={{ width: "80px", color: "#fff" }}>
                        ·&emsp;교재
                      </div>
                      <div style={{ width: "100%" }}>
                        <input
                          id="book"
                          type="text"
                          placeholder={`교재를 입력해주세요.`}
                          autoComplete="off"
                          {...register("Book", {
                            required: `교재를 입력해주세요.`,
                          })}
                          style={{
                            flex: "1",
                            width: "100%",
                            minWidth: "150px",
                            height: "40px",
                            padding: "0 20px",
                            backgroundColor: "#171717",
                            borderRadius: "20px",
                            fontFamily: "Pretendard-Light",
                            fontSize: "18px",
                          }}
                        />
                      </div>
                    </div>
                    {curriculumList.map((curriculum, index) => (
                      <div
                        key={curriculum.week}
                        style={{
                          marginBottom: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          fontFamily: "Pretendard-Regular",
                          fontSize: "18px",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "80px",
                            paddingTop: "10px",
                            color: "#fff",
                          }}
                        >
                          ·&emsp;{curriculum.week}주차
                        </div>
                        <div
                          style={{
                            width: "100%",
                            backgroundColor: "#171717",
                            borderRadius: "20px",
                          }}
                        >
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "20px",
                              margin: "0 auto",
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <label
                              htmlFor="period"
                              style={{
                                fontFamily: "Pretendard-Regular",
                                fontSize: "clamp(14px, 2.2vw, 18px)",
                                color: "#fff",
                                width: "80px",
                                minWidth: "70px",
                                paddingLeft: "20px",
                              }}
                            >
                              기간 :
                            </label>
                            <input
                              type="date"
                              style={{
                                width: "50%",
                                fontFamily: "Pretendard-Light",
                                fontSize: "18px",
                                maxWidth: "160px",
                              }}
                              {...register(`StartDate${curriculum.week}`, {
                                required: "시작일을 입력해주세요.",
                              })}
                            />
                            ~
                            <input
                              type="date"
                              style={{
                                fontFamily: "Pretendard-Light",
                                fontSize: "18px",
                                marginLeft: "20px",
                                width: "50%",
                                maxWidth: "160px",
                              }}
                              {...register(`EndDate${curriculum.week}`, {
                                required: "종료일을 입력해주세요.",
                              })}
                            />
                            <img
                              src="../../img/btn/delete_disabled.png"
                              alt="delete"
                              style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                                width: "25px",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                              }}
                              onClick={() => {
                                setCurriculumList(
                                  curriculumList
                                    .filter((_, i) => i !== index) // 선택한 항목 제거
                                    .map((curriculum, newIndex) => ({
                                      ...curriculum,
                                      week: newIndex + 1,
                                    }))
                                );
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
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "20px",
                              margin: "0 auto",
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <label
                              htmlFor="page"
                              style={{
                                fontFamily: "Pretendard-Regular",
                                fontSize: "clamp(14px, 2.2vw, 18px)",
                                color: "#fff",
                                width: "80px",
                                minWidth: "70px",
                                paddingLeft: "20px",
                              }}
                            >
                              페이지 :
                            </label>
                            <input
                              type="number"
                              placeholder="시작페이지 입력"
                              style={{
                                fontFamily: "Pretendard-Light",
                                fontSize: "18px",
                                maxWidth: "160px",
                              }}
                              {...register(`Startpage${curriculum.week}`, {
                                required: "시작 페이지를 입력해주세요.",
                              })}
                            />
                            ~
                            <input
                              type="number"
                              placeholder="끝페이지 입력"
                              style={{
                                overflow: "hidden",
                                fontFamily: "Pretendard-Light",
                                fontSize: "18px",
                                maxWidth: "160px",
                                marginLeft: "20px",
                              }}
                              {...register(`EndPage${curriculum.week}`, {
                                required: "종료 페이지를 입력해주세요.",
                              })}
                            />
                          </div>
                          <div
                            style={{
                              width: "100%",
                              height: "40px",
                              borderRadius: "20px",
                              margin: "0 auto",
                              display: "flex",
                              alignItems: "center",
                              position: "relative",
                            }}
                          >
                            <label
                              htmlFor="name"
                              style={{
                                fontFamily: "Pretendard-Regular",
                                fontSize: "clamp(14px, 2.2vw, 18px)",
                                color: "#fff",
                                minWidth: "80px",
                                paddingLeft: "20px",
                              }}
                            >
                              내용 :
                            </label>
                            <input
                              id="content"
                              placeholder="내용 입력"
                              type="text"
                              autoComplete="off"
                              {...register(`Content${curriculum.week}`, {
                                required: "내용을 입력해주세요.",
                              })}
                              style={{
                                width: "100%",
                                height: "30px",
                                marginRight: "20px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
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
                            "커리큘럼 추가를 취소하시겠습니까?\n(변경 사항은 저장되지 않습니다.)"
                          );
                          if (deleteEnd) {
                            setCurriculumList([
                              {
                                week: 1,
                                content: "",
                                startDate: undefined,
                                endDate: undefined,
                                startPage: null,
                                endPage: null,
                              },
                            ]);
                            setIsAddPopupOpen(!isAddPopupOpen);
                          }
                        }}
                      />
                      <Button
                        type="primary"
                        size="small"
                        title="저장"
                        onClick={() => {
                          handleSubmit(onValid, onInvalid);
                        }}
                      />
                    </div>
                  </form>
                )}
                {isAddPopupOpen && (
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

                {/* 활동 종료 팝업*/}
                {isEndPopupOpen && (
                  <form
                    style={{
                      position: "fixed",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "80%",
                      maxWidth: "380px",
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
                        fontFamily: "Pretendard-Regular",
                        fontSize: "16px",
                        color: "#fff",
                        marginBottom: "10px",
                        lineHeight: "1.5",
                      }}
                    >
                      <span style={{ color: "#FF5005" }}>
                        "{cohort}기 활동 종료"
                      </span>
                      를 입력하고 활동 종료 버튼을 눌러주세요.
                      <br />
                      (활동 종료 시 새로운 기수
                      <span style={{ color: "#FF5005" }}>({cohort + 1}기)</span>
                      가 자동 생성됩니다.)
                      <br />
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "40px",
                        backgroundColor: "#111015",
                        boxShadow:
                          "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                        borderRadius: "20px",
                        marginBottom: "20px",
                      }}
                    >
                      <input
                        id="confirmEnd"
                        type="text"
                        placeholder="활동 종료를 확인해주세요."
                        autoComplete="off"
                        value={confirmationText}
                        {...register("End", {
                          required: "활동 종료를 확인해주세요.",
                          onChange: (e) => setConfirmationText(e.target.value),
                        })}
                        style={{
                          width: "100%",
                          maxWidth: "340px",
                          padding: "0 20px",
                          height: "40px",
                          borderRadius: "10px",
                          fontFamily: "Pretendard-Light",
                          fontSize: "18px",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        width: "250px",
                        margin: "0 auto",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <Button
                        type="destructive"
                        size="small"
                        title="취소"
                        onClick={() => {
                          reset({ End: "" });
                          setConfirmationText("");
                          setIsEndPopupOpen(!isEndPopupOpen);
                        }}
                      />
                      <Button
                        type="primary"
                        size="small"
                        title="활동 종료"
                        onClick={() => {
                          handleEnd();
                        }}
                      />
                    </div>
                  </form>
                )}
                {isEndPopupOpen && (
                  <div
                    onClick={() => {
                      setIsEndPopupOpen(!isEndPopupOpen);
                    }}
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <BottomInfo />
    </div>
  );
}
