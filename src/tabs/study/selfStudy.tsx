import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import GetCohortLatestAPI from "../../api/cohorts/GetCohortLatestAPI.tsx";
import GetSubjectsAPI from "../../api/subjects/getSubjectsAPI.tsx";
import GetStudiesAPI from "../../api/studies/getStudiesAPI.tsx";

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
type Study = {
  studyId: number;
  teamName: string;
  subjectName: string;
  cohort: Cohort;
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

export default function SelfStudy() {
  const [hovered, setHovered] = useState(false);
  const [studyHovered, setStudyHovered] = useState<number | null>(null);
  const [cohortLatest, setCohortLatest] = useState<Cohort>({
    cohortId: 0,
    batch: 0,
    year: 0,
    isFirstSemester: true,
    status: "",
    subjects: [],
  });
  const [selectedCohort, setSelectedCohort] = useState(0);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [studies, setStudies] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cohortResult = await GetCohortLatestAPI();
        setCohortLatest(cohortResult);
        setSelectedCohort(cohortResult.batch);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subjectsResult = await GetSubjectsAPI(false, selectedCohort);
        setSubjects(subjectsResult);

        const studiesResults = await Promise.all(
          subjectsResult.map((subject) =>
            GetStudiesAPI(selectedCohort, subject.subjectId)
          )
        );
        setStudies(studiesResults);
        console.log(studiesResults);
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };
    fetchData();
  }, [selectedCohort]);

  return (
    <div>
      <Nav type="study" />
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
              margin: "0 auto",
              marginTop: "100px",
              marginBottom: "100px",
              padding: "0 20px",
              textAlign: "left",
            }}
          >
            <div
              style={{
                marginBottom: "50px",
                fontFamily: "Paperozi-Regular",
                fontSize: "30px",
                color: "#fff",
                textShadow: "0 0 0.1em, 0 0 0.1em",
                textAlign: "center",
              }}
            >
              자율 스터디
            </div>

            <div
              style={{ display: "flex", justifyContent: "center", gap: "20px" }}
            >
              <Link
                to="/curriculumStudy"
                style={{
                  textDecoration: "none",
                  fontFamily: "Paperozi-Light",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  width: "180px",
                  padding: "10px",
                  backgroundColor: "#111015",
                  borderRadius: "20px",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 10px 10px 30px #000",
                  color: "#fff",
                  transition: "box-shadow 0.5s ease",
                  animation: hovered
                    ? "shadow-rotate 0.5s linear forwards"
                    : "shadow-reset 0.5s linear forwards",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className={hovered ? "rotate-animation" : ""}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              >
                정규 스터디
                <style>
                  {`
                    @keyframes shadow-rotate {
                      0% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                      25% {
                        box-shadow: inset -20px 0px 30px #242424, inset 20px 0px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                       }
                      75% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      100% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                    }
                        
                    @keyframes shadow-reset {
                      0% {
                        box-shadow: inset 10px 10px 30px #242424, inset -10px -10px 30px #000;
                      }
                      25% {
                        box-shadow: inset 0px 20px 30px #242424, inset 0px -20px 30px #000;
                      }
                      50% {
                        box-shadow: inset -10px 10px 30px #242424, inset 10px -10px 30px #000;
                      }
                      75% {
                        box-shadow: inset -20px 0px 30px #242424, inset 0px 20px 30px #000;
                      }
                      100% {
                        box-shadow: inset -10px -10px 30px #242424, inset 10px 10px 30px #000;
                      }
                    }
                  `}
                </style>
              </Link>
              <div
                style={{
                  fontFamily: "Paperozi-Light",
                  fontSize: "clamp(14px, 2vw, 18px)",
                  width: "180px",
                  padding: "10px",
                  backgroundColor: "#2cc295",
                  borderRadius: "20px",
                  color: "#fff",
                  transition: "box-shadow 0.5s ease",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                자율 스터디
              </div>
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <select
                style={{
                  width: "80px",
                  height: "30px",
                  marginTop: "20px",
                  marginBottom: "10px",
                  border: "1px solid #2cc295",
                  backgroundColor: "#171717",
                  color: "#2cc295",
                  textAlign: "center",
                  fontSize: "16px",
                  borderRadius: "10px",
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
            </div>

            <div
              style={{
                boxSizing: "border-box",
                width: "100%",
                position: "relative",
              }}
            >
              <svg
                width="100%"
                viewBox="0 0 1000 1000"
                preserveAspectRatio="none"
                style={{
                  aspectRatio: "1 / 1",
                }}
              >
                <defs>
                  <filter
                    id="blurFilter"
                    x="-200%"
                    y="-200%"
                    width="450%"
                    height="450%"
                  >
                    <feGaussianBlur stdDeviation="80" />
                  </filter>

                  <mask id="hole-mask">
                    <rect x="0" y="0" width="1000" height="1000" fill="#fff" />

                    {[...Array(5)].map((_, row) => (
                      <>
                        <rect
                          x="0"
                          y={row * 200}
                          width="95"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect x="0" y={row * 200} width="20" height="190" />
                        <rect
                          x="105"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="305"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="505"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="705"
                          y={row * 200}
                          width="190"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect
                          x="905"
                          y={row * 200}
                          width="95"
                          height="190"
                          rx="20"
                          ry="20"
                        />
                        <rect x="980" y={row * 200} width="20" height="190" />
                      </>
                    ))}
                  </mask>
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

                <rect
                  x="0"
                  y="0"
                  width="1000"
                  height="1000"
                  fill="#111015"
                  style={{
                    mask: "url(#hole-mask)",
                  }}
                />

                {subjects.map((subject, subjectIndex) => {
                  const baseY =
                    subjectIndex === 0
                      ? 190 / 2
                      : subjects
                          .slice(0, subjectIndex)
                          .reduce(
                            (acc, _, idx) =>
                              acc +
                              Math.ceil((studies[idx]?.length || 0) / 4) * 200,
                            190 / 2
                          );

                  return (
                    <>
                      <text
                        x={95 / 2}
                        y={baseY}
                        fontFamily="Paperozi-Semibold"
                        fontSize="24"
                        fill="#2cc295"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        {subject.name}
                      </text>

                      {studies[subjectIndex]?.map((study, studyIndex) => {
                        const x = 105 + (studyIndex % 4) * 200;
                        const y = baseY + Math.floor(studyIndex / 4) * 200;

                        return (
                          <>
                            {selectedCohort !== cohortLatest.batch ||
                            cohortLatest.status === "활동 중" ? (
                              <Link
                                to={`/studyPost?id=${study.studyId}&member=&week=1`}
                                style={{ textDecoration: "none" }}
                                key={study.studyId}
                              >
                                <g
                                  transform="scale(1)"
                                  onMouseEnter={() =>
                                    setStudyHovered(study.studyId)
                                  }
                                  onMouseLeave={() => setStudyHovered(null)}
                                >
                                  <rect
                                    x={x}
                                    y={y - 190 / 2 + 2}
                                    width={190 - 4}
                                    height={190 - 4}
                                    fill={
                                      studyHovered === study.studyId
                                        ? "rgba(255, 255, 255, 0.2)"
                                        : "transparent"
                                    }
                                    stroke={
                                      studyHovered === study.studyId
                                        ? "#777"
                                        : "none"
                                    }
                                    strokeWidth="2"
                                    rx="20"
                                    ry="20"
                                    cursor="pointer"
                                  />
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 40}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="18px"
                                    fill="#2cc295"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.subjectName}_${study.section}`}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 70}
                                    fontFamily="Paperozi-Semibold"
                                    fontSize="20px"
                                    fill="#fff"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.teamName}`}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 140}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="15px"
                                    fill="#777"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.studyMaster.name} `}
                                    {study.studyMembers
                                      .filter(
                                        (member) =>
                                          member.studentId !==
                                          study.studyMaster.studentId
                                      )
                                      .slice(0, 2)
                                      .map(
                                        (studyMember) => `${studyMember.name} `
                                      )}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 160}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="15px"
                                    fill="#777"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {study.studyMembers
                                      .filter(
                                        (member) =>
                                          member.studentId !==
                                          study.studyMaster.studentId
                                      )
                                      .slice(2, 5)
                                      .map(
                                        (studyMember) => `${studyMember.name} `
                                      )}
                                  </text>
                                </g>
                              </Link>
                            ) : (
                              <Link
                                to="#"
                                style={{ textDecoration: "none" }}
                                onClick={() => {
                                  alert("스터디 활동 기간이 아닙니다.");
                                }}
                                key={study.studyId}
                              >
                                <g
                                  transform="scale(1)"
                                  onMouseEnter={() =>
                                    setStudyHovered(study.studyId)
                                  }
                                  onMouseLeave={() => setStudyHovered(null)}
                                >
                                  <rect
                                    x={x}
                                    y={y - 190 / 2 + 2}
                                    width={190 - 4}
                                    height={190 - 4}
                                    fill={
                                      studyHovered === study.studyId
                                        ? "rgba(255, 255, 255, 0.2)"
                                        : "transparent"
                                    }
                                    stroke={
                                      studyHovered === study.studyId
                                        ? "#777"
                                        : "none"
                                    }
                                    strokeWidth="2"
                                    rx="20"
                                    ry="20"
                                    cursor="pointer"
                                  />
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 40}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="18px"
                                    fill="#2cc295"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.subjectName}_${study.section}`}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 70}
                                    fontFamily="Paperozi-Semibold"
                                    fontSize="20px"
                                    fill="#fff"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.teamName}`}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 140}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="15px"
                                    fill="#777"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {`${study.studyMaster.name} `}
                                    {study.studyMembers
                                      .filter(
                                        (member) =>
                                          member.studentId !==
                                          study.studyMaster.studentId
                                      )
                                      .slice(0, 2)
                                      .map(
                                        (studyMember) => `${studyMember.name} `
                                      )}
                                  </text>
                                  <text
                                    x={x + 30}
                                    y={y - 190 / 2 + 160}
                                    fontFamily="Paperozi-Regular"
                                    fontSize="15px"
                                    fill="#777"
                                    alignmentBaseline="hanging"
                                    cursor="pointer"
                                  >
                                    {study.studyMembers
                                      .filter(
                                        (member) =>
                                          member.studentId !==
                                          study.studyMaster.studentId
                                      )
                                      .slice(2, 5)
                                      .map(
                                        (studyMember) => `${studyMember.name} `
                                      )}
                                  </text>
                                </g>
                              </Link>
                            )}
                          </>
                        );
                      })}
                    </>
                  );
                })}
              </svg>
            </div>
          </div>
          {/* <LockedPagePrepare /> */}
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
