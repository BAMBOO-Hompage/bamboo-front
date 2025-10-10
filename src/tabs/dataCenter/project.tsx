import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import Button from "../../components/button.tsx";
import Nav from "../../components/nav.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetCohortLatestAPI from "../../api/cohorts/GetCohortLatestAPI.tsx";
import "../../App.css";

type Cohort = {
  cohortId: number;
  batch: number;
  year: number;
  isFirstSemester: boolean;
  status: string;
  subjects: [];
};

const maxVisiblePages = 5;

export default function Project() {
  const {
    register,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

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
  const [isAddPopupOpen, setIsAddPopupOpen] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState("");
  const [urlParams, setUrlParams] = useState({ id: "", member: "", week: "" });
  const [postsToDisplay, setPostsToDisplay] = useState<[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const startPage =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  const changePage = (page: number) => {
    if (page < 1) {
      page = 1;
      alert("첫 페이지 입니다.");
      return;
    }
    if (page > totalPages) {
      page = totalPages;
      alert("마지막 페이지 입니다.");
      return;
    }
    setSearchParams({
      cohort: selectedCohort.toString(),
      page: page.toString(),
      size: "3",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
      } catch (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // GetActivitiesAPI(selectedYear, currentPage).then((result) => {
    //   var activityData = result.content;
    //   setPostsToDisplay(activityData);
    //   setTotalPages(result.totalPages);
    // });
  }, [selectedCohort, currentPage]);

  const onValid = async (e) => {
    const inputUrl = e.URL;
    setUrlInput(inputUrl);

    try {
      const url = new URL(inputUrl);

      // 1. 도메인/studyPost 경로인지 확인
      if (!url.pathname.startsWith("/studyPost")) {
        alert("올바른 스터디 URL이 아닙니다.");
        setUrlParams({ id: "", member: "", week: "" });
        return;
      }

      // 2. URL 파라미터에서 id, member, week 추출
      const searchParams = new URLSearchParams(url.search);
      const id = searchParams.get("id") || "";
      const member = searchParams.get("member") || "";
      const week = searchParams.get("week") || "";

      // 3. 상태 업데이트
      setUrlParams({ id, member, week });
    } catch (error) {
      alert("올바른 URL을 입력해주세요.");
      setUrlParams({ id: "", member: "", week: "" });
    }
  };

  const onInvalid = (e) => {
    console.log(e, "onInvalid");
    alert("입력한 정보를 다시 확인해주세요.");
  };

  return (
    <div>
      <Nav type="dataCenter" />
      <div className="background">
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
          <div
            style={{
              position: "relative",
              maxWidth: "1000px",
              padding: "0 20px",
              height: "1300px",
              margin: "100px auto",
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
                  fontFamily: "Suit-Semibold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                명예의 전당
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Suit-Regular",
                  fontSize: "18px",
                }}
              >
                {Array.from(
                  { length: cohortLatest.batch - 5 + 1 },
                  (_, i) => cohortLatest.batch - i
                ).map((num) => (
                  <div
                    key={num}
                    className="side_tabs"
                    style={
                      selectedCohort === num
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSearchParams({ cohort: num.toString(), page: "1" });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {num}기
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
              key={selectedCohort}
              style={{
                position: "relative",
                width: "820px",
                minHeight: "100%",
                textAlign: "left",
                paddingLeft: "50px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "Suit-Semibold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  {selectedCohort}기{" "}
                  <span
                    style={{
                      fontFamily: "Suit-Regular",
                      fontSize: "18px",
                      color: "#fff",
                    }}
                  >
                    ({cohortLatest.year}-
                    {cohortLatest.isFirstSemester ? "1" : "2"})
                  </span>
                </div>
                {checkAuth === 1 ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "Suit-Light",
                      fontSize: "18px",
                      color: "#777",
                    }}
                  >
                    명예의 전당 선정&emsp;
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

              <div
                style={{
                  width: "100%",
                }}
              ></div>

              {postsToDisplay.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "770px",
                    marginTop: "100px",
                    paddingBottom: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(1)}
                  >
                    <img
                      src="../img/btn/pageStart.png"
                      alt="pageStart"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(currentPage - 1)}
                  >
                    <img
                      src="../img/btn/pagePrev.png"
                      alt="pagePrev"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                  {Array.from(
                    { length: endPage - startPage + 1 },
                    (_, i) => startPage + i
                  ).map((page) => (
                    <button
                      key={page}
                      className="bottom_tabs"
                      onClick={() => changePage(page)}
                      style={
                        page === currentPage
                          ? {
                              textShadow: "0 0 0.1em, 0 0 0.1em",
                              color: "#2CC295",
                            }
                          : {}
                      }
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(currentPage + 1)}
                  >
                    <img
                      src="../img/btn/pageNext.png"
                      alt="pageNext"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                  <button
                    className="bottom_btn"
                    style={{}}
                    onClick={() => changePage(totalPages)}
                  >
                    <img
                      src="../img/btn/pageEnd.png"
                      alt="pageNext"
                      style={{
                        height: "12px",
                      }}
                    />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </motion.div>
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
                fontFamily: "Suit-Regular",
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
                    fontFamily: "Suit-Light",
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
                    fontFamily: "Suit-Regular",
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
                  padding: "10px",
                  backgroundColor: "#222",
                  borderRadius: "10px",
                  color: "#fff",
                  fontSize: "16px",
                }}
              >
                <p>
                  📌 <strong>ID:</strong> {urlParams.id}
                </p>
                <p>
                  👤 <strong>Member:</strong> {urlParams.member}
                </p>
                <p>
                  📅 <strong>Week:</strong> {urlParams.week}
                </p>
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
                    setIsAddPopupOpen(false);
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
        )} */}

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
          <LockedPagePrepare />
        </motion.div>

        <BottomInfo />
      </div>
    </div>
  );
}
