import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import SelectDeactivateAPI from "../../api/members/selectDeactivateAPI.tsx";
import GetMembersAPI from "../../api/members/getMembersAPI.tsx";
import PatchRoleAPI from "../../api/members/patchRoleAPI.tsx";

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

  const [isEndActive, setIsEndActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [confirmationText, setConfirmationText] = useState("");
  const [cohort, setCohort] = useState(0);
  const [isFirstSemester, setIsFirstSemester] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const patchCohorts = (isActive) => {
    console.log("patchCohorts 실행: ", isActive);
  };

  const postCohorts = (newCohort) => {
    console.log("postCohorts 실행: ", newCohort);
  };

  useEffect(() => {
    const month = currentDate.getMonth() + 1;
    setIsEndActive(
      (cohort_data.isActive === true && month === 2) || month === 8
    );

    setCohort(cohort_data.batch);
  }, [currentDate]);

  const handleEnd = () => {
    if (confirmationText === "6기 활동 종료") {
      patchCohorts(false);
      const newCohort = cohort + 1;
      setCohort(newCohort);
      setIsFirstSemester(currentDate.getMonth() + 1 === 2);
      postCohorts({
        cohort: newCohort,
        year: currentDate.getFullYear(),
        isFirstSemester,
      });

      reset({ End: "" });
      setConfirmationText("");
      setIsPopupOpen(!isPopupOpen);
    } else {
      alert("다시 입력해주세요.");
    }
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
                    window.location.href = "/createStudy";
                  }}
                >
                  스터디 생성
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
                maxWidth: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "50px",
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
                        setSearchParams({
                          edit: "1",
                          changePassword: "0",
                        });
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
                        setIsPopupOpen(!isPopupOpen);
                      }}
                    >
                      활동 종료
                    </div>
                  </div>
                )}
                {/* 팝업 컴포넌트 */}
                {isPopupOpen && (
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
                        "{`6`}기 활동 종료"
                      </span>
                      를 입력하고 활동 종료 버튼을 눌러주세요.
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
                          height: "40px",
                          margin: "0 20px",
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
                          const deleteEnd =
                            window.confirm("활동 종료를 취소하시겠습니까?");
                          if (deleteEnd) {
                            reset({ End: "" });
                            setConfirmationText("");
                            setIsPopupOpen(!isPopupOpen);
                          }
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
                {/* 팝업 배경 */}
                {isPopupOpen && (
                  <div
                    onClick={() => {
                      setIsPopupOpen(!isPopupOpen);
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
