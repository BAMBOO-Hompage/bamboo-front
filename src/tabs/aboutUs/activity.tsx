import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment";

import Nav from "../../components/nav.tsx";
import BottomInfo from "../../components/bottomInfo.tsx";
import LockedPagePrepare from "../../components/lockedPagePrepare.tsx";
import ImageSlider from "../../components/imageSlider.tsx";

import CheckAuthAPI from "../../api/checkAuthAPI.tsx";
import GetActivitiesAPI from "../../api/main-activities/getActivitiesAPI.tsx";
import DeleteActivitiesAPI from "../../api/main-activities/deleteAcitivitiesAPI.tsx";

import "../../App.css";

type Activities = {
  mainActivitiesId: number;
  title: string;
  startDate: number[];
  endDate: number[];
  year: number;
  views: number;
  images: string[];
};

const maxVisiblePages = 5;

export default function Activity() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const selectedYear = parseInt(
    searchParams.get("year") || moment(new Date()).format("YYYY"),
    10
  );

  const [checkAuth, setCheckAuth] = useState<number>(1);
  const [yearList, setYearList] = useState<number[]>([]);

  const [postsToDisplay, setPostsToDisplay] = useState<Activities[]>([]);
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
      year: selectedYear.toString(),
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
    const latestYear = parseInt(moment(new Date()).format("YYYY"));
    const years: Array<number> = [];

    for (let year = latestYear; year >= 2025; year--) {
      years.push(year);
    }
    setYearList(years);
  }, []);

  useEffect(() => {
    GetActivitiesAPI(selectedYear, currentPage).then((result) => {
      var activityData = result.content;
      setPostsToDisplay(activityData);
      setTotalPages(result.totalPages);
    });
  }, [selectedYear, currentPage]);

  return (
    <div>
      <Nav type="aboutUs" />
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
              minHeight: "1000px",
              padding: "0 20px",
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
                  fontFamily: "Pretendard-Bold",
                  fontSize: "30px",
                  color: "#fff",
                  textShadow: "0 0 0.1em, 0 0 0.1em",
                }}
              >
                주요 활동
              </div>

              <div
                style={{
                  marginTop: "40px",
                  fontFamily: "Pretendard-Regular",
                  fontSize: "18px",
                }}
              >
                {yearList.map((year) => (
                  <div
                    key={year}
                    className="side_tabs"
                    style={
                      selectedYear === year
                        ? {
                            boxSizing: "border-box",
                            color: "#2CC295",
                            borderRight: "1px solid #2cc295",
                          }
                        : {}
                    }
                    onClick={() => {
                      setSearchParams({ year: year.toString(), page: "1" });
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                  >
                    {year}
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
              key={selectedYear}
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
                    fontFamily: "Pretendard-Bold",
                    fontSize: "30px",
                    color: "#fff",
                  }}
                >
                  {selectedYear}년도
                </div>
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
                    주요 활동 작성&emsp;
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
                        window.location.href = "/activityAdd";
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
              >
                {postsToDisplay.map((activity: Activities) => (
                  <div
                    key={activity.mainActivitiesId}
                    style={{
                      marginTop: "40px",
                      marginBottom: "50px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "Pretendard-SemiBold",
                          fontSize: "20px",
                          color: "#fff",
                        }}
                      >
                        {activity.title}
                      </div>
                      {checkAuth === 1 ? (
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
                            onClick={() => {
                              window.location.href = `/activityEdit?id=${activity.mainActivitiesId}`;
                            }}
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
                            onClick={() => {
                              const deleteConfirm =
                                window.confirm("게시물을 삭제하시겠습니까?");
                              if (deleteConfirm) {
                                DeleteActivitiesAPI(activity.mainActivitiesId);
                              }
                            }}
                          >
                            삭제
                          </span>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "Pretendard-Light",
                        fontSize: "14px",
                        color: "#777",
                        marginTop: "2px",
                        marginBottom: "10px",
                      }}
                    >
                      {activity.startDate[0]}/{activity.startDate[1]}/
                      {activity.startDate[2]} ~ {activity.endDate[0]}/
                      {activity.endDate[1]}/{activity.endDate[2]}
                    </div>
                    <div
                      style={{
                        width: "100%",
                        height: "280px",
                      }}
                    >
                      <ImageSlider images={activity.images} />
                    </div>
                  </div>
                ))}
              </div>

              {postsToDisplay.length > 0 ? (
                <div
                  style={{
                    width: "100%",
                    maxWidth: "770px",
                    marginTop: "100px",
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
