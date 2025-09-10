import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion, transform } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetCohortAPI from "../../api/cohorts/GetCohortAPI.tsx";
import GetCohortLatestAPI from "../../api/cohorts/GetCohortLatestAPI.tsx";
import GetStudyAPI from "../../api/studies/getStudyAPI.tsx";
import GetWeeklyBestAPI from "../../api/inventories/getWeeklyBestAPI.tsx";
import PostAwardsAPI from "../../api/awards/postAwardsAPI.tsx";
import GetAwardsAPI from "../../api/awards/getAwardsAPI.tsx";
import GetAwardLatestAPI from "../../api/awards/getAwardLatestAPI.tsx";
import DeleteAwardsAPI from "../../api/awards/deleteAwardsAPI.tsx";

import "../../App.css";

type Cohort = {
  cohortId: number;
  batch: number;
  year: number;
  isFirstSemester: boolean;
  status: string;
  subjects: [];
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
type Award = {
  awardId: number;
  writerName: string;
  study: {
    studyId: number;
    subjectName: string;
    section: number;
  };
  batch: number;
  week: number;
};
type Inventory = {
  inventoryId: number;
  writerId: number;
  writerStudentId: string;
  writerName: string;
  writerImageUrl: string;
  study: {
    teamName: string;
    subjectName: string;
    batch: number;
    section: number;
  };
  title: string;
  content: string;
  week: number;
  isWeeklyBest: true;
  fileUrl: string;
  award: Award;
};

export default function HallOfFame() {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [hovered, setHovered] = useState("");
  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [cohortLatest, setCohortLatest] = useState<Cohort>({
    cohortId: 0,
    batch: 0,
    year: 0,
    isFirstSemester: true,
    status: "",
    subjects: [],
  });
  const [selectedCohort, setSelectedCohort] = useState(0);
  const [groupedAwards, setGroupedAwards] = useState<[][]>([]);
  const [awardsLatest, setAwardsLatest] = useState([]);
  const [curriculumSubjects, setCurriculumSubjects] = useState([]);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlParams, setUrlParams] = useState({ id: "", week: "" });
  const [selectedStudy, setSelectedStudy] = useState<Study>({
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
  const [selectedInventory, setSelectedInventory] = useState<
    Inventory | undefined
  >({
    inventoryId: 0,
    writerId: 0,
    writerStudentId: "",
    writerName: "",
    writerImageUrl: "",
    study: {
      teamName: "",
      subjectName: "",
      batch: 0,
      section: 0,
    },
    title: "",
    content: "",
    week: 0,
    isWeeklyBest: true,
    fileUrl: "",
    award: {
      awardId: 0,
      writerName: "",
      study: {
        studyId: 0,
        subjectName: "",
        section: 0,
      },
      batch: 0,
      week: 0,
    },
  });

  useEffect(() => {
    CheckAuthAPI().then((data) => {
      if (data.role === "ROLE_ADMIN" || data.role === "ROLE_OPS") {
        setCheckAuth(1);
      } else {
        setCheckAuth(0);
      }
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cohortResult = await GetCohortLatestAPI();
        setCohortLatest(cohortResult);
        setSelectedCohort(cohortResult.batch);
        setCurriculumSubjects(
          cohortResult.subjects.filter((subject) => subject.isBook === true)
        );
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(selectedCohort);
        if (selectedCohort !== 0) {
          const selectedCohortResult = await GetCohortAPI(selectedCohort);
          setCurriculumSubjects(
            selectedCohortResult.subjects.filter(
              (subject) => subject.isBook === true
            )
          );
        }
        const awardsLatestResult = await GetAwardLatestAPI(selectedCohort);
        setAwardsLatest(awardsLatestResult);
        const awardsResult = await GetAwardsAPI(selectedCohort);
        // 1. week별로 데이터를 묶는다
        const grouped = awardsResult.reduce((acc, curr) => {
          const week = curr.week;
          if (!acc[week]) {
            acc[week] = [];
          }
          acc[week].push(curr);
          return acc;
        }, {});
        // 2. 전체 주차 범위 구하기
        const allWeeks = Array.from(
          { length: Math.max(...awardsResult.map((a) => a.week)) },
          (_, i) => i + 1
        );
        // 3. 빠진 주차도 포함한 리스트로 만들기
        const sortedGrouped = allWeeks.map((week) => grouped[week] ?? []);
        setGroupedAwards(sortedGrouped);
        console.log(groupedAwards);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [selectedCohort]);

  const onValid = async (e) => {
    const inputUrl = e.URL;
    setUrlInput(inputUrl);
    try {
      const url = new URL(inputUrl);
      // 1. 도메인/studyPost 경로인지 확인
      if (!url.pathname.startsWith("/studyPost")) {
        alert("올바른 URL을 입력해주세요.");
        setUrlParams({ id: "", week: "" });
        return;
      }
      // 2. URL 파라미터에서 id, member, week 추출
      const searchParams = new URLSearchParams(url.search);
      const id = searchParams.get("id") || "";
      const week = searchParams.get("week") || "";
      const studyResult = await GetStudyAPI(id);
      setSelectedStudy(studyResult);
      const inventoryResult = await GetWeeklyBestAPI(id, week);
      setSelectedInventory(inventoryResult);
      setUrlParams({ id, week });
    } catch (error) {
      alert("올바른 URL을 입력해주세요.");
      setUrlParams({ id: "", week: "" });
    }
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  // 조명 효과
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Nav type="dataCenter" />
      <div className="background" style={{ position: "relative" }}>
        <img
          src="../img/hallOfFame.png"
          alt="hallOfFame"
          style={{
            position: "absolute",
            top: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "1000px",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        />
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
              minHeight: "1300px",
              margin: "0 auto",
              paddingTop: "100px",
              marginBottom: "150px",
            }}
          >
            <div style={{ width: "100%", marginTop: "40px" }}>
              <div
                style={{
                  margin: "0 auto",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "70px",
                  color: "#2cc295",
                }}
              >
                HALL
                <br />
                OF
                <br />
                FAME
              </div>
              <div
                style={{
                  margin: "0 auto",
                  fontFamily: "Pretendard-Light",
                  fontSize: "20px",
                  color: "#fff",
                }}
              >
                명예의 전당
              </div>
            </div>
            <div style={{ width: "100%", marginTop: "40px" }}>
              <div
                style={{
                  width: "200px",
                  margin: "0 auto",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(17, 16, 21, 0.5)",
                  fontFamily: "Pretendard-Light",
                  fontSize: "15px",
                  color: "#777",
                }}
              >
                BEST OF THE SEASON
              </div>
              <div
                style={{
                  width: "100%",
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {curriculumSubjects?.map((subject, index) => (
                  <div
                    key={subject.subjectId}
                    style={{
                      position: "relative",
                      width: "150px",
                      height: "150px",
                      marginTop: index % 2 !== 0 ? "100px" : undefined,
                    }}
                  >
                    {awardsLatest.filter(
                      (award) => award.study.subjectName === subject.name
                    ).length > 0 ? (
                      <>
                        <div style={{ marginTop: "20px", textAlign: "left" }}>
                          {awardsLatest
                            .filter(
                              (award) =>
                                award.study.subjectName === subject.name
                            )
                            .map((award, index) => (
                              <div key={index} style={{ position: "relative" }}>
                                <div
                                  style={{
                                    position: "absolute",
                                    left: "50%",
                                    marginTop: "30px",
                                    transform: "translateX(-50%)",
                                    width: "80%",
                                    height: "40px",
                                    cursor: "pointer",
                                    background:
                                      hovered === award.awardId
                                        ? "#2cc295"
                                        : "transparent",
                                    filter: "blur(40px)",
                                    zIndex: 1,
                                  }}
                                ></div>
                                <Link
                                  to={`/studyPost?id=${award.study.studyId}&member=Weekly Best&week=${award.week}`}
                                  style={{
                                    position: "relative",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-end",
                                    cursor: "pointer",
                                    zIndex: 2,
                                    textDecoration: "none",
                                  }}
                                  onMouseEnter={(e) => {
                                    setHovered(award.awardId);
                                  }}
                                  onMouseLeave={(e) => {
                                    setHovered("");
                                  }}
                                >
                                  <div style={{ paddingBottom: "10px" }}>
                                    <div
                                      style={{
                                        fontFamily: "Pretendard-SemiBold",
                                        fontSize: "16px",
                                        color: "#2cc295",
                                      }}
                                    >
                                      {award.study.subjectName}_
                                      {award.study.section}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: "Pretendard-SemiBold",
                                        fontSize: "20px",
                                        color: "#fff",
                                      }}
                                    >
                                      {award.writerName}
                                    </div>
                                  </div>
                                  <div>
                                    {award.writerImageUrl ? (
                                      <>
                                        <img
                                          src={award.writerImageUrl}
                                          alt="profileImg"
                                          style={{
                                            width: "90px",
                                            height: "90px",
                                            borderRadius: "50%",
                                            fill: "contain",
                                          }}
                                        />
                                      </>
                                    ) : (
                                      <>
                                        <img
                                          src="../img/icon/base_profile.png"
                                          alt="profileImg"
                                          style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                          }}
                                        />
                                      </>
                                    )}
                                  </div>
                                </Link>
                              </div>
                            ))}
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{ marginTop: "60px", textAlign: "left" }}>
                          <div
                            style={{
                              fontFamily: "Pretendard-SemiBold",
                              fontSize: "20px",
                              color: "#fff",
                            }}
                          >
                            {subject.name} 미정
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
              <div
                style={{
                  boxSizing: "border-box",
                  width: "100%",
                  marginTop: "50px",
                  padding: "5px 10px",
                  borderRadius: "15px",
                  backgroundColor: "rgba(17, 16, 21, 0.5)",
                  textAlign: "center",
                  fontFamily: "Pretendard-Light",
                  fontSize: "14px",
                }}
              >
                <div>
                  깊이 있는 학습과 적극적인 참여로 팀원들에게 영감을 준 이들의
                  이름이 이곳에 기록됩니다.
                </div>
                <div style={{ marginTop: "10px" }}>
                  bamboo의 발전을 이끌어간 이들의 발자취, 그리고 그들의 노력과
                  헌신을 기록하고 공유합니다.
                </div>
              </div>
            </div>
            <div
              style={{
                width: "100%",
                minHeight: "100px",
                marginTop: "50px",
                textAlign: "left",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "left",
                    gap: "20px",
                  }}
                >
                  <select
                    style={{
                      width: "60px",
                      height: "30px",
                      border: "1px solid #2cc295",
                      backgroundColor: "#171717",
                      color: "#2cc295",
                      textAlign: "center",
                      fontSize: "12px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                    value={selectedCohort}
                    onChange={(e) => setSelectedCohort(Number(e.target.value))}
                  >
                    {Array.from(
                      { length: cohortLatest.batch - 6 + 1 },
                      (_, i) => cohortLatest.batch - i
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num}기
                      </option>
                    ))}
                  </select>
                  {checkAuth === 1 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Pretendard-Light",
                        fontSize: "18px",
                        color: "#777",
                      }}
                    >
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
                          setIsAddPopupOpen(true);
                        }}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
                {/* <Link to="#" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      fontFamily: "Pretendard-Regular",
                      fontSize: "16px",
                      width: "150px",
                      padding: "10px 0",
                      backgroundColor: "#111015",
                      borderRadius: "20px",
                      boxShadow:
                        "-10px -10px 30px #242424, 15px 15px 30px #000",
                      color: "#2CC295",
                      transition: "all 0.3s ease",
                      textAlign: "center",
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLDivElement).style.transform =
                        "scale(1.05)";
                      (e.target as HTMLDivElement).style.boxShadow =
                        "-15px -15px 40px rgba(36, 36, 36, 0.5), 20px 20px 40px rgba(0, 0, 0, 0.7)"; // 그림자 효과 강하게
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLDivElement).style.transform = "scale(1)";
                      (e.target as HTMLDivElement).style.boxShadow =
                        "-10px -10px 30px #242424, 15px 15px 30px #000";
                    }}
                  >
                    현 황
                  </div>
                </Link> */}
              </div>
              <div>
                <div
                  style={{
                    width: "100%",
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#888",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      flexGrow: 1,
                      flexBasis: "120px",
                      minWidth: "60px",
                    }}
                  >
                    주차
                  </div>
                  {curriculumSubjects?.map((subject, index) => (
                    <div
                      key={subject.subjectId}
                      style={{
                        flexGrow: 2,
                        flexBasis: "220px",
                        minWidth: "80px",
                      }}
                    >
                      {subject.name}
                    </div>
                  ))}
                </div>
                <hr
                  style={{
                    height: "1px",
                    background: "#666",
                    border: "none",
                    margin: "8px 0",
                  }}
                />

                {groupedAwards.map((awards, index) => (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      height: "40px",
                      marginBottom: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "Pretendard-Regular",
                      fontSize: "15px",
                      color: "#fff",
                      textAlign: "center",
                    }}
                  >
                    <div
                      style={{
                        flexGrow: 1,
                        flexBasis: "120px",
                        minWidth: "60px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {index + 1}
                    </div>
                    {/* 과목별 award 표시 */}
                    {curriculumSubjects.map((subject) => {
                      const matchedAward = awards.find(
                        (award) => award.study.subjectName === subject.name
                      );
                      return (
                        <div
                          key={subject.subjectId}
                          style={{
                            flexGrow: 2,
                            flexBasis: "220px",
                            minWidth: "80px",
                          }}
                        >
                          {matchedAward ? (
                            <Link
                              to={`/studyPost?id=${matchedAward.study.studyId}&member=Weekly Best&week=${matchedAward.week}`}
                              style={{ color: "#fff", textDecoration: "none" }}
                            >
                              <div style={{ color: "#2cc295" }}>
                                {matchedAward.study.subjectName}_
                                {matchedAward.study.section}
                              </div>
                              <div>{matchedAward.writerName}</div>
                            </Link>
                          ) : (
                            <div>-</div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

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
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontFamily: "Pretendard-Regular",
                fontSize: "18px",
                gap: "10px",
              }}
            >
              <div style={{ width: "200px", color: "#fff" }}>·&emsp;URL</div>
              <div style={{ width: "100%" }}>
                <input
                  id="url"
                  type="text"
                  placeholder={`URL을 입력해주세요.`}
                  autoComplete="off"
                  {...register("URL", {
                    required: `URL을 입력해주세요.`,
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
              <div>
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
                  onClick={handleSubmit(onValid, onInvalid)}
                >
                  정보 확인
                </button>
              </div>
            </div>
            {urlParams.id && (
              <div
                style={{
                  marginTop: "10px",
                  padding: "20px",
                  backgroundColor: "#222",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                <div style={{ marginBottom: "10px" }}>
                  <strong>📌 기수 :</strong> {selectedStudy.cohort.batch}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>📖 과목 :</strong> {selectedStudy.subjectName}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>🎖️ 분반 :</strong> {selectedStudy.section}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>📅 주차 :</strong> {urlParams.week}
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <strong>👤 회원 :</strong> {selectedInventory?.writerName}
                </div>
              </div>
            )}
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
                    "명예의 전당 선정을 취소하시겠습니까?\n(변경 사항은 저장되지 않습니다.)"
                  );
                  if (deleteEnd) {
                    setUrlInput("");
                    setUrlParams({ id: "", week: "" });
                    reset({ URL: "" });
                    setIsAddPopupOpen(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={async () => {
                  if (urlInput) {
                    if (
                      curriculumSubjects.some(
                        (subject) => subject.name === selectedStudy.subjectName
                      )
                    ) {
                      if (
                        !groupedAwards[Number(urlParams.week) - 1] ||
                        !groupedAwards[Number(urlParams.week) - 1].some(
                          (award) =>
                            award.study.subjectName ===
                            selectedStudy.subjectName
                        )
                      ) {
                        console.log(3);
                        await PostAwardsAPI(
                          urlParams.week,
                          selectedStudy.cohort.batch,
                          selectedInventory?.inventoryId,
                          selectedStudy.subjectName,
                          selectedStudy.section,
                          selectedInventory?.writerId
                        );
                      } else {
                        const awardId = groupedAwards[
                          Number(urlParams.week) - 1
                        ].find(
                          (award) =>
                            award.study.subjectName ===
                            selectedStudy.subjectName
                        )?.awardId;
                        const patchConfirm = window.confirm(
                          "해당 주차에 이미 등록된 학생이 있습니다.\n수정하시겠습니까?"
                        );
                        if (patchConfirm) {
                          await DeleteAwardsAPI(awardId);
                          await PostAwardsAPI(
                            urlParams.week,
                            selectedStudy.cohort.batch,
                            selectedInventory?.inventoryId,
                            selectedStudy.subjectName,
                            selectedStudy.section,
                            selectedInventory?.writerId
                          );
                        }
                      }
                    } else {
                      alert("정규 스터디만 등록 가능합니다.");
                    }
                  } else {
                    alert("정보 확인을 진행해주세요.");
                  }
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

        {/* <motion.div
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
          <LockedPagePrepare />
        </motion.div> */}

        <BottomInfo />
      </div>
    </div>
  );
}
