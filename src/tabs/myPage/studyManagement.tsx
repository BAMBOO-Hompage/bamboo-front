import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetCohortLatestAPI from "../../api/cohorts/GetCohortLatestAPI.tsx";
import GetSubjectsAPI from "../../api/subjects/getSubjectsAPI.tsx";
import GetStudiesAPI from "../../api/studies/getStudiesAPI.tsx";
import ExistsAPI from "../../api/members/existsAPI.tsx";
import PostStudiesAPI from "../../api/studies/postStudiesAPI.tsx";
import DeleteStudiesAPI from "../../api/studies/deleteStudiesAPI.tsx";
import PatchStudiesAPI from "../../api/studies/patchStudiesAPI.tsx";

import "../../App.css";

type Cohort = {
  cohortId: number;
  batch: number;
  year: number;
  isFirstSemester: boolean;
  status: string;
  subjects: [];
};
type Subject = {
  subjectId: number;
  name: string;
  isBook: boolean;
  batch: number;
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
type Study = {
  studyId: number;
  teamName: string;
  subjectName: string;
  cohort: Cohort;
  isBook: boolean;
  section: number;
  studyMaster: {
    memberId: number;
    studentId: string;
    name: string;
  };
  studyMembers: [
    {
      memberId: number;
      studentId: string;
      name: string;
    }
  ];
  attendances: [
    {
      attendanceId: number;
      week: number;
      studentId: string;
      status: string;
    }
  ];
};

export default function StudyManagement() {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm();
  const {
    register: registerEdit,
    reset: resetEdit,
    getValues: getValuesEdit,
    handleSubmit: handleSubmitEdit,
    setValue: setValueEdit,
    setFocus: setFocusEdit,
    formState: { errors: errorsEdit },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [checkAuth, setCheckAuth] = useState<number>(0);
  const [cohort, setCohort] = useState<Cohort>({
    cohortId: 0,
    batch: 0,
    year: 0,
    isFirstSemester: true,
    status: "",
    subjects: [],
  });
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studies, setStudies] = useState<Study[]>([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number>(0);
  const [selectedSubjectName, setSelectedSubjectName] = useState<string>("");
  const [selectedIsBook, setSelectedIsBook] = useState<boolean>(true);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState<boolean>(false);
  const [editStudy, setEditStudy] = useState<Study>({
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
      memberId: 0,
      studentId: "",
      name: "",
    },
    studyMembers: [
      {
        memberId: 0,
        studentId: "",
        name: "",
      },
    ],
    attendances: [
      {
        attendanceId: 0,
        week: 0,
        studentId: "",
        status: "",
      },
    ],
  });

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_OPS") {
        setCheckAuth(2);
      } else if (data.role === "ROLE_ADMIN") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    if (isAddPopupOpen) {
      setTimeout(() => {
        setFocus("Section");
      }, 0);
    }
  }, [isAddPopupOpen, setFocus]);
  useEffect(() => {
    if (isEditPopupOpen) {
      setTimeout(() => {
        setFocusEdit("Section");
      }, 0);
    }
  }, [isEditPopupOpen, setFocusEdit]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cohortResult = await GetCohortLatestAPI();
        setCohort(cohortResult);
        console.log(cohortResult.batch);

        const subjectsResult = await GetSubjectsAPI(null, cohortResult.batch);
        setSubjects(subjectsResult);
        console.log(subjects);

        const studiesResults = await Promise.all(
          subjectsResult.map((subject) =>
            GetStudiesAPI(cohortResult.batch, subject.subjectId)
          )
        );
        setStudies(studiesResults);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (editStudy.section || editStudy.section === 0) {
      setValueEdit("Section", editStudy.section);
    }
    if (editStudy.teamName) {
      setValueEdit("TeamName", editStudy.teamName);
    }
    if (editStudy.studyMaster) {
      setValueEdit("StudyMaster", editStudy.studyMaster.studentId);
    }
    if (editStudy.studyMembers) {
      setEditMemberInputs(Array(editStudy.studyMembers.length - 1).fill(""));
      editStudy.studyMembers
        .filter(
          (member) => member.studentId !== editStudy.studyMaster.studentId
        )
        .forEach((member, index) => {
          setValueEdit(`StudyMember${index}`, member.studentId);
        });
    }
  }, [editStudy, setValueEdit]);

  const [memberInputs, setMemberInputs] = useState([""]);
  const addMember = () => {
    setMemberInputs([...memberInputs, ""]);
  };
  const [editMemberInputs, setEditMemberInputs] = useState([""]);
  const addEditMember = () => {
    setEditMemberInputs([...editMemberInputs, ""]);
  };

  const onValid = async (e) => {
    if (!e.TeamName || e.TeamName.length > 7) {
      alert("팀명은 7자 이내로 입력해주세요.");
      return;
    }
    try {
      const exists = await ExistsAPI(e.StudyMaster);
      if (!exists) {
        alert(`${e.StudyMaster}은 존재하지 않는 회원입니다.`);
        return;
      }
      const studyMembers = memberInputs.map(
        (_, index) => e[`StudyMember${index}`]
      );
      // 팀원 존재 여부 검사 (비동기 병렬)
      const memberExistResults = await Promise.all(
        studyMembers.map((member) => ExistsAPI(member))
      );
      // 존재하지 않는 멤버 확인
      const invalidMembers = studyMembers.filter(
        (_, idx) => !memberExistResults[idx]
      );
      if (invalidMembers.length > 0) {
        alert(`${invalidMembers.join(", ")}은 존재하지 않는 회원입니다`);
        return;
      }

      await PostStudiesAPI(
        selectedSubjectId,
        e.TeamName,
        cohort.batch,
        selectedIsBook,
        parseInt(e.Section),
        e.StudyMaster,
        studyMembers
      );
    } catch (error) {
      console.error("스터디 등록 오류:", error);
      alert("스터디 등록 중 오류가 발생했습니다.");
    }
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const onEditValid = async (e) => {
    if (!e.TeamName || e.TeamName.length > 7) {
      alert("팀명은 7자 이내로 입력해주세요.");
      return;
    }
    try {
      const exists = await ExistsAPI(e.StudyMaster);
      if (!exists) {
        alert(`${e.StudyMaster}은 존재하지 않는 회원입니다.`);
        return;
      }
      const studyMembers = memberInputs.map(
        (_, index) => e[`StudyMember${index}`]
      );
      // 팀원 존재 여부 검사 (비동기 병렬)
      const memberExistResults = await Promise.all(
        studyMembers.map((member) => ExistsAPI(member))
      );
      // 존재하지 않는 멤버 확인
      const invalidMembers = studyMembers.filter(
        (_, idx) => !memberExistResults[idx]
      );
      if (invalidMembers.length > 0) {
        alert(`${invalidMembers.join(", ")}은 존재하지 않는 회원입니다`);
        return;
      }

      await PatchStudiesAPI(
        editStudy.studyId,
        selectedSubjectId,
        e.TeamName,
        cohort.batch,
        editStudy.isBook,
        parseInt(e.Section),
        e.StudyMaster,
        studyMembers
      );
    } catch (error) {
      console.error("스터디 수정 오류:", error);
      alert("스터디 수정 중 오류가 발생했습니다.");
    }
  };
  const onEditInvalid = (e) => {
    console.log(e, "onEditInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const autoPattern = (id: string) => {
    let input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      console.error(`Element with id "${id}" not found.`);
      return;
    }
    let inputValue = input.value;
    inputValue = inputValue.replace(/[^0-9]/g, "");
    input.value = inputValue;
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
              minHeight: "570px",
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
                {checkAuth === 2 ? (
                  <>
                    <div
                      className="side_tabs"
                      onClick={() => {
                        window.location.href =
                          "/membershipManagement?page=1&size=10";
                      }}
                    >
                      회원 관리
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {checkAuth >= 1 ? (
                  <>
                    <div
                      className="side_tabs"
                      onClick={() => {
                        window.location.href = "/curriculumManagement";
                      }}
                    >
                      커리큘럼 관리
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
                      스터디 관리
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
                  스터디 관리
                  {/* <span
                    style={{
                      fontFamily: "Pretendard-Light",
                      fontSize: "12px",
                      color: "#FF5005",
                    }}
                  >
                    test 기간동안만 개방합니다. (활동 종료 제한)
                  </span> */}
                </div>
                <div style={{ marginTop: "40px" }}>
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
                      {cohort.batch}기 스터디
                    </div>
                  </div>

                  {subjects.map((subject) => (
                    <div
                      key={subject.subjectId}
                      style={{
                        marginBottom: "50px",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          marginBottom: "10px",
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
                        {cohort.status === "활동 준비" ? (
                          <div style={{ display: "flex" }}>
                            <Button
                              type="primary"
                              size="xsmall"
                              title="추가"
                              onClick={() => {
                                setIsAddPopupOpen(true);
                                setSelectedSubjectId(subject.subjectId);
                                setSelectedSubjectName(subject.name);
                                setSelectedIsBook(subject.isBook);
                              }}
                            />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div
                        style={{
                          width: "100%",
                          marginTop: "10px",
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Pretendard-Light",
                          fontSize: "16px",
                          color: "#888",
                          gap: "10px",
                          textAlign: "center",
                        }}
                      >
                        <div
                          style={{
                            flexGrow: 2,
                            flexBasis: "100px",
                            minWidth: "60px",
                          }}
                        >
                          분류
                        </div>
                        <div
                          style={{
                            flexGrow: 1,
                            flexBasis: "60px",
                            minWidth: "20px",
                          }}
                        >
                          분반
                        </div>
                        <div
                          style={{
                            flexGrow: 3,
                            flexBasis: "150px",
                            minWidth: "80px",
                          }}
                        >
                          팀원
                        </div>
                        {cohort.status === "활동 준비" ? (
                          <>
                            <div
                              style={{
                                flexGrow: 1,
                                flexBasis: "30px",
                                minWidth: "30px",
                              }}
                            >
                              수정
                            </div>
                            <div
                              style={{
                                flexGrow: 1,
                                flexBasis: "30px",
                                minWidth: "30px",
                              }}
                            >
                              삭제
                            </div>
                          </>
                        ) : (
                          <></>
                        )}
                      </div>
                      <hr
                        style={{
                          height: "1px",
                          background: "#666",
                          border: "none",
                        }}
                      />
                      {studies
                        .flat()
                        .filter((study) => study.subjectName === subject.name)
                        .map((study, idx) => (
                          <>
                            <div
                              key={idx}
                              style={{
                                position: "relative",
                                width: "100%",
                                minHeight: "40px",
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontFamily: "Pretendard-Light",
                                fontSize: "16px",
                                color: "#fff",
                                gap: "10px",
                                textAlign: "center",
                              }}
                            >
                              <div
                                style={{
                                  flexGrow: 2,
                                  flexBasis: "100px",
                                  minWidth: "60px",
                                }}
                              >
                                {study.isBook ? "정규" : "자율"}
                              </div>
                              <div
                                style={{
                                  flexGrow: 1,
                                  flexBasis: "60px",
                                  minWidth: "20px",
                                }}
                              >
                                {study.section}
                              </div>
                              <div
                                style={{
                                  flexGrow: 3,
                                  flexBasis: "150px",
                                  minWidth: "80px",
                                }}
                              >
                                {study.studyMaster.name},
                                {study.studyMembers
                                  .filter(
                                    (member) =>
                                      member.studentId !==
                                      study.studyMaster.studentId
                                  )
                                  .map((studyMember, index, arr) => (
                                    <span key={studyMember.studentId}>
                                      {studyMember.name}
                                      {index !== arr.length - 1 && ","}
                                    </span>
                                  ))}
                              </div>
                              {cohort.status === "활동 준비" ? (
                                <>
                                  <div
                                    style={{
                                      flexGrow: 1,
                                      flexBasis: "30px",
                                      minWidth: "30px",
                                      minHeight: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
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
                                      onClick={() => {
                                        setEditStudy(study);
                                        setSelectedSubjectId(subject.subjectId);
                                        setIsEditPopupOpen(true);
                                      }}
                                    />
                                  </div>
                                  <div
                                    style={{
                                      flexGrow: 1,
                                      flexBasis: "30px",
                                      minWidth: "30px",
                                      minHeight: "100%",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <img
                                      src="../../img/btn/delete_disabled.png"
                                      alt="delete"
                                      style={{
                                        width: "25px",
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                      }}
                                      onClick={() => {
                                        const confirm =
                                          window.confirm(
                                            "스터디를 삭제하시겠습니까?"
                                          );
                                        if (confirm) {
                                          DeleteStudiesAPI(study.studyId);
                                        }
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
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                            <hr
                              style={{
                                height: "0.5px",
                                background: "#666",
                                border: "none",
                              }}
                            />
                          </>
                        ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

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
            <div
              style={{
                width: "80%",
                height: "40px",
                backgroundColor: "transparent",
                borderRadius: "10px",
                fontFamily: "Pretendard-Bold",
                fontSize: "28px",
              }}
            >
              {selectedSubjectName}
            </div>
            <img
              src="../img/btn/plus_enabled.png"
              alt="plus"
              style={{
                width: "30px",
                height: "30px",
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
                addMember();
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
            <div style={{ width: "200px", color: "#fff" }}>·&emsp;분반</div>
            <div style={{ width: "100%" }}>
              <input
                id="section"
                type="text"
                placeholder={`분반을 입력해주세요.`}
                autoComplete="off"
                onKeyUp={() => {
                  autoPattern("section");
                }}
                {...register("Section", {
                  required: `분반을 입력해주세요.`,
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
            <div style={{ width: "200px", color: "#fff" }}>·&emsp;팀이름</div>
            <div style={{ width: "100%" }}>
              <input
                id="teamName"
                type="text"
                placeholder={`팀이름을 입력해주세요.`}
                autoComplete="off"
                {...register("TeamName", {
                  required: `팀이름을 입력해주세요.`,
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
            <div style={{ width: "200px", color: "#fff" }}>
              ·&emsp;팀장(학번)
            </div>
            <div style={{ width: "100%" }}>
              <input
                id="studyMaster"
                type="text"
                placeholder={`팀장을 입력해주세요.`}
                autoComplete="off"
                onKeyUp={() => {
                  autoPattern("studyMaster");
                }}
                {...register("StudyMaster", {
                  required: `팀장을 입력해주세요.`,
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
          {memberInputs.map((member, index) => (
            <div
              key={index}
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
              {index === 0 ? (
                <div style={{ width: "200px", color: "#fff" }}>
                  ·&emsp;팀원(학번)
                </div>
              ) : (
                <div style={{ width: "200px" }}></div>
              )}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  id={`studyMember${index}`}
                  type="text"
                  placeholder={`팀원을 입력해주세요.`}
                  autoComplete="off"
                  onKeyUp={() => {
                    autoPattern(`studyMember${index}`);
                  }}
                  {...register(`StudyMember${index}`, {
                    required: `팀원을 입력해주세요.`,
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
                <img
                  src="../../img/btn/delete_disabled.png"
                  alt="delete"
                  style={{
                    width: "30px",
                    height: "30px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setMemberInputs(
                      memberInputs.filter((_, i) => i !== index) // 선택한 항목 제거
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
                  "스터디 추가를 취소하시겠습니까?\n(변경 사항은 저장되지 않습니다.)"
                );
                if (deleteEnd) {
                  setMemberInputs([""]);
                  reset({ Section: "", TeamName: "", StudyMaster: "" });
                  setIsAddPopupOpen(false);
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

      {isEditPopupOpen && (
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
              }}
            >
              {editStudy.subjectName}
            </div>
            <img
              src="../img/btn/plus_enabled.png"
              alt="plus"
              style={{
                width: "30px",
                height: "30px",
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
                addEditMember();
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
            <div style={{ width: "200px", color: "#fff" }}>·&emsp;분반</div>
            <div style={{ width: "100%" }}>
              <input
                id="editSection"
                type="text"
                placeholder={`분반을 입력해주세요.`}
                autoComplete="off"
                onKeyUp={() => {
                  autoPattern("editSection");
                }}
                {...registerEdit("Section", {
                  required: `분반을 입력해주세요.`,
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
            <div style={{ width: "200px", color: "#fff" }}>·&emsp;팀이름</div>
            <div style={{ width: "100%" }}>
              <input
                id="teamName"
                type="text"
                placeholder={`팀이름을 입력해주세요.`}
                autoComplete="off"
                {...registerEdit("TeamName", {
                  required: `팀이름을 입력해주세요.`,
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
            <div style={{ width: "200px", color: "#fff" }}>
              ·&emsp;팀장(학번)
            </div>
            <div style={{ width: "100%" }}>
              <input
                id="editStudyMaster"
                type="text"
                placeholder={`팀장을 입력해주세요.`}
                autoComplete="off"
                onKeyUp={() => {
                  autoPattern("editStudyMaster");
                }}
                {...registerEdit("StudyMaster", {
                  required: `팀장을 입력해주세요.`,
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
          {editMemberInputs.map((member, index) => (
            <div
              key={index}
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
              {index === 0 ? (
                <div style={{ width: "200px", color: "#fff" }}>
                  ·&emsp;팀원(학번)
                </div>
              ) : (
                <div style={{ width: "200px" }}></div>
              )}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <input
                  id={`editStudyMember${index}`}
                  type="text"
                  placeholder={`팀원을 입력해주세요.`}
                  autoComplete="off"
                  onKeyUp={() => {
                    autoPattern(`editStudyMember${index}`);
                  }}
                  {...registerEdit(`StudyMember${index}`, {
                    required: `팀원을 입력해주세요.`,
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
                <img
                  src="../../img/btn/delete_disabled.png"
                  alt="delete"
                  style={{
                    width: "30px",
                    height: "30px",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setEditMemberInputs(
                      editMemberInputs.filter((_, i) => i !== index) // 선택한 항목 제거
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
                  "스터디 추가를 취소하시겠습니까?\n(변경 사항은 저장되지 않습니다.)"
                );
                if (deleteEnd) {
                  setEditMemberInputs([""]);
                  setIsEditPopupOpen(false);
                }
              }}
            />
            <Button
              type="primary"
              size="small"
              title="저장"
              onClick={handleSubmitEdit(onEditValid, onEditInvalid)}
            />
          </div>
        </form>
      )}
      {isEditPopupOpen && (
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
  );
}
