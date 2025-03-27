import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import PDFPreviewComponent from "../../components/pdfPreview.tsx";
import dompurify from "dompurify";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import MobileBlocker from "../../components/mobileBlocker.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetSubjectAPI from "../../api/subjects/getSubjectAPI.tsx";
import GetStudyAPI from "../../api/studies/getStudyAPI.tsx";
import GetInventoryAPI from "../../api/inventories/getInventroyAPI.tsx";
import DeleteInventoriesAPI from "../../api/inventories/deleteInventoriesAPI.tsx";
import PostAttendancesAPI from "../../api/attendance/postAttendanceAPI.tsx";
import PostWeeklyBestAPI from "../../api/inventories/postWeeklyBestAPI.tsx";
import GetWeeklyBestAPI from "../../api/inventories/getWeeklyBestAPI.tsx";

import "../../App.css";

type MyDataType = {
  memberId: number;
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
type weeklyContent = {
  weeklyContentId: number;
  subjectName: string;
  content: string;
  week: number;
  startDate: number[];
  endDate: number[];
  startPage: 0;
  endPage: 0;
};
type subject = {
  subjectId: number;
  name: string;
  bookName: string;
  isBook: boolean;
  batch: number;
  weeklyContents: weeklyContent[];
};
type study = {
  studyId: number;
  teamName: string;
  subjectName: string;
  cohort: cohort;
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
type Inventory = {
  inventoryId: number;
  member: {
    memberId: number;
    studentId: string;
    email: string;
    name: string;
    major: string;
    phone: string;
    role: string;
  };
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
  award: {
    awardId: number;
    study: {
      studyId: number;
      teamName: string;
      subjectName: string;
      batch: number;
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
    };
    title: string;
    batch: number;
    week: number;
    startDate: number[];
    endDate: number[];
  };
};

const itemsPerPage = 8;

export default function StudyPost() {
  const sanitizer = dompurify.sanitize;

  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    register: registerWeeklyBest,
    reset: resetWeeklyBest,
    getValues: getValuesWeeklyBest,
    handleSubmit: handleSubmitWeeklyBest,
    formState: { errors: errorsWeeklyBest },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();

  const postId = parseInt(searchParams.get("id") || "0", 10);
  const postList = searchParams.get("member") || "Weekly Best";
  const currentPage = parseInt(searchParams.get("week") || "1", 10);

  const [expandedSections, setExpandedSections] = useState(false);
  const [isAttendancePopupOpen, setIsAttendancePopupOpen] =
    useState<boolean>(false);
  const [checkedMembers, setCheckedMembers] = useState<string[]>([]);
  const [isWeeklyBestPopupOpen, setIsWeeklyBestPopupOpen] =
    useState<boolean>(false);
  const [checkedWeeklyBest, setCheckedWeeklyBest] = useState<number[]>([]);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState<boolean>(false);

  const [images, setImages] = useState<File[]>([]);
  const [showImages, setShowImages] = useState<string[]>([]);

  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [myData, setMyData] = useState<MyDataType>({
    memberId: 0,
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
        startPage: 0,
        endPage: 0,
      },
    ],
  });
  const [selectedInventory, setSelectedInventory] = useState<
    Inventory | undefined
  >({
    inventoryId: 0,
    member: {
      memberId: 0,
      studentId: "",
      email: "",
      name: "",
      major: "",
      phone: "",
      role: "",
    },
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
      study: {
        studyId: 0,
        teamName: "",
        subjectName: "",
        batch: 0,
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
      },
      title: "",
      batch: 0,
      week: 0,
      startDate: [],
      endDate: [],
    },
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
      } else if (data.role === "ROLE_MEMBER") {
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
        const checkedList = studyResult.attendances
          .filter((attendance) => attendance.status === "출석")
          .map((attendance) => attendance.studentId);
        setCheckedMembers(checkedList);
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
    if (postList !== "Weekly Best") {
      GetInventoryAPI(postId, postList, currentPage).then((result) => {
        var inventoryData = result;
        setSelectedInventory(inventoryData);
      });
    } else {
      GetWeeklyBestAPI(postId, currentPage).then((result) => {
        var inventoryData = result;
        setSelectedInventory(inventoryData);
        if (inventoryData) {
          setCheckedWeeklyBest([inventoryData.member.memberId]);
        }
      });
    }
  }, [postId, postList, currentPage]);

  const handleCheckboxChange = (studentId: string) => {
    setCheckedMembers((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleWeeklyBestChange = (memberId) => {
    if (checkedWeeklyBest.includes(memberId)) {
      setCheckedWeeklyBest([]); // Uncheck if already checked
    } else {
      setCheckedWeeklyBest([memberId]); // Make it mutually exclusive
    }
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
  const getCurrentWeekForWeeklyBest = (selectedSubject) => {
    const today = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );

    const currentWeek = selectedSubject.weeklyContents.find(
      ({ startDate, endDate }) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        // startDate 다음 날로 변경
        start.setDate(start.getDate() + 1);
        // endDate 다음 날로 변경
        end.setDate(end.getDate() + 1);
        return today >= start && today <= end;
      }
    );

    return currentWeek ? currentWeek : null;
  };

  const handleAddImages = (event) => {
    const imageLists = event.target.files; // 선택한 파일들
    let fileLists: File[] = [...images];
    let fileNameLists: string[] = [...showImages]; // 기존 저장된 파일명들

    for (let i = 0; i < imageLists.length; i++) {
      const currentFileName: string = imageLists[i].name; // 파일명 가져오기
      fileLists.push(imageLists[i]);
      fileNameLists.push(currentFileName);
    }

    if (fileNameLists.length > 1) {
      fileLists = fileLists.slice(0, 1);
      fileNameLists = fileNameLists.slice(0, 1); // 최대 1개 제한
    }

    setImages(fileLists);
    setShowImages(fileNameLists); // 파일명 리스트 저장
  };
  const handleDeleteImage = (id) => {
    setImages(images.filter((_, index) => index !== id));
    setShowImages(showImages.filter((_, index) => index !== id));
  };

  const onValid = async (e) => {
    const members = [...postData.studyMembers];
    const newAttendances = members.map((member) => ({
      studentId: member.studentId,
      status: checkedMembers.includes(member.studentId) ? "출석" : "결석",
    }));

    PostAttendancesAPI(
      parseInt(searchParams.get("id") || "0", 10),
      getCurrentWeek(selectedSubject).week,
      newAttendances
    );
  };
  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  const onWeeklyBestValid = async (e) => {
    PostWeeklyBestAPI(
      parseInt(searchParams.get("id") || "0", 10),
      getCurrentWeekForWeeklyBest(selectedSubject).week,
      checkedWeeklyBest
    );
  };
  const onWeeklyBestInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
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
                width="450%"
                height="450%"
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
                  일시:&emsp;<div>{`매주 화요일 or 목요일`}</div>
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
                    3회 이상 불참시 퇴출.
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
                          att.studentId === postData.studyMaster.studentId
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
                              att.studentId === studyMember.studentId
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
                {getCurrentWeek(selectedSubject) &&
                (myData.memberId === postData.studyMaster.memberId ||
                  checkAuth === 2) ? (
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
                          id: postId.toString(),
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
                        parseInt(postList) === postData.studyMaster.memberId
                          ? {
                              boxSizing: "border-box",
                              color: "#2CC295",
                              borderRight: "1px solid #2cc295",
                            }
                          : {}
                      }
                      onClick={() => {
                        setSearchParams({
                          id: postId.toString(),
                          member: postData.studyMaster.memberId.toString(),
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
                            parseInt(postList) === studyMember.memberId
                              ? {
                                  boxSizing: "border-box",
                                  color: "#2CC295",
                                  borderRight: "1px solid #2cc295",
                                }
                              : {}
                          }
                          onClick={() => {
                            setSearchParams({
                              id: postId.toString(),
                              member: studyMember.memberId.toString(),
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

                  <div style={{ margin: "10px 0 10px" }}>
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
                              {getCurrentWeekForWeeklyBest(selectedSubject) &&
                              postList === "Weekly Best" &&
                              (myData.memberId ===
                                postData.studyMaster.memberId ||
                                checkAuth === 2) ? (
                                <div style={{ display: "flex" }}>
                                  <img
                                    src="../img/btn/image.png"
                                    alt="image_btn"
                                    style={{
                                      height: "25px",
                                      marginRight: "10px",
                                      opacity: "0.8",
                                      cursor: "pointer",
                                    }}
                                    onMouseEnter={(e) => {
                                      e.currentTarget.style.opacity = "1";
                                    }}
                                    onMouseLeave={(e) => {
                                      e.currentTarget.style.opacity = "0.8";
                                    }}
                                    onClick={() => {
                                      setIsImagePopupOpen(true);
                                    }}
                                  />
                                  <Button
                                    type="primary"
                                    size="xsmall"
                                    title="선택"
                                    onClick={() => {
                                      setIsWeeklyBestPopupOpen(true);
                                    }}
                                  />
                                </div>
                              ) : (
                                <></>
                              )}
                              {myData.memberId === parseInt(postList) &&
                              selectedInventory ? (
                                <div>
                                  <img
                                    src="../../img/btn/trash_disabled.png"
                                    alt="delete"
                                    style={{
                                      width: "25px",
                                      marginRight: "10px",
                                      cursor: "pointer",
                                      opacity: "0.8",
                                      transition: "all 0.3s ease",
                                    }}
                                    onClick={() => {
                                      const confirm =
                                        window.confirm(
                                          "정리본을 삭제하시겠습니까?"
                                        );
                                      if (confirm) {
                                        DeleteInventoriesAPI(
                                          selectedInventory?.inventoryId
                                        );
                                      }
                                    }}
                                    onMouseEnter={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "../../img/btn/trash_enabled.png";
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "../../img/btn/trash_disabled.png";
                                    }}
                                  />
                                  <Link
                                    to={`/studyEdit?study=${postData.studyId}&subject=${selectedSubject.subjectId}&week=${curriculum.weeklyContentId}`}
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
                                </div>
                              ) : myData.memberId === parseInt(postList) &&
                                !selectedInventory ? (
                                <div>
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
                                </div>
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

                  {selectedInventory?.fileUrl && (
                    <>
                      <div
                        style={{
                          boxSizing: "border-box",
                          width: "100%",
                          padding: "20px",
                          backgroundColor: "rgba(17, 16, 21, 0.5)",
                          borderRadius: "20px",
                          marginBottom: "10px",
                          fontFamily: "Pretendard-Light",
                          fontSize: "18px",
                          color: "#fff",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: "20px",
                            display: "flex",
                            justifyContent: "left",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "150px",
                              marginRight: "20px",
                            }}
                          >
                            첨부 파일
                          </div>
                          <div>
                            <div>
                              <a
                                href={selectedInventory?.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#fff" }}
                              >
                                {selectedInventory?.fileUrl}
                              </a>
                            </div>
                          </div>
                        </div>
                        <PDFPreviewComponent
                          pdfUrl={selectedInventory?.fileUrl}
                        ></PDFPreviewComponent>
                      </div>
                    </>
                  )}

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
                            {selectedInventory && (
                              <div
                                className="container"
                                dangerouslySetInnerHTML={{
                                  __html: sanitizer(
                                    `${selectedInventory.content}`
                                  ),
                                }}
                                style={{
                                  fontFamily: "Pretendard-Light",
                                  fontSize: "clamp(14px, 2vw, 18px)",
                                  color: "#fff",
                                  lineHeight: "1.4",
                                }}
                              />
                            )}
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

        {isAttendancePopupOpen && (
          <form
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "400px",
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
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                {getCurrentWeek(selectedSubject).week}주차 출석 체크
                <br />
                <span
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "18px",
                    color: "#fff",
                  }}
                >
                  스터디 날짜 :{" "}
                  {getCurrentWeek(selectedSubject).endDate[0] +
                    "/" +
                    getCurrentWeek(selectedSubject).endDate[1] +
                    "/" +
                    (getCurrentWeek(selectedSubject).endDate[2] - 1)}
                </span>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
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
                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      alignContent: "center",
                    }}
                  >
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

        {isImagePopupOpen && (
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
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                {getCurrentWeekForWeeklyBest(selectedSubject).week}주차 사진
                업로드
                <br />
                <span
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  (
                  {getCurrentWeekForWeeklyBest(selectedSubject).startDate[0] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).startDate[1] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).startDate[2] +
                    " ~ " +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[0] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[1] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[2]}
                  )
                </span>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                fontFamily: "Pretendard-Regular",
                fontSize: "18px",
                gap: "10px",
              }}
            >
              <label
                htmlFor="fileInput"
                style={{
                  boxSizing: "border-box",
                  width: "600px",
                  height: "40px",
                  padding: "0 20px",
                  backgroundColor: "#111015",
                  border: "none",
                  boxShadow:
                    "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                  borderRadius: "20px",
                  fontFamily: "Pretendard-Light",
                  fontSize: "18px",
                  color: "#2CC295",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                }}
                onChange={handleAddImages}
              >
                <input
                  type="file"
                  id="fileInput"
                  style={{
                    display: "none",
                  }}
                  accept="image/*"
                  {...register("Image", {
                    // required: "사진을 추가해주세요.",
                  })}
                />
                <img
                  src="../../img/btn/search_enabled.png"
                  alt="search"
                  style={{ width: "25px" }}
                />
                &emsp;사진 선택 (1장)
              </label>
              <input type="text" style={{ display: "none" }} />
            </div>
            <div
              style={{
                width: "600px",
                display: "flex",
                justifyContent: "left",
              }}
            >
              {showImages.length !== 0 ? (
                <div
                  style={{
                    width: "600px",
                    padding: "20px",
                    marginBottom: "30px",
                    backgroundColor: "#111015",
                    boxShadow:
                      "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                    borderRadius: "20px",
                    overflow: "auto",
                  }}
                >
                  {showImages.map((image, id) => (
                    <div
                      key={id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontFamily: "Pretendard-Light",
                        fontSize: "14px",
                      }}
                    >
                      <img
                        src="../../img/btn/delete_disabled.png"
                        alt="delete"
                        style={{ width: "16px", cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteImage(id);
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
                      &emsp;{image}
                    </div>
                  ))}
                </div>
              ) : (
                <div
                // style={{
                //   width: "620px",
                //   height: "220px",
                //   padding: "20px",
                //   marginBottom: "30px",
                //   backgroundColor: "#111015",
                //   boxShadow:
                //     "inset -10px -10px 30px #242424, inset 15px 15px 30px #000",
                //   borderRadius: "20px",
                //   overflow: "auto",
                // }}
                ></div>
              )}
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
                  const deleteEnd =
                    window.confirm("사진 업로드를 취소하시겠습니까?");
                  if (deleteEnd) {
                    setIsImagePopupOpen(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={() => {}}
              />
            </div>
          </form>
        )}
        {isImagePopupOpen && (
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

        {isWeeklyBestPopupOpen && (
          <form
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
              maxWidth: "400px",
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
                marginBottom: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "80%",
                  backgroundColor: "transparent",
                  borderRadius: "10px",
                  fontFamily: "Pretendard-Bold",
                  fontSize: "28px",
                  color: "#2cc295",
                }}
              >
                {getCurrentWeekForWeeklyBest(selectedSubject).week}주차 주간
                베스트 지정
                <br />
                <span
                  style={{
                    fontFamily: "Pretendard-Light",
                    fontSize: "16px",
                    color: "#fff",
                  }}
                >
                  (
                  {getCurrentWeekForWeeklyBest(selectedSubject).startDate[0] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).startDate[1] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).startDate[2] +
                    " ~ " +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[0] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[1] +
                    "/" +
                    getCurrentWeekForWeeklyBest(selectedSubject).endDate[2]}
                  )
                </span>
              </div>
            </div>
            <div
              style={{
                marginBottom: "10px",
                fontFamily: "Pretendard-Regular",
                fontSize: "18px",
                gap: "10px",
              }}
            >
              {[
                postData.studyMaster,
                ...postData.studyMembers.filter(
                  (member) =>
                    member.studentId !== postData.studyMaster.studentId
                ),
              ].map((member) => (
                <div
                  key={member.memberId}
                  style={{
                    marginTop: "20px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {member.name}
                  <label
                    style={{
                      marginLeft: "20px",
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      borderRadius: "4px",
                      border: "2px solid #2cc295",
                      backgroundColor: checkedWeeklyBest.includes(
                        member.memberId
                      )
                        ? "#2cc295"
                        : "transparent",
                      cursor: "pointer",
                      position: "relative",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checkedMembers.includes(member.studentId)}
                      onChange={() => handleWeeklyBestChange(member.memberId)}
                      style={{
                        opacity: 0,
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        cursor: "pointer",
                      }}
                    />
                    {checkedWeeklyBest.includes(member.memberId) && (
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
                    "주간 베스트 지정을 취소하시겠습니까?"
                  );
                  if (deleteEnd) {
                    setIsWeeklyBestPopupOpen(false);
                  }
                }}
              />
              <Button
                type="primary"
                size="small"
                title="저장"
                onClick={handleSubmitWeeklyBest(
                  onWeeklyBestValid,
                  onWeeklyBestInvalid
                )}
              />
            </div>
          </form>
        )}
        {isWeeklyBestPopupOpen && (
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
