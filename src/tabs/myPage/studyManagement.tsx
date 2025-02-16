import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

import Nav from "../../components/nav.tsx";
import Button from "../../components/button.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import SelectDeactivateAPI from "../../api/members/selectDeactivateAPI.tsx";
import GetMembersAPI from "../../api/members/getMembersAPI.tsx";
import PatchRoleAPI from "../../api/members/patchRoleAPI.tsx";

import SubjectData from "../../mockup_data/subject_data.tsx";
import StudyData from "../../mockup_data/study_data.tsx";

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
const study_data = StudyData();

type Members = {
  id: number;
  studentId: string;
  email: string;
  name: string;
  major: string;
  phone: string;
  role: string;
};

export default function StudyManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [cohort, setCohort] = useState(0);

  useEffect(() => {
    setCohort(cohort_data.batch);

    // localStorage에서 selected_id를 가져와 상태를 초기화
    const storedIds = JSON.parse(
      localStorage.getItem("selected_studyId") || "[]"
    );
    setSelectedIds(storedIds);

    // 컴포넌트 언마운트 시 selected_id 초기화
    return () => {
      localStorage.removeItem("selected_studyId");
    };
  }, []);

  const toggleSelect = (id: number) => {
    let updatedIds: number[];

    if (selectedIds.includes(id)) {
      updatedIds = selectedIds.filter((selectedId) => selectedId !== id);
    } else {
      updatedIds = [...selectedIds, id];
    }

    setSelectedIds(updatedIds);
    localStorage.setItem("selected_studyId", JSON.stringify(updatedIds));
  };

  const addStudy = () => {};

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
                      {cohort}기 스터디
                    </div>
                  </div>

                  {subject_data.map((subject, index) => (
                    <div
                      key={index}
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
                        <div style={{ display: "flex" }}>
                          <Button
                            type="primary"
                            size="xsmall"
                            title="추가"
                            onClick={() => {}}
                          />
                          {/* <img
                            src="../img/btn/plus_enabled.png"
                            alt="plus"
                            style={{
                              width: "30px",
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
                              addStudy();
                            }}
                          /> */}
                        </div>
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
                      </div>
                      <hr
                        style={{
                          height: "1px",
                          background: "#666",
                          border: "none",
                        }}
                      />
                      {study_data
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
                                {study.isBook ? "커리큘럼" : "자율"}
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
                                {study.studyMaster}
                                {study.studyMembers.map((studyMember) => (
                                  <> {studyMember}</>
                                ))}
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
                                  onClick={() => {}}
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
      <BottomInfo />
    </div>
  );
}
